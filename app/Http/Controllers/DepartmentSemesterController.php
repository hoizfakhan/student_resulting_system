<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentSemesterResource;
use App\Models\Department;
use App\Models\Department_Semester;
use App\Models\Faculty;
use App\Models\Semester;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class DepartmentSemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
           $facultys = Faculty::all();
           $departments = Department::all();
           $departmentsemesters = Department_Semester::all();

          $usertype=Auth()->user()->usertype;
          return Inertia("SuperAdmin/semester/assign-semester/Index",[
            'Departments' => $departments->toArray(),
            'semesters' => DepartmentSemesterResource::collection($departmentsemesters),
            'facultys' => $facultys->toArray(),
            'success'=>session('success'),
            'error' => session('error'),
            'usertype' => $usertype,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $facultys = Faculty::all();
        $departments = Department::all();
        $semesters = Semester::all();
        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/semester/assign-semester/Create",[
          'Departments' => $departments->toArray(),
          'semesters' => $semesters,
          'facultys' => $facultys,
          'success'=>session('success'),
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

            'department_id' => 'required|integer',
            'semester_id' => 'array',
            'semester_id.*' => 'integer',

        ]);

        try {

        $semester_id = $request->semester_id;


        if(count($semester_id) > 0){
           for($i=0; $i<count($semester_id); $i++){

              $data = new Department_Semester;

              $data->semester_id = $semester_id[$i];
              $data->department_id = $request->department_id;

             $data->save();

           }

           return to_route("assignsemester.index")->with("success","New Semester has been assgined  successfully!");
        }
    } catch(QueryException $e){

        $errorCode = $e->errorInfo[1];
         if($errorCode == 1062){

            return redirect()->route('assignsemester.create')
                              ->withInput()
                              ->with('error','Duplicate Entry, Semester did not asssgined!');
         }

         else{

            return redirect()->route('assignsemester.create')
                             ->withInput()
                             ->with('error','An error occured while assgining semester!');
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




    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

       try{
        $semester = Department_Semester::find($id);
        $semester->delete();
        return to_route('assignsemester.index')->with('success',"Semester deleted successfully!");
     }  catch(QueryException $e){

         $errorCode = $e->errorInfo[1];
         if($errorCode == 1451){ // this code is used when a column has child rows

             return to_route("assignsemester.index")
                          ->with('error','Cannot delete this semester, it has associated records!');
         }

         else{
            return to_route("assignsemester.index")->with('error','An error occured while deleteting semester');
         }

     }
    }
}
