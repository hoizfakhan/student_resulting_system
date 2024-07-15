<?php

use App\Http\Controllers\AttendenceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentAccountController;
use App\Http\Controllers\EmployeeAccountController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherAccountController;
use App\Http\Controllers\TeacherSubjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\Admin;
use App\Http\Controllers\MarksController;

//Route::middleware(['auth','verified'])->group(function(){
  //  Route::get('/dashboard',fn() => Inertia::render('Dashboard'))->name('dashboard');


//});

Route::redirect('/','/login');

Route::get('/dashboard',[DashboardController::class,'index'])
            ->middleware('auth','verified')->name('dashboard');

Route::get('/teacher',[DashboardController::class,'teacher'])->name('teacher');



 Route::middleware(['auth'])->group(function(){
    Route::resource('student',StudentController::class);
    Route::resource('studentaccount', StudentAccountController::class);
    Route::get('blockstudentaccount/{studentaccountid}',[StudentAccountController::class,'BlockStudentAccount'])->name("blockstudentaccount");
    Route::resource('employeeaccount', EmployeeAccountController::class);
    Route::resource('subject',SubjectController::class);
    Route::resource('assginsubject',TeacherSubjectController::class);
    Route::delete('/assignsubject/{teacher_id}/{faculty_id}/{department_id}/{semester}/{subject_id}', [TeacherSubjectController::class,'destroy']);
    Route::get('/assignsubject/{teacher_id}/{faculty_id}/{department_id}/{semester}/{subject_id}/edit', [TeacherSubjectController::class, 'edit'])
    ->name('assignsubject.edit');
    Route::resource( 'showresult', MarksController::class);
    Route::put('/assignsubject/{teacher_id}/{faculty_id}/{department_id}/{semester}/{subject_id}/update', [TeacherSubjectController::class, 'update'])
     ->name('assignsubject.update');
    // all admin routes

});

Route::middleware(['auth'])->group(function(){
    Route::resource('faculty',FacultyController::class);
    Route::resource('manager',ManagerController::class);
    Route::resource('department',DepartmentController::class);
    Route::get("/alldepartments",[DepartmentController::class,"getDepartments"])->name("alldepartments");
    Route::get('/department-selector/{facultyid}',[DepartmentController::class,'getDepartments'])->name('department-selector');
    Route::resource("teacheraccount",TeacherAccountController::class);
    Route::get("blockteacheraccount/{teacheraccountid}",[TeacherAccountController::class,"BlockTeacherAccount"])->name("blockteacheraccount");
   // Super Admin routes
});


Route::middleware(['auth'])->group(function(){
    Route::get("myprofile",[StudentController::class,"MyProfile"])->name("myprofile");
   // all student routes

 });

Route::middleware(['auth'])->group(function(){
    Route::resource('teacher',TeacherController::class);

    Route::get("mysubjects",[TeacherController::class,"TeacherSubjects"])->name("mysubjects");
    Route::resource("attendence",AttendenceController::class);
    Route::post('attendence/{subjectid}/{semester}', [AttendenceController::class,"store"])->name("attendence.store1");
    Route::get("/attendence/{department_id}/{semester}/{subjectid}",[AttendenceController::class,"create"])->name("attendence.create");

    // all teacher routes

});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
