<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAssignSubjectRequest;
use App\Http\Resources\AssignSubjectResource;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\DepartmentSemesterResource;
use App\Http\Resources\SubjectResource;
use App\Http\Resources\TeacherResource;
use App\Http\Resources\TeacherSubjectResource;
use App\Models\Assign_Subject;
use App\Models\Department;
use App\Models\Department_Semester;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TeacherSubject;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
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

        $query = TeacherSubject::where('faculty_id',$facultyid);



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
        return Inertia("admin/assign-subject-teacher/Index",[
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
        $subjects = $user->faculty->subjects()->get();
        $semesters = Department_Semester::all();
        $subjects = Assign_Subject::all();

        $usertype=Auth()->user()->usertype;
        return Inertia("admin/assign-subject-teacher/Create",[
            'teachers' => TeacherResource::collection($teachers),
            'departments' => DepartmentResource::collection($departments),
            'subjects' => SubjectResource::collection($subjects),
            'semesters' => DepartmentSemesterResource::collection($semesters),
            'subjects' => AssignSubjectResource::collection($subjects),
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

            'teacher_id' => 'required|integer',
            'department_id' => 'required|integer',
            'semester_id' => 'required|integer',
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
              $data->semester_id = $request->semester_id;
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
    public function edit(Request $request,$id, $department_id, $semester_id)
    {

        $user =  $request->user();
        $departments = $user->faculty->departments()->get();
        $teachers =  $user->faculty->teachers()->get();
        $subjects = Assign_Subject::where('department_id',$department_id)->where('semester_id',$semester_id)->get();
        $semesters = Department_Semester::all();
        $teacherSubject = TeacherSubject::find($id);


        $usertype=Auth()->user()->usertype;
        return Inertia("admin/assign-subject-teacher/Edit",[
           'teacherSubject' => new TeacherSubjectResource($teacherSubject),
           'teachers' => $teachers->toArray(),
           'departments' => $departments->toArray(),
           'semesters' => DepartmentSemesterResource::collection($semesters),
           'subjects' => AssignSubjectResource::collection($subjects),
           'usertype' => $usertype,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignSubjectRequest $request,string $id)
    {
        try{
         $data =  $request->validated();
         $subject =  TeacherSubject::find($id);

         $subject->update($data);

          return to_route('assginsubject.index')->with('success','Assgined Subject has been updated successfully!');

        }catch(QueryException $e){

            Log::error($e->getMessage());
            return to_route('assignsubject.index')
                      ->with('error','An error occured while Updating this assigend subject!');

       }


        }

    public function destroy(string $id)
    {

        try{
            $subject = TeacherSubject::find($id);

            $subject->delete();
            return to_route('assginsubject.index')->with('success',"Subject has been deleted successfully!");
         }  catch(QueryException $e){

             $errorCode = $e->errorInfo[1];
             if($errorCode == 1451){ // this code is used when a column has child rows

                 return to_route("assginsubject.index")
                              ->with('error','Cannot delete this subject, it has associated records!');
             }

             else{
                return to_route("assginsubject.index")->with('error','An error occured while deleteting subject');
             }

         }

    }

}
