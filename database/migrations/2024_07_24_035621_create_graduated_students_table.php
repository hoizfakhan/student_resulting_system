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
        Schema::create('graduated_students', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("student_id")->nullable(false);
            $table->foreign("student_id")->references("id")->on("students")
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

            $table->date('graduated_date')->nullable(false);
            $table->string('education_degree')->nullable();
            $table->string('monograph_title')->nullable(false);
            $table->date('monograph_defence_date')->nullable(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('graduated_students');
    }
};
