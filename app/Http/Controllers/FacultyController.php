<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreFacultyRequest;
use App\Http\Requests\UpdateFacultyRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\FacultyResource;
use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use Inertia\Inertia;

class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // hi, i want to make attendence for students , i have student list, and the user can search them by their department and semester, when the user retrive the students of first semester, he should be able to to export the students name and father name to excel and arrange them by their kankor_marks, i dont save attendence , just i want to export the retirved students data to excel, iam using laravel with react using inertia, can you give the complete code


        try{

        $user =  $request->user();
        $facultys= Faculty::paginate(4);

        $usertype=$user->usertype;
        return Inertia('SuperAdmin/faculty/Index',[
            'usertype' => $usertype,
            'success' => session('success'),
            'error' => session('error'),
            'facultys' => FacultyResource::collection($facultys),

        ]);

    } catch(QueryException $e){

      Log::error($e->getMessage());

     return Inertia('SuperAdmin/faculty/Index')->with('error','An error occured while fetching faculty data!');
    }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia('SuperAdmin/faculty/Create',[
         'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFacultyRequest $request)
    {
       try {
       $request->validate([

              'name' => 'required|unique:faculties,faculty_name',
              'boss' => 'required',

        ]);

        $faculty = new Faculty;
        $faculty->faculty_name = $request->name;
        $faculty->faculty_boss = $request->boss;

        $faculty->save();

        return to_route('faculty.index')->with('success','New Faculty Successfully added!');
    } catch(QueryException $e){
         Log::error($e->getMessage());

        return redirect()->back()
                        ->with('error','An error occured while creating new faculty!');

      }

    }

    /**
     * Display the specified resource.
     */
    public function show(Faculty $faculty,Request $request)
    {
        $fname=$faculty->faculty_name;
        $user =  $request->user();

        $departments  = $faculty->departments();
        $departments  = $departments->paginate(4);

         $usertype=$user->usertype;

        return inertia("SuperAdmin/faculty/Departmentshow",[
            'usertype' => $usertype,
            'success' => session('success'),
            'departments'=>DepartmentResource::collection($departments),
            'fname' => $fname,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faculty $faculty,Request $request)
    {
        $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia("SuperAdmin/faculty/Edit",[
            'faculty' => new FacultyResource($faculty),
            'usertype' => $usertype,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFacultyRequest $request, Faculty $faculty)
    {
       $data = $request->validated();

       try{

        $faculty->update($data);
         return to_route("faculty.index")
                        ->with('success',"Faculty\" $faculty->faculty_name \" was updated successfully!");

       } catch(QueryException $e){

        Log::error($e->getMessage());

        return to_route("faculty.index")
                        ->with('error','An error occured while updating this faculty!');


       }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faculty $faculty)
    {


       try{
          $name=$faculty->faculty_name;
          $faculty->delete();
          return to_route('faculty.index')->with('success',"Faculty \"$name\" deleted successfully!");
       }  catch(QueryException $e){

           $errorCode = $e->errorInfo[1];
           if($errorCode == 1451){ // this code is used when a column has child rows

               return to_route("faculty.index")
                            ->with('error','cannot delete the faculty, it has associated departments!');
           }
           else{
              return to_route("faculty.index")->with('error','An error occured while deleteting faculty');
           }

       }



     {/*  public function promoteStudent(Request $request)
       {
           $student_id = $request->input('student_id');
           $current_semester_id = $request->input('current_semester_id');
           $current_semester = Semester::find($current_semester_id);

           $gregorainYear = date('Y');
           $iranianYear = $gregorainYear - 621;
           $currentDate = Carbon::now();
           $startOfIranianYear = Carbon::create($gregorainYear, 3, 21);
           if ($currentDate < $startOfIranianYear) {
               $iranianYear--;
           }

           // Validate input
           $request->validate([
               'student_id' => 'required',
               'current_semester_id' => 'required'
           ]);

           // Find the student and related department
           $student = Student::find($student_id);
           if (!$student) {
               return redirect()->back()->with('error', 'Student not found');
           }

           $department = $student->department;
           if (!$department) {
               return redirect()->back()->with('error', 'Department not found');
           }
           $department_id = $department->id;

           // Fetch the student's current semester record
           $studentSemester = $student->semesters()->where('semester_id', $current_semester_id)->first();

           // Check if the student is already promoted
           if ($studentSemester && $studentSemester->pivot->status == 2) {
               return redirect()->back()->with('success', 'Student has already been promoted!');
           }

           // Calculate total credits for subjects in the current semester and department
           $subjects = Subject::join('assign-_subjects', 'subjects.id', '=', 'assign-_subjects.subject_id')
               ->where('assign-_subjects.semester_id', $current_semester_id)
               ->where('assign-_subjects.department_id', $department_id)
               ->select('subjects.id', 'subjects.credit')
               ->get();

           $totalCredits = $subjects->sum('credit');

           // Calculate passed credits based on the student's marks
           $firstAttemptMarks = $student->marks()
               ->join('subjects', 'marks.subject_id', '=', 'subjects.id')
               ->join('assign-_subjects', 'subjects.id', '=', 'assign-_subjects.subject_id')
               ->where('assign-_subjects.semester_id', $current_semester_id)
               ->where('assign-_subjects.department_id', $department_id)
               ->where('marks.chance', 1) // Consider only the first attempt
               ->select('subjects.id', 'subjects.credit', 'marks.home_work_marks', 'marks.attendence_and_class_activity_marks', 'marks.midterm_marks', 'marks.final_marks')
               ->get();

           $passedCredits = $firstAttemptMarks->filter(function ($mark) {
               $totalMarks = $mark->home_work_marks
                   + $mark->attendence_and_class_activity_marks
                   + $mark->midterm_marks
                   + $mark->final_marks;

               return $totalMarks >= 55;
           })->sum('credit');

           // Determine status based on credits
           $status = ($totalCredits > 0 && ($passedCredits / $totalCredits >= 0.5)) ? 2 : 0;

            // Check previous failures in the current semester
            $previousFailures = Student_Semester::where('student_id', $student_id)
            ->where('semester_id', $current_semester_id)
            ->where('status', 3)
            ->count();


           // Update current semester status
           $stu_sem = Student_Semester::where('student_id', $student_id)
               ->where('semester_id', $current_semester_id)
               ->first();


              if ($previousFailures > 0) {

               $stu_sem = Student_Semester::where('student_id', $student_id)
               ->where('semester_id', $current_semester_id)
               ->where('status', 1)
               ->first();

              }

           if ($status == 2) {
               if ($stu_sem) {
                   $stu_sem->status = $status;
                   $stu_sem->save();
                   $next_semester = NULL;

                   switch($current_semester->name){
                       case 'first semester' :
                           $next_semester = Semester::where('name', 'second semester')->first();
                           break;
                       case 'second semester':
                           $next_semester = Semester::where('name', 'third semester')->first();
                           break;

                       case 'third semester':
                            $next_semester = Semester::where('name', 'fourth semester')->first();
                            break;

                       case 'fourth semester':
                          $next_semester = Semester::where('name', 'fifth semester')->first();
                          break;

                        case 'fifth semester':
                           $next_semester = Semester::where('name', 'sixth semester')->first();
                           break;

                       case 'sixth semester':
                               $next_semester = Semester::where('name', 'seventh semester')->first();
                               break;

                       case 'seventh semester':
                               $next_semester = Semester::where('name', 'eighth semester')->first();
                               break;

                        case 'eighth semester':
                              $next_semester = Semester::where('name', 'ninth semester')->first();
                              break;

                        case 'ninth semester':
                               $next_semester = Semester::where('name', 'tenth semester')->first();
                               break;

                       default:
                   }

                   Student_Semester::create([
                       'semester_id' => $next_semester->id,
                       'student_id' => $student_id,
                       'status' => 1
                   ]);



                }

               return redirect()->back()->with('success',"Student \"$student->name\" has been promoted to next semester successfully!");
         }
               else {

               // Check total failures in all semesters
                  $totalFailures = Student_Semester::where('student_id', $student_id)
                 ->where('status', 3)
                 ->count();

               if ($previousFailures > 0) {

                   $stu_sem = Student_Semester::where('student_id', $student_id)
                   ->where('semester_id', $current_semester_id)
                   ->where('status', 1)
                   ->first();

                   $stu_sem->status = 3;

                   $stu_sem->save();

                   Student_Semester::create([
                       'semester_id' => $current_semester_id,
                       'student_id' => $student_id,
                       'status' => 1
                   ]);

                    // Check total failures in all semesters
                    $totalFailures = Student_Semester::where('student_id', $student_id)
                   ->where('status', 3)
                   ->count();

                   if ($totalFailures >=4){


                      // If student has previously failed the same semester or total failures reach the threshold
                      $stu_sem->status = 4; // Dropped status
                      $stu_sem->save();


                      $student->status = 4;
                      $student->save();


                      Drop_Student::create([
                           'student_id' => $student_id,
                           'semester_id' => $current_semester_id,
                           'droped_year' => $iranianYear,

                       ]);


                       return redirect()->back()->with('error', "Student \"$student->name\" has been dropped from the university due to multiple failures.");
                       }



               } else {
                   // If it's the first failure for this semester
                   if ($stu_sem) {
                       $stu_sem->status = 3;
                       $stu_sem->save();
                   }

                // Create a new record for the current semester with status 1 (current)
               Student_Semester::create([
                   'semester_id' => $current_semester_id,
                   'student_id' => $student_id,
                   'status' => 1
               ]);

               return redirect()->back()->with('error', "Student \"$student->name\" has not completed the credits, cannot be promoted to the next semester (repeat Semester)!");
             }

               }

               }
            }

                        */}

                    }
}
