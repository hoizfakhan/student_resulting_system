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
        Schema::create('marks', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("student_id")->nullable(false);
            $table->foreign("student_id")->references("id")->on("students")
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

            $table->unsignedBigInteger("subject_id")->nullable(false);
            $table->foreign("subject_id")->references("id")->on("subjects")
                     ->noActionOnDelete()
                     ->cascadeOnUpdate();

            $table->tinyInteger('chance')->default(1);
            $table->integer('marks_year');
            $table->integer('home_work_marks')->default(0);
            $table->integer('attendence_and_class_activity_marks')->default(0);
            $table->integer('midterm_marks')->default(0);
            $table->integer('final_marks')->default(0);

            $table->unique(['student_id','subject_id','chance'],'unique_marks');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marks');
    }
};
