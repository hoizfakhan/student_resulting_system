<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherAccountRequest;
use App\Http\Requests\UpdateTeacherAccountRequest;
use App\Http\Resources\TeacherAccountResource;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TeacherAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $query=  User::where('usertype',2)->orderBy('id');

       if(request("name")){
        $query->where('users.name',"like","%".request("name")."%");
      }

      if(request("email")){
        $query->where('users.email',request("email"));
      }

      if(request("status")){
        $query->where('users.status',request("status"));
      }



    $teacheraccounts = $query->paginate(10);
     $usertype=Auth()->user()->usertype;
     return Inertia("SuperAdmin/teacheraccount/Index",[
     'teacheraccounts' => TeacherAccountResource::collection($teacheraccounts),
     'queryparams' => request()->query() ?: null,
     'usertype' => $usertype,
     'success' => session('success'),
     'error' => session('error'),
     ]);

    }

    public function BlockTeacherAccount($teacheraccountid){

        $teacheraccount =  User::findOrFail($teacheraccountid);
        $teacheraccount['status'] = 'inactive';
        $teacheraccount->save();

     return to_route("teacheraccount.index")->with("success","Teacher Account has been blocked successfully!");

   }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/teacheraccount/Create",[
        'usertype' => $usertype,
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherAccountRequest $request)
    {
       $data = $request->validated();

       try {

        $data['password'] = bcrypt($data['password']);
        $data['usertype'] = User::TEACHER;
        $data['email_verified_at'] = time();

          User::create($data);

         return to_route("teacheraccount.index")
                        ->with("success","Teacher Account has been created successfully!");
       }  catch(QueryException $e){

        Log::error($e->getMessage());
        return to_route('teacheraccount.index')
                      ->with('error','An error occured while creating  teacher account!');

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
    public function edit(User $teacheraccount)
    {

        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/teacheraccount/Edit",[
         'teacheraccount' => new TeacherAccountResource($teacheraccount),
         'usertype' => $usertype,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherAccountRequest $request, User $teacheraccount)
    {
       $data = $request->validated();
       $password = $data['password'] ?? null;

       try{

       if($password){
          $data['password'] = bcrypt($password);
       } else{
          unset($data['password']);
       }

       $teacheraccount->update($data);
       return to_route("teacheraccount.index")
                    ->with('success',"account \"$teacheraccount->name\"  was updated successfully!");

   } catch(QueryException $e){
           $errorMessage = $e->getMessage();
           Log::error($errorMessage);
       return to_route('teacheraccount.index')
                       ->with('error','An error occured while updateing this account!');

     }



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $teacheraccount)
    {
        try{
            $name=$teacheraccount->name;
            $teacheraccount->delete();

            return to_route("teacheraccount.index")->with('success',"account of \"$name\" successfully deleted!");
            } catch(QueryException $e){

                $errorMessage = $e->getMessage();
                Log::error($errorMessage);
                return to_route("teacheraccount.index")->with('error','an error accured while deleting this account!');
            }

    }
}
