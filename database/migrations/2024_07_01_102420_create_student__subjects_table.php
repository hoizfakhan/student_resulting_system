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
        Schema::create('student__subjects', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("student_id")->nullable();
            $table->foreign("student_id")->references("id")->on("students")
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

            $table->unsignedBigInteger("subject_id")->nullable();
            $table->foreign("subject_id")->references("id")->on("subjects")
                        ->noActionOnDelete()
                        ->cascadeOnUpdate();
                        
             $table->integer('semester');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student__subjects');
    }
};
