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
            $table->id();

            $table->unsignedBigInteger("teacher_id")->nullable(false);
            $table->foreign("teacher_id")->references("id")->on("teachers")
                        ->noActionOnDelete()
                        ->cascadeOnUpdate();

            $table->unsignedBigInteger("faculty_id")->nullable();
            $table->foreign("faculty_id")->references("id")->on("faculties")
                        ->noActionOnDelete()
                        ->cascadeOnUpdate();

            $table->unsignedBigInteger("department_id")->nullable();
            $table->foreign("department_id")->references("id")->on("departments")
                         ->noActionOnDelete()
                         ->cascadeOnUpdate();

            $table->unsignedBigInteger("semester_id")->nullable();
            $table->foreign("semester_id")->references("id")->on("semesters")
                        ->noActionOnDelete()
                        ->cascadeOnUpdate();

            $table->unsignedBigInteger("subject_id")->nullable(false);
            $table->foreign("subject_id")->references("id")->on("subjects")
                         ->noActionOnDelete()
                         ->cascadeOnUpdate();

            $table->string('status');

            $table->unique(['teacher_id','faculty_id','department_id','semester_id','subject_id'],'unique_teacher_subjects');

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
