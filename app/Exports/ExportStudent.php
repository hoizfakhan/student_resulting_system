<?php

namespace App\Exports;

use App\Models\Assign_Subject;
use App\Models\Student;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Morilog\Jalali\Jalalian;

class ExportStudent implements FromCollection, WithHeadings,WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */

    protected $students;

    protected $currentSemesterOrder;
    protected $currentId = 1;

    public function __construct($students, $currentSemesterOrder)
    {
        $this->students = $students;
        $this->currentSemesterOrder = $currentSemesterOrder;
    }
    public function collection()
    {
        return $this->students->sort(function ($a, $b) {

            $aIsFirstSemester = $this->isFirstSemester($a);
            $bIsFirstSemester = $this->isFirstSemester($b);

            if ($aIsFirstSemester && !$bIsFirstSemester) {
                return -1;
            } elseif (!$aIsFirstSemester && $bIsFirstSemester) {
                return 1;
            } elseif ($aIsFirstSemester && $bIsFirstSemester) {
                return $b->kankor_marks <=> $a->kankor_marks;
            } else {
                return $this->calculatePercentage($b) <=> $this->calculatePercentage($a);
            }

        });



    }

    /**
     * @param $student
     * @return array
     */
    public function map($student): array
    {
        // Create an array with 31 fields for attendance, and default values for hours
        $attendanceData = array_fill(0, 31, ''); // 31 fields for attendance
        $presentHours = ''; // Placeholder for present hours
        $absentHours = '';  // Placeholder for absent hours
        $totalPresentHours = ''; // Placeholder for total present hours
        $considerations = ''; // Placeholder for considerations


        // Check if the student is in the first semester
      $isFirstSemester = $this->isFirstSemester($student);

    // Calculate the percentage if not in the first semester
     $percentage = $isFirstSemester ? 'N/A' : $this->calculatePercentage($student) . '%';


        // Use the current ID and increment it
        $dynamicId = $this->currentId++;

        return array_merge([
            $dynamicId,  // Use the dynamically generated ID
            $student->name,
            $student->father_name,

        ], $attendanceData, [$presentHours, $absentHours, $totalPresentHours,$considerations]);
    }

    /**
     * @return array
     */
    public function headings(): array
    {


     // Get the current date in Gregorian calendar
     $currentDate = date('Y-m-d');

     // Convert current Gregorian date to Jalali date
     $currentJalaliDate = Jalalian::fromDateTime($currentDate);

     // Extract the current Jalali year
     $currentJalaliYear = $currentJalaliDate->format('Y');

     // Define the static headers
     $headers = [
         '#',
         'Name',
         'Father Name',
     ];

     // Define headers for 31 days of the month with Jalali date placeholders
     $dateHeaders = [];
     for ($day = 1; $day <= 31; $day++) {
         $dateHeaders[] = "$currentJalaliYear/__/__"; // Placeholder format for dates
     }

     // Append additional fields
     $headers = array_merge($headers, $dateHeaders, [
         'Present Hours',
         'Absent Hours',
         'Total Present Hours',
         'Considerations'
     ]);

     return $headers;
    }


    private function isFirstSemester($student)
    {
          // Ensure the semesters relationship is loaded with pivot data
    $semester = $student->semesters->firstWhere('pivot.status', 1);

    // Check if the semester and its related data are not null
    if ($semester && isset($semester->semester)) {
        return $semester->semester->semester_order == 1;
    }

    // Return false if semester or related data is null
    return false;
    }

    private function calculatePercentage($student)
    {
        $currentSemester = $student->semesters->where('pivot.status', 1)->first();

    // If there's no current semester, return 0
    if (!$currentSemester || !$currentSemester->semester) {
        return 0;
    }

    $previousSemesters = $student->semesters->filter(function ($semester) use ($currentSemester) {
        return isset($semester->semester) && $semester->semester->semester_order < $currentSemester->semester->semester_order;
    });

    $totalWeightedMarks = 0;
    $totalCredits = 0;

    foreach ($previousSemesters as $semester) {
        $assignedSubjects = Assign_Subject::where('department_id', $student->department_id)
                                           ->where('semester_id', $semester->id)
                                           ->pluck('subject_id')
                                           ->toArray();

        $marks = $student->marks()
                         ->whereIn('subject_id', $assignedSubjects)
                         ->whereHas('subject', function ($query) use ($semester) {
                             $query->whereHas('semesters', function ($query) use ($semester) {
                                 $query->where('semester_id', $semester->id);
                             });
                         })
                         ->get();

        $subjectMarks = $marks->groupBy('subject_id')->map(function ($subjectMarks) {
            $latestMark = $subjectMarks->sortByDesc('chance')->first();
            return [
                'credit' => $latestMark->subject->credit,
                'total_marks' => ($latestMark->home_work_marks) +
                                 ($latestMark->attendence_and_class_activity_marks) +
                                 ($latestMark->midterm_marks) +
                                 ($latestMark->final_marks),
                'weighted_marks' => (($latestMark->home_work_marks) +
                      ($latestMark->attendence_and_class_activity_marks) +
                      ($latestMark->midterm_marks) +
                      ($latestMark->final_marks)) * $latestMark->subject->credit
            ];
        })->values();

        $totalWeightedMarks += $subjectMarks->sum('weighted_marks');
        $totalCredits += $subjectMarks->sum('credit');
    }

    return $totalCredits > 0 ? ($totalWeightedMarks / ($totalCredits * 100)) * 100 : 0;

}

    }
