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
        Schema::create('attendences', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger("student_id")->nullable(false);
            $table->foreign("student_id")->references("id")->on("students")
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

            $table->unsignedBigInteger("subject_id")->nullable(false);
            $table->foreign("subject_id")->references("id")->on("subjects")
                        ->noActionOnDelete()
                        ->cascadeOnUpdate();

            $table->unsignedBigInteger('semester_id')->nullable();
            $table->foreign('semester_id')->references('id')->on('semesters')
                         ->noActionOnDelete()
                         ->cascadeOnUpdate();

             $table->integer('attendence_year');
             $table->tinyInteger('total_hours')->nullable(false);
             $table->tinyInteger('absent_hours')->nullable(false)->default(0);

             $table->unique(['student_id','subject_id','semester_id','attendence_year'],'unique_attendence');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendences');
    }
};
