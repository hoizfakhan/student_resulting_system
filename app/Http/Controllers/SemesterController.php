<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSemesterRequest;
use App\Http\Requests\UpdateSemesterRequest;
use App\Models\Semester;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

      $semesters =  Semester::all();
      $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia("SuperAdmin/semester/Index",[
            'semesters' => $semesters,
            'success'=>session('success'),
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
        $usertype=$user->usertype;
        return Inertia('SuperAdmin/semester/Create',[
         'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSemesterRequest $request)
    {

       $data =  $request->validated();

       try{

         Semester::create($data);

        return to_route("semester.index")
                     ->with('success','New Semester has been created successfully!');
       }
        catch(QueryException $e){
        Log::error($e->getMessage());

       return redirect()->back()
                       ->with('error','An error occured while creating new Semester!');

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
    public function edit(Semester $semester,Request $request)
    {
        $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia("SuperAdmin/semester/Edit",[
            'semester' => $semester,
            'usertype' => $usertype,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSemesterRequest $request, Semester $semester)
    {
        $data = $request->validated();

        try{

        $semester->update($data);
        return to_route("semester.index")
        ->with('success',"Semester\" $semester->name \" was updated successfully!");

        } catch(QueryException $e){

            Log::error($e->getMessage());

            return to_route("semester.index")
                            ->with('error','An error occured while updating this semester!');
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Semester $semester)
    {


        try{
            $name=$semester->name;
            $semester->delete();
            return to_route('semester.index')->with('success',"Semester \"$name\" deleted successfully!");
         }  catch(QueryException $e){

             $errorCode = $e->errorInfo[1];
             if($errorCode == 1451){ // this code is used when a column has child rows

                 return to_route("semester.index")
                              ->with('error','Cannot delete this semester, it has associated records!');
             }

             else{
                return to_route("semester.index")->with('error','An error occured while deleteting semester');
             }

         }

    }
}
