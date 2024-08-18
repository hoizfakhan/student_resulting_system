<?php

namespace App\Http\Controllers;

use App\Models\Attendence;
use App\Http\Requests\StoreAttendenceRequest;
use App\Http\Requests\UpdateAttendenceRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\DepartmentSemesterResource;
use App\Http\Resources\StudentResource;
use App\Models\Assign_Subject;
use App\Models\Department;
use App\Models\Department_Semester;
use App\Models\Marks;
use App\Models\Semester;
use App\Models\Student;
use App\Models\Subject;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\ExportStudent;
use Maatwebsite\Excel\Facades\Excel;


class AttendenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user =  $request->user();

        $department_id = $request->department_id;
        $semester_id = $request->semester_id;
        $subject_id = $request->subject_id;

        $students = Student::where('department_id', $department_id)
                 ->where('students.status',1)
                ->whereHas('semesters', function ($query) use ($semester_id) {
            $query->where('semester_id', $semester_id)
                       ->where('status', 1);
        })
        ->with(['attendence' => function ($query) use ($subject_id) {
            $query->where('subject_id', $subject_id);

        }])
          ->get();



        $subject = Subject::findOrFail($subject_id);
        $semester = Semester::findOrFail($semester_id);
        $department = Department::findOrFail($department_id);


       $usertype=$user->usertype;
       return Inertia::render("teacher/attendence/Create",[

        'subject' => $subject->name,
        'department' => $department->name,
        'subjectid' => $subject_id,
        'semester_id' => $semester_id,
        'semester' => $semester->name,
        'students' => StudentResource::collection($students),
        'success' => session('success'),
        'error' => session('error'),
        'usertype' => $usertype,

       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendenceRequest $request, $subject_id, $semester_id)
    {
        try {
            $data = $request->validated()['attendances'];

            foreach ($data as $dt) {
                $gregorianYear = date('Y');
                $iranianYear = $gregorianYear - 621;

                $currentDate = Carbon::now();
                $startOfIranianYear = Carbon::create($gregorianYear, 3, 21);
                if ($currentDate < $startOfIranianYear) {
                    $iranianYear--;
                }

                // Store attendance data
                Attendence::create([
                    'student_id' => $dt['student_id'],
                    'subject_id' => $subject_id,
                    'semester_id' => $semester_id,
                    'attendence_year' => $iranianYear,
                    'total_hours' => $dt['total_hours'],
                    'absent_hours' => $dt['absent_hours'],
                ]);

                // Calculate attendance compliance
                $totalHours = $dt['total_hours'];
                $absentHours = $dt['absent_hours'];
                $attendancePercentage = ($totalHours - $absentHours) / $totalHours * 100;

                // Check if the absence exceeds 25%
                if ($attendancePercentage < 75) {
                    // Update or create marks entry with zero for the first chance
                    $marksEntry = Marks::updateOrCreate(
                        [
                            'student_id' => $dt['student_id'],
                            'subject_id' => $subject_id,
                            'marks_year' => $iranianYear,
                            'chance' => 1 // Assuming 1 is the first chance
                        ],
                        [
                            'home_work_marks' => 0,
                            'attendence_and_class_activity_marks' => 0,
                            'midterm_marks' => 0,
                            'final_marks' => 0,
                        ]
                    );
                }
            }

            return redirect()->back()->with("success", "Attendance has been assigned successfully!");

        } catch (QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                return redirect()->back()
                                 ->withInput()
                                 ->with('error', 'Duplicate Entry, Attendance did not assign!');
            } else {
                return redirect()->back()
                                 ->withInput()
                                 ->with('error', 'An error occurred while assigning attendance!');
            }
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Attendence $attendence)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendence $attendence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendenceRequest $request, Attendence $attendence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendence $attendence)
    {
        //
    }


    public function getStudents(Request $request){


        $user =  $request->user();
        $departments = $request->user()->faculty->departments()->get();
        $semesters = Department_Semester::all();
        $students =  $request->user()->faculty->students()
                         ->where('students.status',1)
                         ->get();


        $usertype=$user->usertype;
        return Inertia("admin/attendence/Index",[
            'departments' => $departments->toArray(),
            'semesters' => DepartmentSemesterResource::collection($semesters),
            'students' => StudentResource::collection($students),
            'success' => session('success'),
            'error' => session('error'),
            'usertype' => $usertype,
         ]);


    }

    public function export_students(Request $request){

        $departmentId = $request->query('department_id');
        $semesterId = $request->query('semester_id');

    if (!$departmentId || !$semesterId) {
        return response()->json(['error' => 'Department ID and Semester ID are required'], 400);
    }

    // Fetch the current semester to get its order
    $currentSemester = Semester::find($semesterId);

    if (!$currentSemester) {
        return response()->json(['error' => 'Invalid Semester ID'], 400);
    }

    // Fetch the students with the specified department, current semester, and status
    $students = Student::where('department_id', $departmentId)
        ->where('status', 1)
        ->whereHas('semesters', function ($query) use ($semesterId) {
            $query->where('semester_id', $semesterId)
                ->where('status', 1);
        })
        ->with('marks.subject')
        ->get();





     return Excel::download(new ExportStudent($students,$currentSemester->semester_order), 'studentattendece.xlsx');

    }
}
