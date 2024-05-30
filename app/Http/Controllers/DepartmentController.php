<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\FacultyResource;
use App\Models\Faculty;
use Illuminate\Database\QueryException;
use Illuminate\Database\Events\QueryExecuted;
use Inertia\Inertia;
use Psy\CodeCleaner\ReturnTypePass;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
     {


     }

     public function getDepartments($facultyid){
        $usertype=Auth()->user()->usertype;
        $departments = Department::where('faculty_id',$facultyid)->get();
        return Inertia("SuperAdmin/teacher/Create",[
            'departments' => DepartmentResource::collection($departments),
            'usertype' => $usertype,
        ]);


      }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $facultys =  Faculty::query()->orderBy('faculty_name','asc')->get();

        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/department/Create",[
            'usertype' => $usertype,
            'success' => session('success'),
            'facultys' => FacultyResource::collection($facultys),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {

      $data=$request->validated();

     try{

      Department::create($data);
      return to_route("faculty.index")->with('success','New department successfully registered!');

      }
      catch(QueryException $errorMesssage){

        $errorMesssage = "Department already exists!";
        return response()->json(['error' => $errorMesssage],422);

      }

    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        dd($department);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {

        try{
            $name=$department->name;
            $department->delete();
            return redirect()->back()->with('success',"Department \"$name\" deleted successfully!");
         }  catch(QueryException $e){

             $errorCode = $e->errorInfo[1];
             if($errorCode == 1451){

                 return redirect()->back()
                              ->with('error','You cannot delete the department, it has associated records!');
             }
             else{
                return redirect()->back()->with('error','An error occured while deleteting department');
             }

         }


    }
}
