<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignSubjectResource;
use App\Http\Resources\DepartmentSemesterResource;
use App\Http\Resources\SubjectResource;
use App\Models\Assign_Subject;
use App\Models\Department;
use App\Models\Department_Semester;
use App\Models\Semester;
use App\Models\Subject;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssignSubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $user = Auth::user();
        $departments = $request->user()->faculty->departments()->get();
        $semesters = Department_Semester::all();
        $subjects = Assign_Subject::all();

        $usertype=$user->usertype;
        return Inertia("admin/assign-subject-semester/Index",[
            'departments' => $departments->toArray(),
            'semesters' => DepartmentSemesterResource::collection($semesters),
            'subjects' => AssignSubjectResource::collection($subjects),
            'success' => session('success'),
            'error' => session('error'),
            'usertype' => $usertype,
         ]);
    }


    public function create(Request $request)
    {

        $user = Auth::user();
        $departments = $request->user()->faculty->departments()->get();
        $semesters = Department_Semester::all();
        $subjects =  Subject::all();
        $usertype=$user->usertype;
        return Inertia("admin/assign-subject-semester/Create",[
            'subjects' => $subjects,
            'departments' => $departments->toArray(),
            'semesters' => DepartmentSemesterResource::collection($semesters),
            'success' => session('success'),
            'error' => session('error'),
            'usertype' => $usertype,
         ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([

            'subject_id' => 'array',
            'subject_id.*' => 'integer',
            'department_id' => 'integer|required',
            'semester_id' => 'integer|required',

        ]);


        try {

        $subject_id = $request->subject_id;
        $user = $request->user();
        $userfacultyid =  $user->faculty_id;

        if (count($subject_id) > 0){
           for($i=0; $i<count($subject_id); $i++){

              $data = new Assign_Subject;

              $data->subject_id = $subject_id[$i];
              $data->faculty_id = $userfacultyid;
              $data->department_id = $request->department_id;
              $data->semester_id = $request->semester_id;

              $data->save();
           }

           return to_route("semestersubject.index")->with("success","New Subject has been assgined  successfully!");
        }

    } catch(QueryException $e){

        $errorCode = $e->errorInfo[1];
         if($errorCode == 1062){

            return redirect()->route('semestersubject.create')
                              ->withInput()
                              ->with('error','Duplicate Entry, Subject did not asssgined!');
         }

         else{

            return redirect()->route('semestersubject.create')
                             ->withInput()
                             ->with('error','An error occured while assigning subject!');
         }
    }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $subject = Assign_Subject::find($id);

            $subject->delete();
            return to_route('semestersubject.index')->with('success',"Subject has been deleted successfully!");
         }  catch(QueryException $e){

             $errorCode = $e->errorInfo[1];
             if($errorCode == 1451){ // this code is used when a column has child rows

                 return to_route("semestersubject.index")
                              ->with('error','Cannot delete this subject, it has associated records!');
             }

             else{
                return to_route("semestersubject.index")->with('error','An error occured while deleteting subject');
             }

         }


    }
}
