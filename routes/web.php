<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ManagerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\Admin;
use Psy\CodeCleaner\ReturnTypePass;

//Route::middleware(['auth','verified'])->group(function(){
  //  Route::get('/dashboard',fn() => Inertia::render('Dashboard'))->name('dashboard');


//});

Route::redirect('/','/login');

Route::get('/dashboard',[DashboardController::class,'index'])
            ->middleware('auth','verified')->name('dashboard');

Route::get('/teacher',[DashboardController::class,'teacher'])->name('teacher');



 Route::middleware(['auth'])->group(function(){
    Route::get('/resutls',[DashboardController::class,'result']);
    // all admin routes

});

Route::middleware(['auth'])->group(function(){
    Route::resource('faculty',FacultyController::class);
    Route::resource('manager',ManagerController::class);

   // Super Admin routes
});


Route::middleware(['auth'])->group(function(){

// all student routes

 });

Route::middleware(['auth'])->group(function(){

    // all teacher routes
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
