<?php

namespace App\Http\Controllers;

use App\Models\Marks;
use App\Http\Requests\StoreMarksRequest;
use App\Http\Requests\UpdateMarksRequest;
use Illuminate\Validation\ValidationException;
 use Illuminate\Database\QueryException;
use App\Http\Resources\StudentResource;
use App\Models\Department;
use App\Models\Semester;
use App\Models\Student;
use App\Models\Subject;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MarksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    public function create(Request $request)
    {
      $teacher_name = Auth()->user()->name;


        $department_id = $request->department_id;
        $semester_id = $request->semester_id;
        $subject_id = $request->subject_id;

        // Fetch students with their attendance records for the specific department and semester
        $students = Student::where('department_id', $department_id)
            ->whereHas('semesters', function ($query) use ($semester_id) {
                $query->where('semester_id', $semester_id);
            })
            ->with(['attendence' => function ($query) use ($semester_id, $subject_id) {
                // Filter attendance records for the specific semester and subject
                $query->where('semester_id', $semester_id)
                      ->where('subject_id', $subject_id);
            }])
            ->with(['marks' => function ($query) use ($subject_id) {
                // Filter marks records for the specific subject and only the first chance
                $query->where('subject_id', $subject_id)
                      ->where('chance', 1);
            }])
            ->get()
            ->filter(function ($student) use ($subject_id) {
                // Calculate total and absent hours for the specific subject
                $totalHours = $student->attendence->where('subject_id', $subject_id)->sum('total_hours');
                $absentHours = $student->attendence->where('subject_id', $subject_id)->sum('absent_hours');

                // Calculate absent percentage for the specific subject
                $absentPercentage = ($absentHours / $totalHours) * 100;

                // Return true if absent percentage is not more than 25%
                return $absentPercentage <= 25;
            });


        $subject = Subject::findOrFail($subject_id);
        $semester = Semester::findOrFail($semester_id);
        $department = Department::findOrFail($department_id);

        $usertype = Auth()->user()->usertype;

        return Inertia::render("teacher/marks/create/CreateChance1", [
            'subject' => $subject->name,
            'subjectid' => $subject_id,
            'department' => $department->name,
            'semester' => $semester->name,
            'department_id' => $department_id,
            'semester_id' => $semester_id,
            'students' => StudentResource::collection($students),
            'success' => session('success'),
            'error' => session('error'),
            'teacher_name' => $teacher_name,

            'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */



        public function store(Request $request, $subject_id)
        {

            try {
                // Validate the incoming request data
                $validatedData = $request->validate([
                    'student_id' => 'required|integer',
                    'chance' => 'required|integer',
                    'homework' => 'required|numeric|min:0|max:100',
                    'class_activity' => 'required|numeric|min:0|max:100',
                    'midterm' => 'required|numeric|min:0|max:100',
                    'final' => 'required|numeric|min:0|max:100',
                ]);
                dd($validatedData);

                // Assign additional fields
                $validatedData['subject_id'] = $subject_id;
                $validatedData['marks_year'] = date('Y');

                // Insert into database
                Marks::create($validatedData);

                return response()->json(['message' => 'Marks inserted successfully'], 201);

            } catch (ValidationException $e) {
                // Handle validation errors
                return response()->json(['error' => $e->validator->errors()], 400);

            } catch (QueryException $e) {
                // Handle database insertion errors
                return response()->json(['error' => 'Failed to insert marks. Please try again.'], 500);
            }
        }


    public function storechance1All(StoreMarksRequest $request,$subject_id)
    {

        try {
            $marksData = $request->validated()['marks'];


            foreach ($marksData as $mark) {
                $gregorainYear = date('Y');
                $iranianYear = $gregorainYear - 621;

                $currentDate = Carbon::now();
                $startOfIranianYear = Carbon::create($gregorainYear,3,21);
                if($currentDate < $startOfIranianYear){
                    $iranianYear--;
                }

                Marks::create([

                    'student_id' => $mark['student_id'],
                    'subject_id' => $subject_id,
                    'chance' => 1,
                    'marks_year' =>$iranianYear,
                    'home_work_marks' => $mark['homework'],
                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                    'midterm_marks' => $mark['midterm'],
                    'final_marks' => $mark['final'],

                    ]);

            }

            return redirect()->back()->with("success","Marks has been assigned successfully!");

        }
        catch (QueryException $e) {

            $errorCode = $e->errorInfo[1];
            if($errorCode == 1062){

               return redirect()->back()
                                 ->withInput()
                                 ->with('error','Duplicate Entry,Marks did not asssgined!');
            }

            else{

               return redirect()->back()
                                ->withInput()
                                ->with('error','An error occured while assgining marks!');
            }
        }
    }

    public function storechance2All(StoreMarksRequest $request,$subject_id){

        try {
            $marksData = $request->validated()['marks'];

            foreach ($marksData as $mark) {
                $gregorainYear = date('Y');
                $iranianYear = $gregorainYear - 621;

                $currentDate = Carbon::now();
                $startOfIranianYear = Carbon::create($gregorainYear,3,21);
                if($currentDate < $startOfIranianYear){
                    $iranianYear--;
                }

                Marks::create([

                    'student_id' => $mark['student_id'],
                    'subject_id' => $subject_id,
                    'chance' => 2,
                    'marks_year' =>$iranianYear,
                    'home_work_marks' => $mark['homework'],
                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                    'midterm_marks' => $mark['midterm'],
                    'final_marks' => $mark['final'],

                    ]);

            }

            return redirect()->back()->with("success","Marks has been assigned successfully!");

        }
        catch (QueryException $e) {

            $errorCode = $e->errorInfo[1];
            if($errorCode == 1062){

               return redirect()->back()
                                 ->withInput()
                                 ->with('error','Duplicate Entry,Marks did not asssgined!');
            }

            else{

               return redirect()->back()
                                ->withInput()
                                ->with('error','An error occured while assgining marks!');
            }
        }

    }


    public function storechance3All(StoreMarksRequest $request,$subject_id){

        try {
            $marksData = $request->validated()['marks'];

            // Assign additional fields
            foreach ($marksData as $mark) {
                $gregorainYear = date('Y');
                $iranianYear = $gregorainYear - 621;

                $currentDate = Carbon::now();
                $startOfIranianYear = Carbon::create($gregorainYear,3,21);
                if($currentDate < $startOfIranianYear){
                    $iranianYear--;
                }

                Marks::create([

                    'student_id' => $mark['student_id'],
                    'subject_id' => $subject_id,
                    'chance' => 3,
                    'marks_year' =>$iranianYear,
                    'home_work_marks' => $mark['homework'],
                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                    'midterm_marks' => $mark['midterm'],
                    'final_marks' => $mark['final'],

                    ]);

            }

            return redirect()->back()->with("success","Marks has been assigned successfully!");

        }
        catch (QueryException $e) {

            $errorCode = $e->errorInfo[1];
            if($errorCode == 1062){

               return redirect()->back()
                                 ->withInput()
                                 ->with('error','Duplicate Entry,Marks did not asssgined!');
            }

            else{

               return redirect()->back()
                                ->withInput()
                                ->with('error','An error occured while assgining marks!');
            }
        }

    }


    public function storechance4All(StoreMarksRequest $request,$subject_id){

        try {
            $marksData = $request->validated()['marks'];

            // Assign additional fields
            foreach ($marksData as $mark) {
                $gregorainYear = date('Y');
                $iranianYear = $gregorainYear - 621;

                $currentDate = Carbon::now();
                $startOfIranianYear = Carbon::create($gregorainYear,3,21);
                if($currentDate < $startOfIranianYear){
                    $iranianYear--;
                }

                Marks::create([

                    'student_id' => $mark['student_id'],
                    'subject_id' => $subject_id,
                    'chance' => 4,
                    'marks_year' =>$iranianYear,
                    'home_work_marks' => $mark['homework'],
                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                    'midterm_marks' => $mark['midterm'],
                    'final_marks' => $mark['final'],

                    ]);

            }

            return redirect()->back()->with("success","Marks has been assigned successfully!");

        }
        catch (QueryException $e) {

            $errorCode = $e->errorInfo[1];
            if($errorCode == 1062){

               return redirect()->back()
                                 ->withInput()
                                 ->with('error','Duplicate Entry,Marks did not asssgined!');
            }

            else{

               return redirect()->back()
                                ->withInput()
                                ->with('error','An error occured while assgining marks!');
            }
        }

    }








    public function FailedStudentsChance2(Request $request)
    {
        $department_id = $request->department_id;
        $semester_id = $request->semester_id;
        $subject_id = $request->subjectid;
        $chance = $request->chance;

       $previousChance = $chance - 1;

    // Query to fetch students who failed at the previous chance
    $failedStudentsQuery = Student::where('department_id', $department_id)
        ->whereHas('semesters', function ($query) use ($semester_id) {
            $query->where('semester_id', $semester_id);
        })
        ->whereHas('marks', function ($query) use ($subject_id, $previousChance) {
            $query->where('subject_id', $subject_id)
                  ->where('chance', $previousChance)
                  ->whereRaw('home_work_marks + attendence_and_class_activity_marks + midterm_marks + final_marks < ?', [55]);
        });

    // Query to fetch students with an absent percentage greater than 25%
    $studentsWithHighAbsenteeism = Student::where('department_id', $department_id)
        ->whereHas('semesters', function ($query) use ($semester_id) {
            $query->where('semester_id', $semester_id);
        })
        ->with(['attendence' => function ($query) use ($subject_id) {
            $query->where('subject_id', $subject_id);
        }])
        ->get()
        ->filter(function ($student) use ($subject_id) {
            // Calculate total and absent hours for the specific subject
            $totalHours = $student->attendence->where('subject_id', $subject_id)->sum('total_hours');
            $absentHours = $student->attendence->where('subject_id', $subject_id)->sum('absent_hours');

            // Calculate absent percentage for the specific subject
            $absentPercentage = $totalHours > 0 ? ($absentHours / $totalHours) * 100 : 0;

            // Return true if absent percentage is greater than 25%
            return $absentPercentage > 25;
        });

    // Merge both result sets and remove duplicates
    $failedStudents = $failedStudentsQuery->get();
    $studentsWithHighAbsenteeism = $studentsWithHighAbsenteeism->unique('id');
    $allStudents = $failedStudents->merge($studentsWithHighAbsenteeism)->unique('id');

    // Fetch marks for the current chance
    $allStudents->load(['marks' => function ($query) use ($subject_id, $chance) {
        $query->where('subject_id', $subject_id)
              ->where('chance', $chance);
    }]);

    $subject = Subject::findOrFail($subject_id);
    $semester = Semester::findOrFail($semester_id);
    $department = Department::findOrFail($department_id);

    $usertype = Auth()->user()->usertype;

    return Inertia::render("teacher/marks/create/CreateChance2", [
        'subject' => $subject->name,
        'subjectid' => $subject_id,
        'department' => $department->name,
        'semester' => $semester->name,
        'department_id' => $department_id,
        'semester_id' => $semester_id,
        'students' => StudentResource::collection($allStudents),
        'success' => session('success'),
        'error' => session('error'),
        'usertype' => $usertype,
    ]);

    }


    public function FailedStudentsChance3(Request $request)
    {
        $department_id = $request->department_id;
        $semester_id = $request->semester_id;
        $subject_id = $request->subjectid;
        $chance = $request->chance;



        // Fetch students based on department and semester
        $studentsQuery = Student::where('department_id', $department_id)
            ->whereHas('semesters', function ($query) use ($semester_id) {
                $query->where('semester_id', $semester_id);
            });

        // Define the chance value for the previous attempt
        $previousChance = $chance - 1;

        // Fetch students who failed in the specified chance
        $failedStudents = $studentsQuery->whereHas('marks', function ($query) use ($subject_id, $previousChance) {
            $query->where('subject_id', $subject_id)
                  ->where('chance', $previousChance)
                  ->whereRaw('home_work_marks + attendence_and_class_activity_marks + midterm_marks + final_marks < ?', [55]);
        })
        ->with(['marks' => function ($query) use ($subject_id) {
            // Filter marks records for the specific subject and only the second chance
            $query->where('subject_id', $subject_id)
                  ->where('chance', 3);
        }])
        ->get();
        $subject = Subject::findOrFail($subject_id);
        $semester = Semester::findOrFail($semester_id);
        $department = Department::findOrFail($department_id);

        $usertype = Auth()->user()->usertype;

        return Inertia::render("teacher/marks/create/CreateChance3", [
            'subject' => $subject->name,
            'subjectid' => $subject_id,
            'department' => $department->name,
            'semester' => $semester->name,
            'department_id' => $department_id,
            'semester_id' => $semester_id,
            'students' => StudentResource::collection($failedStudents),
            'success' => session('success'),
            'error' => session('error'),
            //'teacher_name' => $teacher_name,

            'usertype' => $usertype,
        ]);
    }

    public function FailedStudentsChance4(Request $request)
    {
        $department_id = $request->department_id;
        $semester_id = $request->semester_id;
        $subject_id = $request->subjectid;
        $chance = $request->chance;



        // Fetch students based on department and semester
        $studentsQuery = Student::where('department_id', $department_id)
            ->whereHas('semesters', function ($query) use ($semester_id) {
                $query->where('semester_id', $semester_id);
            });

        // Define the chance value for the previous attempt
        $previousChance = $chance - 1;

        // Fetch students who failed in the specified chance
        $failedStudents = $studentsQuery->whereHas('marks', function ($query) use ($subject_id, $previousChance) {
            $query->where('subject_id', $subject_id)
                  ->where('chance', $previousChance)
                  ->whereRaw('home_work_marks + attendence_and_class_activity_marks + midterm_marks + final_marks < ?', [55]);
        })
        ->with(['marks' => function ($query) use ($subject_id) {
            // Filter marks records for the specific subject and only the second chance
            $query->where('subject_id', $subject_id)
                  ->where('chance', 4);
        }])
        ->get();
        $subject = Subject::findOrFail($subject_id);
        $semester = Semester::findOrFail($semester_id);
        $department = Department::findOrFail($department_id);

        $usertype = Auth()->user()->usertype;

        return Inertia::render("teacher/marks/create/CreateChance4", [
            'subject' => $subject->name,
            'subjectid' => $subject_id,
            'department' => $department->name,
            'semester' => $semester->name,
            'department_id' => $department_id,
            'semester_id' => $semester_id,
            'students' => StudentResource::collection($failedStudents),
            'success' => session('success'),
            'error' => session('error'),
            //'teacher_name' => $teacher_name,

            'usertype' => $usertype,
        ]);
    }




    /**w
     * Display the specified resource.
     */
    public function show(Marks $marks)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Marks $marks)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMarksRequest $request, Marks $marks)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marks $marks)
    {
        //
    }
}
