<?php

namespace App\Http\Controllers;

use App\Models\Attendence;
use App\Http\Requests\StoreAttendenceRequest;
use App\Http\Requests\UpdateAttendenceRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\StudentResource;
use App\Models\Department;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

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

        $department_id = $request->department_id;
        $semester = $request->semester;
        $subjectid = $request->subjectid;
        $subject = Subject::findOrFail($subjectid);
        $department = Department::findOrFail($department_id);

        $students =  Student::where('department_id',$department_id)->where('current_semester',$semester)
                          ->with('attendence')
                          ->orderBy('id')
                          ->get();

       $usertype=Auth()->user()->usertype;
       return Inertia("teacher/attendence/Create",[

        'subject' => $subject->name,
        'department' => $department->name,
        'subjectid' => $subjectid,
        'semester' => $semester,
        'students' => StudentResource::collection($students),
        'success' => session('success'),
        'error' => session('error'),
        'usertype' => $usertype,

       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendenceRequest $request,$subjectid,$semester)
    {

       try{

      $data = $request->validated()['attendances'];

       foreach($data as $dt){
       Attendence::create([
        'student_id' => $dt['student_id'],
        'subject_id' => $subjectid,
        'semester' => $semester,
        'attendence_year' => date('Y'),
        'total_hours' => $dt['total_hours'],
        'absent_hours' => $dt['absent_hours'],

        ]);

      }

      return redirect()->back()->with("success","Attendence has been assigned successfully!");

       } catch(QueryException $e){

        $errorCode = $e->errorInfo[1];
        if($errorCode == 1062){

           return redirect()->back()
                             ->withInput()
                             ->with('error','Duplicate Entry, Attendence did not asssgined!');
        }

        else{

           return redirect()->back()
                            ->withInput()
                            ->with('error','An error occured while assgining attendences!');
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
}
