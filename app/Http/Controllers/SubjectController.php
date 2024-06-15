<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Department;
use App\Models\Subject;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

         $user =  $request->user();
         $query =  $user->faculty->subjects();

        $departments =  $user->faculty->departments()->get();

        if(request('name')){
          $query->where('subjects.name',"like","%".request("name")."%");

        }

        if(request('semester')){

            $query->where('subjects.semester',request("semester"));
        }

        if(request('department')){
            $departmentname = $request->input('department');
            $departmentid  = Department::where('name',$departmentname)->first()->id;
            $query->whereHas('department',function($query) use ($departmentid){
                                       $query->where('id',$departmentid);

           })->get();

        }




        $subjects  =  $query->paginate(10);
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/subject/Newindex",[
           'success' => session('success'),
           'error' => session('error'),
           'subjects' => SubjectResource::collection($subjects),
           'queryparams' => request()->query() ?: null,
           'departments' => $departments->toArray(),
           'usertype' => $usertype,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user =  $request->user();
        $departments = $user->faculty->departments()->get();

        $usertype=Auth()->user()->usertype;
        return Inertia("admin/subject/Newcreate",[
            'departments' => $departments->toArray(),
            'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubjectRequest $request)
    {
         $data =  $request->validated();

        $user = $request->user();
        $userfacultyid =  $user->faculty_id;
        $data['faculty_id'] = $userfacultyid;

        Subject::create($data);

        return to_route("subject.index")->with("success","New Subject registered successfully!");
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
    public function edit(Subject  $subject,Request $request)
    {
        $user =  $request->user();
        $departments =  $user->faculty->departments()->get();
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/subject/Edit",[
            'subject' => new SubjectResource($subject),
            'departments' => $departments->toArray(),
            'usertype' => $usertype,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
         $data = $request->validated();
          $name = $subject->name;

         try{

           $subject->update($data);
           return to_route("subject.index")
                     ->with("success","Subject \"$name\" has been updated succcessfully!");
         } catch(QueryException $e){

            Log::error($e->getMessage());
            return to_route('subject.index')
                          ->with('error','An error occured while Updating the subject!');

         }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
       try{
         $name =  $subject->name;
         $subject->delete();

        return to_route('subject.index')->with('success',"subject \"$name\" has been deleted successfully!");

       }  catch(QueryException $e){

          $errorMessage = $e->getMessage();
          Log::error($errorMessage);

          return to_route("subject.index")
                   ->with('error',"An error occured while deleting this subject!");

       }
    }
}
