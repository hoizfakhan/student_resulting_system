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
        Schema::create('department_semesters', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('semester_id')->nullable(false);
            $table->foreign('semester_id')->references('id')->on('semesters')
                    ->noActionOnDelete()
                    ->cascadeOnUpdate();
            $table->unsignedBigInteger('department_id')->nullable(false);
            $table->foreign('department_id')->references('id')->on('departments')
                    ->noActionOnDelete()
                    ->cascadeOnUpdate();

            $table->unique(['semester_id','department_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('department_semesters');
    }
};
