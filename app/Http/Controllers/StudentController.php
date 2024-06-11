<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Department;
use App\Models\Student;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $user =  $request->user();
        $query =  $user->faculty->students();


        if(request('kankor_id')){
           $query->where("students.kankor_id",request("kankor_id"));

        }
        if(request('name')){
            $query->where("name","like","%".request("name")."%");
        }

        if(request('department')){
           $departmentname = $request->input('department');
           $departmentid  = Department::where('name',$departmentname)->first()->id;
           $query->whereHas('department',function($query) use ($departmentid){
                                      $query->where('id',$departmentid);

                            })->get();
        }

        $students = $query->paginate(10);
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/student/Index",[
            'usertype' => $usertype,
            'success' => session('success'),
            'error' => session('error'),
            'students' => StudentResource::collection($students),
            'queryparams' => request()->query() ?: null,

        ]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user =  $request->user();
        $departments =  $user->faculty->departments()->get();
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/student/Create",[
            'usertype' => $usertype,
            'departments' => $departments->toArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
       $data = $request->validated();

       try{


       $image = $data['image'] ?? null;

        if($image){
            $data['image_path'] = $image->store('student/'.Str::random(),'public');

        }

         Student::create($data);
         return to_route('student.index')->with('success','New Student registered successfully!');


       } catch(QueryException $e){

          Log::error($e->getMessage());
          return to_route('student.index')
                        ->with('error','An error occured while creating new student!');

       }

    }

    /**
     * Display the specified resource.
     */


    public function show(Student $student)
    {

        $usertype=Auth()->user()->usertype;
        return Inertia("admin/student/StudentDetails",[
          'student' => new StudentResource($student),
          'usertype' => $usertype,

        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student,Request $request)
    {
        $user =  $request->user();
        $departments =  $user->faculty->departments()->get();

        $usertype=Auth()->user()->usertype;
        return Inertia("admin/student/Edit",[
            'student' => new StudentResource($student),
            'departments' => $departments->toArray(),
            'usertype' => $usertype,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {

         $data = $request->validated();
         $image = $data['image'] ?? null;

         try{

         if($image){
            if($student->image_path){

                Storage::disk('public')->deleteDirectory(dirname($student->image_path));
            }

            $data['image_path'] = $image->store('student/'.Str::random(),'public');
         }

         $student->update($data);
         return to_route('student.index')
                     ->with('success',"Student \"$student->name\" was updated successfully!");

       } catch(QueryException $e){

        Log::error($e->getMessage());
          return to_route('student.index')
                        ->with('error','An error occured while Updating the student!');
      }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {

        try{
            $name=$student->name;
            $student->delete();
            if($student->image_path){
                Storage::disk('public')->deleteDirectory(dirname($student->image_path));
            }
            return to_route('student.index')->with('success',"Student \"$name\" deleted successfully!");
         }  catch(QueryException $e){
                 return to_route("student.index")
                              ->with('error','An error occured while deleteting this student!');
             }
    }
}
;
