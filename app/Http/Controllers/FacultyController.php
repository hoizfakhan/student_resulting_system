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
    public function index()
    {
        // hi, i want to make attendence for students , i have student list, and the user can search them by their department and semester, when the user retrive the students of first semester, he should be able to to export the students name and father name to excel and arrange them by their kankor_marks, i dont save attendence , just i want to export the retirved students data to excel, iam using laravel with react using inertia, can you give the complete code


        try{

        $facultys= Faculty::paginate(4);

        $usertype=Auth()->user()->usertype;
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
    public function create()
    {
        $usertype=Auth()->user()->usertype;
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
    public function show(Faculty $faculty)
    {
        $fname=$faculty->faculty_name;

        $departments  = $faculty->departments();
        $departments  = $departments->paginate(4);

         $usertype=Auth()->user()->usertype;

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
    public function edit(Faculty $faculty)
    {
        $usertype=Auth()->user()->usertype;
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

    }
}
