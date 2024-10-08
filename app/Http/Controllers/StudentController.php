<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Department;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $query = $user->faculty->students()->with(['semesters' => function ($query){
             $query->wherePivot('status',1);
        }]);

        $departments = $user->faculty->departments()->get();
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request('kankor_id')){
           $query->where("students.kankor_id",request("kankor_id"));

        }
        if(request('name')){
            $query->where("students.name","like","%".request("name")."%");
        }

        if(request('department')){
           $departmentname = $request->input('department');
           $departmentid  = Department::where('name',$departmentname)->first()->id;
           $query->whereHas('department',function($query) use ($departmentid){
                                      $query->where('id',$departmentid);

                })->get();
            // $query->where("students.current_semester",1);
        }

        if(request('semester')){
            $query->where('students.current_semester',request("semester"));
          }


        $students = $query->orderBy($sortField,$sortDirection)->paginate(10);
        $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia("admin/student/Index",[
            'usertype' => $usertype,
            'success' => session('success'),
            'error' => session('error'),
            'students' => StudentResource::collection($students),
            'departments' => $departments->toArray(),
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
        $usertype=$user->usertype;
        $studentusers = User::where("usertype",0)->get();

        return Inertia("admin/student/Create",[
            'usertype' => $usertype,
            'studentusers'=> $studentusers->toArray(),
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

       $student =  Student::create($data);
       $firstSemester = Semester::first();

       try{


        if($firstSemester){

           Log::info('Attaching semester ID: ' .$firstSemester->id.'to student ID' .$student->id);
           $student->semesters()->attach($firstSemester->id, ['status' => 1]);
        }

      } catch(QueryException $e){

         Log::error('Error attaching semester:'.$e->getMessage());
         return to_route('student.index')->with('error','failed to assign semester to student!');
      }

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


    public function show(Student $student,Request $request)
    {

      $student->load(['semesters' => function ($query){
          $query->wherePivot('status',1);
      }]);
      $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia("admin/student/StudentDetails",props: [
          'student' => new StudentResource(resource: $student),
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
        $studentusers = User::where("usertype",0)->get();
        $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia("admin/student/Edit",[
            'student' => new StudentResource($student),
            'departments' => $departments->toArray(),
            'studentusers'=> $studentusers->toArray(),
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


    //student side

    public function MyProfile(Request $request){

        $user =  $request->user();
        $student = $user->student;

        $user = Auth::user();
        $usertype=$user->usertype;
        return Inertia("student/Information",[
         'student' => new StudentResource($student),
         'usertype' => $usertype,

        ]);
    }
}

