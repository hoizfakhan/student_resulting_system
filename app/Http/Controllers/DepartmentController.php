<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\FacultyResource;
use App\Http\Resources\StudentResource;
use App\Models\Faculty;
use App\Models\Student;
use Illuminate\Database\QueryException;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\Log;
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
        $departments = Department::all();
       
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
        $departments = Department::all();
      
        return Inertia("SuperAdmin/department/Create",[
            'usertype' => $usertype,
            'success' => session('success'),
            'facultys' => FacultyResource::collection($facultys),
            'Departments' => DepartmentResource::collection($departments),

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

        $facultys =  Faculty::query()->orderBy('faculty_name','asc')->get();
        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/department/Edit",[
            'department' => new DepartmentResource($department),
            'facultys' => FacultyResource::collection($facultys),
            'success' => session('success'),
            'usertype' => $usertype,
        ]);


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {

             $data = $request->validated();
             try{
             $department->update($data);

             return to_route('department.edit',$department->id)->with('success',"department \"$department->name\" was updated successfully!");
             } catch(QueryException $e){

                Log::error($e->getMessage());
                return to_route('department.edit')
                                ->with('error','An error occured while updateing this department!');
             }


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
