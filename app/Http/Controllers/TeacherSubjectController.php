<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\SubjectResource;
use App\Http\Resources\TeacherResource;
use App\Http\Resources\TeacherSubjectResource;
use App\Models\Department;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TeacherSubject;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TeacherSubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       $user = $request->user();
       $facultyid = $user->faculty->id;

       $teachers = $user->faculty->teachers()->get();

        $query = TeacherSubject ::where('faculty_id',$facultyid);

         if(request("subject")){
            $subjectname = $request->input('subject');
            $subjectid  = Subject::where('name',$subjectname)->first()->id;
            $query->whereHas('subject',function($query) use ($subjectid){
                                       $query->where('id',$subjectid);

           })->get();
         }


         if(request("department")){
            $departmentname = $request->input('department');
            $departmentid  = Department::where('name',$departmentname)->first()->id;
            $query->whereHas('Department',function($query) use ($departmentid){
                                       $query->where('id',$departmentid);

           })->get();
         }

         if(request("semester")){
           $query->where("teacher_subjects.semester",request("semester"));
         }

         if(request("teacher")){
            $teachername = $request->input('teacher');
            $teacherid  = Teacher::where('name',$teachername)->first()->id;
            $query->whereHas('teacher',function($query) use ($teacherid){
                                       $query->where('id',$teacherid);

           })->get();
         }

        $teacherSubjects  =   $query->paginate(10);

        $usertype=Auth()->user()->usertype;
        return Inertia("admin/assgin-subject/Index",[
            'teacherSubjects' => TeacherSubjectResource::collection($teacherSubjects),
            'teachers' => $teachers->toArray(),
            'queryparams' => request()->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
            'usertype' => $usertype,


        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $user =  $request->user();
        $teachers =  $user->faculty->teachers()->get();
        $departments =  $user->faculty->departments()->get();
        $subjects   =   $user->faculty->subjects()->get();


        $usertype=Auth()->user()->usertype;
        return Inertia("admin/assgin-subject/Create",[
            'teachers' => TeacherResource::collection($teachers),
            'departments' => DepartmentResource::collection($departments),
            'subjects' => SubjectResource::collection($subjects),
            'error' =>session('error'),
            'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([

            'teacher_id' => 'required|string',
            'department_id' => 'required|integer',
            'semester' => 'required|integer',
            'subject_id' => 'array',
            'subject_id.*' => 'integer',
            'status' => 'required|string',
        ]);

        try{

        $subject_id = $request->subject_id;
        if(count($subject_id)>0){
           for($i=0; $i<count($subject_id); $i++){

            $user = $request->user();
            $userfacultyid =  $user->faculty_id;

              $data = new TeacherSubject;
              $data->teacher_id = $request->teacher_id;
              $data->faculty_id = $userfacultyid;
              $data->department_id = $request->department_id;
              $data->semester = $request->semester;
              $data->subject_id = $subject_id[$i];
              $data->status = $request->status;


             $data->save();

           }

           return to_route("assginsubject.index")->with("success","New Subject has been assgined  successfully!");
        }

      } catch(QueryException $e){

            $errorCode = $e->errorInfo[1];
             if($errorCode == 1062){

                return redirect()->route('assginsubject.create')
                                  ->withInput()
                                  ->with('error','Duplicate Entry, subject did not asssgined!');
             }

             else{

                return redirect()->route('assginsubject.create')
                                 ->withInput()
                                 ->with('error','An error occured while assgining subjects!');
             }


      }
    }

    /**
     * Display the specified resource.
     */
    public function show(TeacherSubject $teacherSubject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request,$teacher_id,$faculty_id,$department_id,$semester,$subject_id)
    {
        $user =  $request->user();
        $departments = $user->faculty->departments()->get();
        $teachers =  $user->faculty->teachers()->get();
        $subjects = $user->faculty->subjects()->get();

        $teacherSubject = TeacherSubject::where('teacher_id', $teacher_id)
        ->where('faculty_id', $faculty_id)
        ->where('department_id', $department_id)
        ->where('semester', $semester)
        ->where('subject_id', $subject_id)
        ->first();


        //dd($teacher_id,$faculty_id,$department_id,$semester,$subject_id);
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/assgin-subject/Edit",[
           'teacherSubject' => new TeacherSubjectResource($teacherSubject),
           'teachers' => $teachers->toArray(),
           'departments' => $departments->toArray(),
           'subjects' => $subjects->toArray(),
           'usertype' => $usertype,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(array $attributes)
    {


      $record = DB::table('teacher_subjects')
                 ->where('teacher_id',$attributes['teacher_id'])
                 ->where('department_id',$attributes['department_id'])
                 ->where('semester',$attributes['semester'])
                 ->where('subject_id',$attributes['subject_id'])
                 ->fist();

            $record->update([
                'teacher_id' => $attributes['teacher_id'],
                'department_id' => $attributes['department_id'],
                'semesster' => $attributes['semester'],
                'subject_id' => $attributes['subject_id'],
            ]);


             return to_route("assginsubject.index")->with("success","Assgined Subject has been updated  successfully!");
    {/*
      $data =  $request->validated();
      $user = $request->user();
      $userfacultyid =  $user->faculty_id;
      $data['faculty_id'] = $userfacultyid;

      try{
       $teacherSubject->update($data);
       return to_route("assginsubject.index")->with("success","Assgined Subject has been updated  successfully!");
      }   catch(QueryException $e){

        Log::error($e->getMessage());
        return redirect()->route('assginsubject.index')
                                 ->with('error','An error occured while updating Assigned subject!');
      }
    */}


     {/* $request->validate([

            'teacher_id' => 'required|integer',
            'department_id' => 'required|integer',
            'semester' => 'required|integer',
            'subject_id' => 'integer',
            'status' => 'required|string',
        ]);


        try{


                $data = TeacherSubject::where([
                  'teacher_id' => $request->teacher_id,
                  'faculty_id' => $userfacultyid,
                  'department_id' => $request->department_id,
                  'semester' => $request->semester,
                  'subject_id' => $request->subject_id,
              ])->first();

              if (!$data) {
                  $data = new TeacherSubject();

                  $data->teacher_id = $request->teacher_id;
                  $data->faculty_id = $userfacultyid;
                  $data->department_id = $request->department_id;
                  $data->semester = $request->semester;
                  $data->subject_id = $request->subject_id;
              }
                  $data->status = $request->status;
                  $data->save();

                  return to_route("assginsubject.index")->with("success","Assgined Subject has been updated  successfully!");

            }
            catch(QueryException $e){

            Log::error($e->getMessage());
            return redirect()->route('assginsubject.index')
                                     ->with('error','An error occured while updating Assigned subject!');


          }

        */}

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($teacher_id, $faculty_id, $department_id, $semester ,$subject_id)
    {
     // dd($teacher_id,$faculty_id,$department_id,$semester,$subject_id);
       try{
        $deleted = DB::table('teacher_subjects')
              ->where('teacher_id',$teacher_id)
              ->where('faculty_id',$faculty_id)
              ->where('department_id',$department_id)
              ->where('semester',$semester)
              ->where('subject_id',$subject_id)
              ->delete();

            return to_route("assginsubject.index")->with("success","Assgind Subject has been deleted successfully!");

    } catch(QueryException $e){

        $errorMessage = $e->getMessage();
        Log::error($errorMessage);

        return to_route("assginsubject.index")
                        ->with("error","An error acoored while deleting this assgindedsubject!");

    }

    }

}
