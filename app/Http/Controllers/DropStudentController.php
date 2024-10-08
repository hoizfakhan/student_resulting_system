<?php

namespace App\Http\Controllers;

use App\Http\Resources\DropStudentResource;
use App\Models\Drop_Student;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DropStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user =  $request->user();

        $query = Drop_Student::with('student.department');

        if ($request->has('name') && $request->input('name') !== '') {
            $studentName = $request->input('name');

            // Find students by name or father_name
            $students = Student::where('name', 'like', '%' . $studentName . '%')
                               ->orWhere('father_name', 'like', '%' . $studentName . '%')
                               ->pluck('id');

            // Filter graduated students based on the found student IDs
            if ($students->isNotEmpty()) {
                $query->whereIn('student_id', $students);
            }
        }


        $dropStudents = $query->get();




      $dropStudents = DropStudentResource::collection($dropStudents);
        $usertype = $user->usertype;
        return Inertia::render("admin/Result/drop_student/Index", [
            'success' => session('success'),
            'error' => session('error'),
            'dropStudents' => $dropStudents,
            'usertype' => $usertype,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(string $id)
    {
        //
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
