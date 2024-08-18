<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreManagerRequest;
use App\Http\Requests\UpdateManagerRequest;
use App\Http\Resources\FacultyResource;
use App\Http\Resources\ManagerResource;
use App\Models\Faculty;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       try {
        $managers = User::where('usertype','=',1)->paginate(4);
        $user =  $request->user();
        $usertype=$user->usertype;
        return Inertia("SuperAdmin/user/Index",[
            'usertype' => $usertype,
            'managers' => ManagerResource::collection($managers),
            'success' => session('success'),
            'error' => session('error'),
        ]);

    } catch(QueryException $e){
        Log::error($e->getMessage());

        return Inertia("SuperAdmin/user/Index")
                        ->with('error','An error occured while fetching the managers data!');
    }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
          $user =  $request->user();
          $usertype=$user->usertype;
          $facultys =  Faculty::query()->orderBy('faculty_name','asc')->get();
           return Inertia("SuperAdmin/user/Create",[
            'usertype' => $usertype,
            'facultys' => FacultyResource::collection($facultys),
            'error' => session('error'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreManagerRequest $request)
    {

         try {

           $data = $request->validated();
           $data['password'] = bcrypt($data['password']);
           $data['usertype'] = User::ADMIN;
           $data['email_verified_at'] = time();
           User::create($data);
          return to_route("manager.index")->with('success','Faculty Manager successfully registered!');
         } catch(QueryException $e){
             $errorCode = $e->errorInfo[1];
             if($errorCode == 1062){

                return redirect()->route('manager.create')
                                  ->withInput()
                               ->with('error','A Manager already exists for the selected facutly!');
             }
             else{

                return redirect()->route('manager.create')
                                 ->withInput()
                                 ->with('error','An error occured while creating the manager!');
             }
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
    public function edit(User $manager,Request $request)
    {

        $user =  $request->user();
         $facultys= Faculty::paginate(4);
          $usertype=$user->usertype;
          return Inertia("SuperAdmin/user/Edit",[
            'manager' => new ManagerResource($manager),
            'usertype' => $usertype,
            'facultys' => FacultyResource::collection($facultys),


        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManagerRequest $request, User $manager)
    {


         $data = $request->validated();
         $password = $data['password'] ?? null;

         try{
         if($password){
            $data['password'] = bcrypt($password);
         } else{
            unset($data['password']);
         }

         $manager->update($data);
         return to_route("manager.index")
                    ->with('success',"manager \"$manager->name\" acount was updated successfully!");
         }catch(QueryException $e){
                Log::error($e->getMessage());
                return to_route('manager.index')
                                ->with('error','An error occured while updateing this manager!');

         }

    }

    /**
     * Remove the specified resource from storage. */
    public function destroy(User $manager)
    {
       try{
        $manager->delete();
        return to_route('manager.index')->with('success',"Manager deleted successfully!");

       } catch(QueryException $e){
           Log::error($e->getMessage());

           return to_route('manager.index')->with('error',"Manager did not delete unfortunately!");

       }
    }


}
