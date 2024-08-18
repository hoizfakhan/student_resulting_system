<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentResource;
use App\Http\Resources\GraduatedStudentsResource;
use App\Models\Graduated_Student;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GraduatedStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Graduated_Student::with('student.department');


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





        $graduatedStudents = $query->get();



        $departments   =   $request->user()->faculty->departments()->get();
        $graduatedStudents = GraduatedStudentsResource::collection($graduatedStudents);

        $usertype = $user->usertype;
        return Inertia::render("admin/Result/graduated_student/Index", [
            'success' => session('success'),
            'error' => session('error'),
            'graduatedStudents' => $graduatedStudents,
            'departments' => DepartmentResource::collection($departments),
            'queryparams' => request()->query() ?: null,
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
