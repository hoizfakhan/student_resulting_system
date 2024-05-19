<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){


      if(Auth::check()){

        $usertype=Auth()->user()->usertype;

        if($usertype == 0){


        return Inertia('student/Dashboard',[
            'usertype' => $usertype,
        ]);
        }

        else if($usertype == 1){

            return Inertia('admin/Dashboard',[
                'usertype' => $usertype,
            ]);
        }

        else if($usertype == 2){

            return inertia('teacher/Dashboard',[
                'usertype' => $usertype,
            ]);
        }

        else if($usertype == 3){

            return inertia('SuperAdmin/Dashboard',[
                'usertype' => $usertype,
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
