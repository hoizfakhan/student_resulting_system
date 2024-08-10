<?php

namespace App\Http\Controllers;

use App\Models\Marks;
use App\Http\Requests\StoreMarksRequest;
use App\Http\Requests\UpdateMarksRequest;
use App\Http\Resources\DepartmentSemesterResource;
use Illuminate\Validation\ValidationException;
 use Illuminate\Database\QueryException;
use App\Http\Resources\StudentResource;
use App\Models\Assign_Subject;
use App\Models\Department;
use App\Models\Department_Semester;
use App\Models\Drop_Student;
use App\Models\Semester;
use App\Models\Student;
use App\Models\Student_Semester;
use App\Models\Student_Subject;
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

  //teacher part
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
            'info' => session('info'),
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


        public function storechance1All(StoreMarksRequest $request, $subject_id)
        {
            try {
                $marksData = $request->validated()['marks'];
                $changesMade = false;

                foreach ($marksData as $mark) {
                    $gregorainYear = date('Y');
                    $iranianYear = $gregorainYear - 621;
                    $currentDate = Carbon::now();
                    $startOfIranianYear = Carbon::create($gregorainYear, 3, 21);
                    if ($currentDate < $startOfIranianYear) {
                        $iranianYear--;
                    }

                    // Check if the record exists
                    $existingMark = Marks::where('student_id', $mark['student_id'])
                                          ->where('subject_id', $subject_id)
                                          ->where('chance', 1)
                                          ->where('marks_year', $iranianYear)
                                          ->first();

                    if ($existingMark) {
                        // Update existing record
                        if ($existingMark->home_work_marks != $mark['homework'] ||
                            $existingMark->attendence_and_class_activity_marks != $mark['class_activity'] ||
                            $existingMark->midterm_marks != $mark['midterm'] ||
                            $existingMark->final_marks != $mark['final']) {
                                $changesMade = true;
                                $existingMark->update([
                                    'home_work_marks' => $mark['homework'],
                                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                                    'midterm_marks' => $mark['midterm'],
                                    'final_marks' => $mark['final'],
                                ]);
                        }
                    } else {
                        // Create new record
                        $changesMade = true;
                        Marks::create([
                            'student_id' => $mark['student_id'],
                            'subject_id' => $subject_id,
                            'chance' => 1,
                            'marks_year' => $iranianYear,
                            'home_work_marks' => $mark['homework'],
                            'attendence_and_class_activity_marks' => $mark['class_activity'],
                            'midterm_marks' => $mark['midterm'],
                            'final_marks' => $mark['final'],
                        ]);
                    }
                }

                if ($changesMade) {
                    return redirect()->back()->with("success", "Marks have been saved/updated successfully!");
                } else {
                    return redirect()->back()->with("info", "No changes were made.");
                }
            } catch (QueryException $e) {
                $errorCode = $e->errorInfo[1];
                if ($errorCode == 1062) {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'Duplicate Entry, Marks were not assigned!');
                } else {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'An error occurred while assigning marks!');
                }
            }
        }



    public function storechance2All(StoreMarksRequest $request,$subject_id){

        {
            try {
                $marksData = $request->validated()['marks'];
                $changesMade = false;

                foreach ($marksData as $mark) {
                    $gregorainYear = date('Y');
                    $iranianYear = $gregorainYear - 621;
                    $currentDate = Carbon::now();
                    $startOfIranianYear = Carbon::create($gregorainYear, 3, 21);
                    if ($currentDate < $startOfIranianYear) {
                        $iranianYear--;
                    }

                    // Check if the record exists
                    $existingMark = Marks::where('student_id', $mark['student_id'])
                                          ->where('subject_id', $subject_id)
                                          ->where('chance', 2)
                                          ->where('marks_year', $iranianYear)
                                          ->first();

                    if ($existingMark) {
                        // Update existing record
                        if ($existingMark->home_work_marks != $mark['homework'] ||
                            $existingMark->attendence_and_class_activity_marks != $mark['class_activity'] ||
                            $existingMark->midterm_marks != $mark['midterm'] ||
                            $existingMark->final_marks != $mark['final']) {
                                $changesMade = true;
                                $existingMark->update([
                                    'home_work_marks' => $mark['homework'],
                                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                                    'midterm_marks' => $mark['midterm'],
                                    'final_marks' => $mark['final'],
                                ]);
                        }
                    } else {
                        // Create new record
                        $changesMade = true;
                        Marks::create([
                            'student_id' => $mark['student_id'],
                            'subject_id' => $subject_id,
                            'chance' => 2,
                            'marks_year' => $iranianYear,
                            'home_work_marks' => $mark['homework'],
                            'attendence_and_class_activity_marks' => $mark['class_activity'],
                            'midterm_marks' => $mark['midterm'],
                            'final_marks' => $mark['final'],
                        ]);
                    }
                }

                if ($changesMade) {
                    return redirect()->back()->with("success", "Marks have been saved/updated successfully!");
                } else {
                    return redirect()->back()->with("info", "No changes were made.");
                }
            } catch (QueryException $e) {
                $errorCode = $e->errorInfo[1];
                if ($errorCode == 1062) {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'Duplicate Entry, Marks were not assigned!');
                } else {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'An error occurred while assigning marks!');
                }
            }
        }
    }


    public function storechance3All(StoreMarksRequest $request,$subject_id){

        {
            try {
                $marksData = $request->validated()['marks'];
                $changesMade = false;

                foreach ($marksData as $mark) {
                    $gregorainYear = date('Y');
                    $iranianYear = $gregorainYear - 621;
                    $currentDate = Carbon::now();
                    $startOfIranianYear = Carbon::create($gregorainYear, 3, 21);
                    if ($currentDate < $startOfIranianYear) {
                        $iranianYear--;
                    }

                    // Check if the record exists
                    $existingMark = Marks::where('student_id', $mark['student_id'])
                                          ->where('subject_id', $subject_id)
                                          ->where('chance', 3)
                                          ->where('marks_year', $iranianYear)
                                          ->first();

                    if ($existingMark) {
                        // Update existing record
                        if ($existingMark->home_work_marks != $mark['homework'] ||
                            $existingMark->attendence_and_class_activity_marks != $mark['class_activity'] ||
                            $existingMark->midterm_marks != $mark['midterm'] ||
                            $existingMark->final_marks != $mark['final']) {
                                $changesMade = true;
                                $existingMark->update([
                                    'home_work_marks' => $mark['homework'],
                                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                                    'midterm_marks' => $mark['midterm'],
                                    'final_marks' => $mark['final'],
                                ]);
                        }
                    } else {
                        // Create new record
                        $changesMade = true;
                        Marks::create([
                            'student_id' => $mark['student_id'],
                            'subject_id' => $subject_id,
                            'chance' => 3,
                            'marks_year' => $iranianYear,
                            'home_work_marks' => $mark['homework'],
                            'attendence_and_class_activity_marks' => $mark['class_activity'],
                            'midterm_marks' => $mark['midterm'],
                            'final_marks' => $mark['final'],
                        ]);
                    }
                }

                if ($changesMade) {
                    return redirect()->back()->with("success", "Marks have been saved/updated successfully!");
                } else {
                    return redirect()->back()->with("info", "No changes were made.");
                }
            } catch (QueryException $e) {
                $errorCode = $e->errorInfo[1];
                if ($errorCode == 1062) {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'Duplicate Entry, Marks were not assigned!');
                } else {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'An error occurred while assigning marks!');
                }
            }
        }

    }


    public function storechance4All(StoreMarksRequest $request,$subject_id){

        {
            try {
                $marksData = $request->validated()['marks'];
                $changesMade = false;

                foreach ($marksData as $mark) {
                    $gregorainYear = date('Y');
                    $iranianYear = $gregorainYear - 621;
                    $currentDate = Carbon::now();
                    $startOfIranianYear = Carbon::create($gregorainYear, 3, 21);
                    if ($currentDate < $startOfIranianYear) {
                        $iranianYear--;
                    }

                    // Check if the record exists
                    $existingMark = Marks::where('student_id', $mark['student_id'])
                                          ->where('subject_id', $subject_id)
                                          ->where('chance', 4)
                                          ->where('marks_year', $iranianYear)
                                          ->first();

                    if ($existingMark) {
                        // Update existing record
                        if ($existingMark->home_work_marks != $mark['homework'] ||
                            $existingMark->attendence_and_class_activity_marks != $mark['class_activity'] ||
                            $existingMark->midterm_marks != $mark['midterm'] ||
                            $existingMark->final_marks != $mark['final']) {
                                $changesMade = true;
                                $existingMark->update([
                                    'home_work_marks' => $mark['homework'],
                                    'attendence_and_class_activity_marks' => $mark['class_activity'],
                                    'midterm_marks' => $mark['midterm'],
                                    'final_marks' => $mark['final'],
                                ]);
                        }
                    } else {
                        // Create new record
                        $changesMade = true;
                        Marks::create([
                            'student_id' => $mark['student_id'],
                            'subject_id' => $subject_id,
                            'chance' => 4,
                            'marks_year' => $iranianYear,
                            'home_work_marks' => $mark['homework'],
                            'attendence_and_class_activity_marks' => $mark['class_activity'],
                            'midterm_marks' => $mark['midterm'],
                            'final_marks' => $mark['final'],
                        ]);
                    }
                }

                if ($changesMade) {
                    return redirect()->back()->with("success", "Marks have been saved/updated successfully!");
                } else {
                    return redirect()->back()->with("info", "No changes were made.");
                }
            } catch (QueryException $e) {
                $errorCode = $e->errorInfo[1];
                if ($errorCode == 1062) {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'Duplicate Entry, Marks were not assigned!');
                } else {
                    return redirect()->back()
                                     ->withInput()
                                     ->with('error', 'An error occurred while assigning marks!');
                }
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
        'info' => session('info'),
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
            'info' => session('info'),
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
            'info' => session('info'),
            //'teacher_name' => $teacher_name,

            'usertype' => $usertype,
        ]);
    }

    //admin part

    public function ShowStudents(Request $request)
    {
        $user = $request->user();

        // Fetch all students with semesters
        $students = $user->faculty->students()
            ->with(['semesters' => function ($query) {
                $query->orderBy('status'); // Ensure that the current semester appears first
            }])
            ->get();

        // Transform the collection to add current semester to each student
        $students->transform(function ($student) {
            // Find the current semester based on the status in the pivot table
            $student->current_semester = $student->semesters->firstWhere('pivot.status', 1);
            return $student;
        });

        $departments = $user->faculty->departments()->get();
        $departmentsemesters = Department_Semester::all();
        $usertype = Auth()->user()->usertype;

        return Inertia::render("admin/Result/student/ShowStudent", [
            'departments' => $departments->toArray(),
            'semesters' => DepartmentSemesterResource::collection($departmentsemesters),
            'students' => StudentResource::collection($students),
            'success' => session('success'),
            'error' => session('error'),
            'usertype' => $usertype,
        ]);
    }




    public function ShowMarks(Request $request)
    {
        $student_id = $request->student_id;
        $student = Student::find($student_id);

        if (!$student) {
            return response()->json([
                'message' => 'Student not found'
            ], 404);
        }

        $department = $student->department;
        $semesters = $student->semesters()->get();

        $currentSemesterId = $semesters->firstWhere('pivot.status', 1);
        $current_semester_id = $currentSemesterId->id;

        $marks = $semesters->mapWithKeys(function ($semester) use ($student, $department) {
            // Fetch subjects assigned to the student's department and the current semester
            $assignedSubjects = Assign_Subject::where('department_id', $department->id)
                                               ->where('semester_id', $semester->id)
                                               ->pluck('subject_id')
                                               ->toArray();

            // Fetch marks for the student in these subjects for the current semester
            $marks = $student->marks()
                             ->whereIn('subject_id', $assignedSubjects)
                             ->whereHas('subject', function ($query) use ($semester) {
                                 $query->whereHas('semesters', function ($query) use ($semester) {
                                     $query->where('semester_id', $semester->id);
                                 });
                             })
                             ->get();

            // Count the number of times the student failed this semester
            $failuresCount = $student->semesters()
                                      ->where('semester_id', $semester->id)
                                      ->where('status', 3) // Status 3 indicates failure
                                      ->count();

            // Group marks by subject
            $subjectMarks = $marks->groupBy('subject_id')->map(function ($subjectMarks) {
                $latestMark = $subjectMarks->sortByDesc('chance')->first();
                return [
                    'subject' => $latestMark->subject->name,
                    'credit' => $latestMark->subject->credit,
                    'home_work' => $latestMark->home_work_marks,
                    'class_activity' => $latestMark->attendence_and_class_activity_marks,
                    'midterm' => $latestMark->midterm_marks,
                    'final' => $latestMark->final_marks,
                    'chance' => $latestMark->chance,
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

            // Calculate total weighted marks and percentage
            $totalWeightedMarks = $subjectMarks->sum('weighted_marks');
            $totalCredits = $subjectMarks->sum('credit');
            $percentage = $totalCredits > 0 ? ($totalWeightedMarks / ($totalCredits * 100)) * 100 : 0;

            return [
                $semester->name => [
                    'semester_id' => $semester->id,
                    'subjectMarks' => $subjectMarks->toArray(),
                    'percentage' => $percentage,
                    'failures_count' => $failuresCount
                ]
            ];
        })->toArray();

        $usertype = Auth()->user()->usertype;

        return Inertia::render("admin/Result/student/ShowMarks", [
            'marks' => $marks,
            'Sname' => $student->name,
            'studentId' => $student_id,
            'Lname' => $student->last_name,
            'Sdepartment' => $department ? $department->name : 'Unknown',
            'semesterId' => $current_semester_id,
            'studentDropStatus' => $student->status,
            'success' => session('success'),
            'error' => session('error'),
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



   public function ShowMarks1(Request $request)
{

    $student_id = $request->student_id;
    $student = Student::find($student_id);
    $department = $student->department;


    if (!$student) {
        return response()->json([
            'message' => 'Student not found'
        ], 404);
    }

    // Get all semesters for the student
    $semesters = $student->semesters()->get();

    // Fetch marks for each semester
    $marks = $semesters->mapWithKeys(function ($semester) use ($student) {
        return [
            $semester->name => $student->marks()->whereHas('subject', function ($query) use ($semester) {
                $query->whereHas('semesters', function ($query) use ($semester) {
                    $query->where('semester_id', $semester->id);
                });
            })->get()->map(function ($mark) {
                return [
                    'subject' => $mark->subject->name,
                    'credit' => $mark->subject->credit,
                    'home_work' => $mark->home_work_marks,
                    'class_activity' => $mark->attendence_and_class_activity_marks,
                    'midterm' => $mark->midterm_marks,
                    'final' => $mark->final_marks,
                    'chance' => $mark->chance,
                ];
            })
        ];
    });

    $usertype = Auth()->user()->usertype;
    return Inertia::render("admin/Result/student/ShowMarks", [
        'marks' => $marks,
        'Sname' => $student->name,
        'studentId'=> $student_id,
        'Lname' => $student->last_name,
        'Sdepartment' => $department ? $department->name : 'Unknown',
        'success' => session('success'),

        'error' => session('error'),
        'usertype' => $usertype,
    ]);

}


  public function promoteStudent(Request $request)
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


        public function submitDropForm(Request $request)
      {
    $request->validate([
        'student_id' => 'required',
        'semester_id' => 'required',
        'drop_reason' => 'required|string',
        'maktob_number' => 'required|string'
    ]);

    Drop_Student::create([
        'student_id' => $request->input('student_id'),
        'semester_id' => $request->input('semester_id'),
        'drop_year' => $request->input('drop_year'),
        'drop_reason' => $request->input('drop_reason'),
        'maktob_number' => $request->input('maktob_number')
    ]);

    // Update the student's status to dropped
    $student = Student::find($request->input('student_id'));
    $student->status = 4; // Dropped
    $student->save();

    return redirect()->route('student.index')->with('error', 'Student has been dropped successfully.');
}

    }





