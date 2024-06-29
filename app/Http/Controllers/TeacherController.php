<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\FacultyResource;
use App\Http\Resources\SubjectResource;
use App\Http\Resources\TeacherResource;
use App\Http\Resources\TeacherSubjectResource;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $departments = Department::all();
        $facultys = Faculty::all();

        $query = Teacher::query();

        if(request("name")){

            $query->where("teachers.name","like","%".request("name")."%");
        }


        if(request('faculty')){
            $facultyname = $request->input('faculty');
            $facultyid  = Faculty::where('faculty_name',$facultyname)->first()->id;
            $query=Teacher::whereHas('department',function($query) use ($facultyid){
                            $query->whereHas('faculty',function($query) use ($facultyid){
                             $query->where('id',$facultyid);
                            });

           });

        }


        if(request('department')){
            $departmentname = $request->input('department');
            $departmentid  = Department::where('name',$departmentname)->first()->id;
            $query->whereHas('department',function($query) use ($departmentid){
                                       $query->where('id',$departmentid);

           });

        }





       $teachers =  $query->paginate(10);
        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/teacher/Index",[
            'usertype' => $usertype,
            'teachers' => TeacherResource::collection($teachers),
            'departments' => $departments->toArray(),
            'facultys' => $facultys->toArray(),
            'queryparams' => request()->query() ?: null,
            'success' => session("success"),
            'error' => session("error"),

         ]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $facultys =  Faculty::query()->orderBy('faculty_name','asc')->get();
        $usertype=Auth()->user()->usertype;
        $Departments =   Department::all();
        $teacherusers = User::where("usertype",2)->get();

        return Inertia("SuperAdmin/teacher/Create",[
            'usertype' => $usertype,
            'teacherusers' => $teacherusers->toArray(),
            'facultys' => FacultyResource::collection($facultys),
            'Departments' => DepartmentResource::collection($Departments),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {


         $data =  $request->validated();


         try{

            Teacher::create($data);

            return to_route("teacher.index")
                           ->with("success","New Teacher has been successfully added!");
         } catch(QueryException $e){

            Log::error($e->getMessage());
            return to_route('teacher.index')
                          ->with('error','An error occured while creating new teacher!');

         }

    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        $departments  = Department::all();
        $teacherusers = User::where("usertype",2)->get();
        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/teacher/Edit",[
            'teacher' => new TeacherResource($teacher),
            'teacherusers' => $teacherusers->toArray(),
            'departments' => $departments->toArray(),
            'usertype' => $usertype,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {


       $data =  $request->validated();
       $name =  $teacher->name;

       try{

        $teacher->update($data);
        return to_route("teacher.index")
                        ->with("success","teacher \"$name \" has been updated succcessfully!");
       } catch(QueryException $e){

        Log::error($e->getMessage());
        return to_route('teacher.index')
                      ->with('error','An error occured while Updating the teacher!');

       }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        try{
           $name = $teacher->name;
           $teacher->delete();
           return to_route("teacher.index")
                       ->with("success","teacher \"$name\" deleted successfully!");

        } catch(QueryException $e){

            $errorMessage = $e->getMessage();
            Log::error($errorMessage);

            return to_route("teacher.index")
                            ->with("error","An error acoored while deleting this teacher!");

        }
    }

    // teacher part

    public function TeacherSubjects(Request $request){

               $user =  $request->user();
               $teacher = $user->teacher;

               $teachersubjects = $teacher->subjects()->get();

        $usertype=Auth()->user()->usertype;
        return Inertia("teacher/TeacherSubject",[
          'teachersubjects' => SubjectResource::collection($teachersubjects),
          'usertype' => $usertype,
        ]);
    }

}
