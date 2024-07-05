<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teacher_subjects', function (Blueprint $table) {
            
            $table->unsignedBigInteger('teacher_id')->nullable(false);
            $table->foreign('teacher_id')->references('id')->on('teachers')
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

           $table->unsignedBigInteger('faculty_id')->nullable(false);
           $table->foreign('faculty_id')->references('id')->on('faculties')
                        ->noActionOnDelete()
                        ->cascadeOnUpdate();

           $table->unsignedBigInteger('department_id')->nullable(false);
           $table->foreign('department_id')->references('id')->on('departments')
                         ->noActionOnDelete()
                         ->cascadeOnUpdate();
            $table->integer('semester');

            $table->unsignedBigInteger('subject_id')->nullable(false);
            $table->foreign('subject_id')->references('id')->on('subjects')
                          ->cascadeOnDelete()
                          ->cascadeOnUpdate();
            $table->string('status');

            $table->primary(['teacher_id','faculty_id','department_id','semester','subject_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_subjects');
    }
};
