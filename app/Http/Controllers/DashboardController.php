<?php

namespace App\Http\Controllers;

use App\Models\Assign_Subject;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function Laravel\Prompts\select;

class DashboardController extends Controller
{
    public function index(Request $request){


      if(Auth::check()){

        $user = Auth::user();
        $usertype = $user->usertype;
        $status = $user->status;

        if($usertype == 0 ){



              return Inertia('student/Dashboard',[
             'usertype' => $usertype,
          ]);




        }

        else if($usertype == 1) {

            $user = $request->user();
            $departments = $user->faculty->departments;
            $newstudents = Student::getNewStudents();


            $departmentsWithStudentData = $departments->map(function ($department) {
                // Count students in the department
                $studentCount = $department->students()->count();

                // Retrieve students in the department with status 1 (currently enrolled)
                $students = $department->students()->where('status', 1)->get();

                // Calculate the number of students with 85% or more
                $highPerformingStudents = $students->filter(function ($student) {
                    $percentageSum = $student->semesters->filter(function ($semester) use ($student) {
                        return $semester->pivot->status == 2; // Only include passed semesters
                    })->map(function ($semester) use ($student) {
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
                                'weighted_marks' => (
                                    ($latestMark->home_work_marks +
                                     $latestMark->attendence_and_class_activity_marks +
                                     $latestMark->midterm_marks +
                                     $latestMark->final_marks)
                                    * $latestMark->subject->credit
                                ),
                                'total_marks' => (
                                    $latestMark->home_work_marks +
                                    $latestMark->attendence_and_class_activity_marks +
                                    $latestMark->midterm_marks +
                                    $latestMark->final_marks
                                ),
                            ];
                        })->values();

                        $totalWeightedMarks = $subjectMarks->sum('weighted_marks');
                        $totalCredits = $subjectMarks->sum('credit');
                        $percentage = $totalCredits > 0 ? ($totalWeightedMarks / ($totalCredits * 100)) * 100 : 0;

                        return $percentage;
                    })->toArray();

                    $totalPercentage = array_sum($percentageSum);
                    $totalSemesters = count($percentageSum);
                    $averagePercentage = $totalSemesters > 0 ? ($totalPercentage / $totalSemesters) : 0;

                    return $averagePercentage >= 90;
                });

                return [
                    'id' => $department->id,
                    'name' => $department->name,
                    'student_count' => $studentCount,
                    'high_performing_students' => $highPerformingStudents->map(function ($student) {
                        return [
                            'name' => $student->name,
                            'father_name' => $student->father_name,
                            'department' => $student->department->name,
                        ];
                    })->toArray(), // Ensure this is always an array
                ];
            });

            return Inertia('admin/Dashboard', [
                'usertype' => $user->usertype,
                'departments' => $departments->toArray(),
                'departmentstudents' => $departmentsWithStudentData->toArray(),
                'newstudents' => $newstudents,
            ]);
        }


        else if($usertype == 2){





            return inertia('teacher/subject/TeacherSubject',[
                'usertype' => $usertype,

            ]);
        }

        else if($usertype == 3){

              $totalfacultymanager = User::getTotalUser(1);
              $totalfaculty = Faculty::gettotalfaculty();
              $totaldepartment = Department::gettotaldepartment();
              $totalstudents =   Student::getTotalStudents();
              $newstudents = Student::getNewStudents();
              $graduatedstudents = Student::getgraduatedstudents();
              $totalteachers = Teacher::getTotalTeachers();


               return inertia('SuperAdmin/Dashboard',[
                'usertype' => $usertype,
                'totalfacultymanager' => $totalfacultymanager,
                'totalfaculty' => $totalfaculty,
                'totaldepartment' => $totaldepartment,
                'totalstudents' => $totalstudents,
                'newstudents' => $newstudents,
                'graduatedstudents' => $graduatedstudents,
                'totalteachers' => $totalteachers,
            ]);
        }
      }

      else{

        abort(401);
      }


    }

    public function result(){
        $user = Auth::user();
        $usertype=$user->usertype;
        return Inertia('Dashboard',[
            'usertype' => $usertype,
        ]);
    }

    public function teacher(){
        $user = Auth::user();
        $usertype=$user->usertype;

        return Inertia('teacher/teacher',[
            'usertype' => $usertype,

        ]);
    }


}
