<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;

use function Laravel\Prompts\select;

class DashboardController extends Controller
{
    public function index(Request $request){


      if(Auth::check()){

        $usertype=Auth()->user()->usertype;

        if($usertype == 0){


        return Inertia('student/Dashboard',[
            'usertype' => $usertype,

        ]);
        }

        else if($usertype == 1){

            $user =  $request->user();
            $departments =  $user->faculty->departments()->get();

            return Inertia('admin/Dashboard',[
                'usertype' => $usertype,
                'departments' => $departments->toArray(),
            ]);
        }

        else if($usertype == 2){

            return inertia('teacher/Dashboard',[
                'usertype' => $usertype,
            ]);
        }

        else if($usertype == 3){

              $totalfacultymanager = User::getTotalUser(1);
              $totalfaculty = Faculty::gettotalfaculty();
              $totaldepartment = Department::gettotaldepartment();


               return inertia('SuperAdmin/Dashboard',[
                'usertype' => $usertype,
                'totalfacultymanager' => $totalfacultymanager,
                'totalfaculty' => $totalfaculty,
                'totaldepartment' => $totaldepartment,
            ]);
        }
      }

      else{

        abort(401);
      }


    }

    public function result(){
        $usertype=Auth()->user()->usertype;
        return Inertia('Dashboard',[
            'usertype' => $usertype,
        ]);
    }

    public function teacher(){

        $usertype=Auth()->user()->usertype;

        return Inertia('teacher/teacher',[
            'usertype' => $usertype,

        ]);
    }


}
