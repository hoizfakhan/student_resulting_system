<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentAccountRequest;
use App\Http\Requests\UpdateStudentAccountRequest;
use App\Http\Resources\StudentAccountResource;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StudentAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::where('usertype',0)
                           ->orderBy('id');


          if(request("name")){
            $query->where('users.name',"like","%".request("name")."%");
          }

          if(request("email")){
            $query->where('users.email',request("email"));
          }

          if(request("status")){
            $query->where('users.status',request("status"));
          }

       $studentaccounts =  $query->paginate(10);
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/accounts/student/Index",[
            'success' => session('success'),
            'error' => session('error'),
            'studentaccounts' => StudentAccountResource::collection($studentaccounts),
            'queryparams' => request()->query() ?: null,
            'usertype' => $usertype,
        ]);
    }


  public function BlockStudentAccount($studentaccountid){

       $studentaccount =  User::findOrFail($studentaccountid);
       $studentaccount['status'] = 'inactive';
       $studentaccount->save();

    return to_route("studentaccount.index")->with("success","Student Account has been blocked successfully!");

  }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/accounts/student/Create",[
            'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentAccountRequest $request)
    {

        try{

        $data = $request->validated();

        $data['password'] = bcrypt($data['password']);
        $data['usertype'] = User::STUDENT;
        $data['email_verified_at'] = time();
      

       User::create($data);
      return to_route("studentaccount.index")->with('success','Student account created successfully!');
      } catch(QueryException $e){
        $errorMessage = $e->getMessage();

        Log::error($errorMessage);
        return to_route("studentaccount.index")->with('error','Student account did not create successfully!');
      }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $studentaccount)
    {

        $usertype=Auth()->user()->usertype;
        return Inertia("admin/accounts/student/Edit",[
            'studentaccount' => new StudentAccountResource($studentaccount),
            'usertype' => $usertype,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentAccountRequest $request, User $studentaccount)
    {

        $data = $request->validated();
        $password = $data['password'] ?? null;

        try{

        if($password){
           $data['password'] = bcrypt($password);
        } else{
           unset($data['password']);
        }

        $studentaccount->update($data);
        return to_route("studentaccount.index")
                     ->with('success',"account \"$studentaccount->name\"  was updated successfully!");

    } catch(QueryException $e){
            $errorMessage = $e->getMessage();
            Log::error($errorMessage);
        return to_route('studentaccount.index')
                        ->with('error','An error occured while updateing this account!');

      }

}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $studentaccount)
    {

        try{
        $name=$studentaccount->name;
        $studentaccount->delete();

        return to_route("studentaccount.index")->with('success',"account of \"$name\" successfully deleted!");
        } catch(QueryException $e){

            $errorMessage = $e->getMessage();
            Log::error($errorMessage);
            return to_route("studentaccount.index")->with('error','an error accured while deleting this account!');
        }
    }
}
