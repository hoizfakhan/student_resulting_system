<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\FacultyResource;
use App\Models\Faculty;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $facultys =  Faculty::query()->orderBy('faculty_name','asc')->get();
        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/teacher/Index",[
            'usertype' => $usertype,
            'facultys' => FacultyResource::collection($facultys),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $facultys =  Faculty::query()->orderBy('faculty_name','asc')->get();
        $usertype=Auth()->user()->usertype;
        return Inertia("SuperAdmin/teacher/Create",[
            'usertype' => $usertype,
            'facultys' => FacultyResource::collection($facultys),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        //
    }
}
