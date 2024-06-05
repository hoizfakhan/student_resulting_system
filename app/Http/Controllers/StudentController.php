<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/student/Index",[
            'usertype' => $usertype,
        ]);

         // Fetch all students with only the first 7 columns
         $students = Student::select('id', 'column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7')->get();
         return Inertia::render('Students/Index', ['students' => $students]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/student/Create",[
            'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)    // <-----this is Imran, I think we don't need string here
    {
        
        // Fetch student with all 27 columns
        $student = Student::find($id);
        return Inertia::render('Students/Show', ['student' => $student]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
