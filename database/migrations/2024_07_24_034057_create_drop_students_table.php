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
        Schema::create('drop_students', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("student_id")->nullable(false);
            $table->foreign("student_id")->references("id")->on("students")
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

            $table->unsignedBigInteger('semester_id')->nullable(false);
            $table->foreign('semester_id')->references('id')->on('semesters')
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

            $table->integer('droped_year')->nullable(false);
            $table->longText('drop_reason')->nullable();
            $table->integer('maktob_number')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drop_students');
    }
};
