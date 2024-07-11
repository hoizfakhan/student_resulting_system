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
        Schema::create('student__semesters', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('student_id')->nullable(false);
            $table->foreign('student_id')->references('id')->on('students')
                    ->noActionOnDelete()
                    ->cascadeOnUpdate();

            $table->unsignedBigInteger('semester_id')->nullable(false);
            $table->foreign('semester_id')->references('id')->on('semesters')
                    ->noActionOnDelete()
                    ->cascadeOnUpdate();

            $table->tinyInteger('status')->default(1);// 1 for current, 0 for failed, 2 for passed

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student__semesters');
    }
};
