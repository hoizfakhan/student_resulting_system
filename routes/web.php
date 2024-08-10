<?php

use App\Http\Controllers\AssignSubjectController;
use App\Http\Controllers\AttendenceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DepartmentSemesterController;
use App\Http\Controllers\DropStudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentAccountController;
use App\Http\Controllers\EmployeeAccountController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherAccountController;
use App\Http\Controllers\TeacherSubjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\Admin;
use App\Http\Controllers\MarksController;
use App\Models\Marks;

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
    Route::resource('assginsubject',TeacherSubjectController::class);
    Route::delete('/assignsubject/{teacher_id}/{faculty_id}/{department_id}/{semester}/{subject_id}', [TeacherSubjectController::class,'destroy']);
    Route::get('/assignsubject/{teacher_id}/{faculty_id}/{department_id}/{semester}/{subject_id}/edit', [TeacherSubjectController::class, 'edit'])
    ->name('assignsubject.edit');
    Route::put('/assignsubject/{teacher_id}/{faculty_id}/{department_id}/{semester}/{subject_id}/update', [TeacherSubjectController::class, 'update'])
     ->name('assignsubject.update');
    Route::resource('semestersubject',AssignSubjectController::class);
    Route::get('students',[MarksController::class,'ShowStudents'])->name('showstudents');
    Route::get("studentmarks/{student_id}",[MarksController::class,'ShowMarks'])->name('ShowMarks');
    Route::post('/promote-student', [MarksController::class, 'PromoteStudent'])->name("promote-student");
    Route::resource("dropstudents",DropStudentController::class);
    Route::get('/drop-form', [MarksController::class, 'promoteStudent'])->name('dropForm');
    Route::post('/submit-drop', [MarksController::class, 'submitDropForm'])->name('dropStudent.submit');


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
    Route::resource("semester",SemesterController::class);
    Route::resource("assignsemester",DepartmentSemesterController::class);
    Route::resource('subject',SubjectController::class);


   // Super Admin routes
});


Route::middleware(['auth'])->group(function(){
    Route::get("myprofile",[StudentController::class,"MyProfile"])->name("myprofile");
   // all student routes

 });

Route::middleware(['auth'])->group(function(){
    //teacher routes
    Route::resource('teacher',TeacherController::class);

    Route::get("mysubjects",[TeacherController::class,"TeacherSubjects"])->name("mysubjects");
    Route::resource("attendence",AttendenceController::class);
    Route::get("/attendence/{department_id}/{semester_id}/{subject_id}",[AttendenceController::class,"create"])->name("attendence.create");
    Route::post('attendence/{subject_id}/{semester_id}', [AttendenceController::class,"store"])->name("attendence.store1");
    Route::resource("/marks",MarksController::class);
    Route::get("/marks/{department_id}/{semester_id}/{subject_id}",[MarksController::class,"create"])->name("marks.create");

    Route::post('marks/{subject_id}', [MarksController::class, 'store'])->name('marks.store1');
    Route::post('marks/Chance1/{subject_id}/all', [MarksController::class, 'storechance1All'])->name('marks.storechance1All');
    Route::post('/marks/update/{subject_id}', [MarksController::class, 'storechance1All'])->name('marks.storechance1All');

    Route::post('marks/Chance2/{subject_id}/all', [MarksController::class, 'storechance2All'])->name('marks.storechance2All');
    Route::post('marks/Chance3/{subject_id}/all', [MarksController::class, 'storechance3All'])->name('marks.storechance3All');
    Route::post('marks/Chance4/{subject_id}/all', [MarksController::class, 'storechance4All'])->name('marks.storechance4All');
    Route::get("/failedstudentschance2/{subjectid}/{department_id}/{semester_id}/{chance}",[MarksController::class,"FailedStudentsChance2"])->name("FailedStudentChance2.marks");
    Route::get("/failedstudentschance3/{subjectid}/{department_id}/{semester_id}/{chance}",[MarksController::class,"FailedStudentsChance3"])->name("FailedStudentChance3.marks");
    Route::get("/failedstudentschance4/{subjectid}/{department_id}/{semester_id}/{chance}",[MarksController::class,"FailedStudentsChance4"])->name("FailedStudentChance4.marks");


});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
