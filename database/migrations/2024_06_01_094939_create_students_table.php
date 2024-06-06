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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('last_name');
            $table->string('father_name');
            $table->string('grandfather_name')->nullable();
            $table->string('original_province');
            $table->string('original_district');
            $table->string('original_village');
            $table->string('current_province');
            $table->string('current_district');
            $table->string('current_village');
            $table->string('phone_number')->unique();
            $table->string('nic_number')->unique();
            $table->date('birth_date')->nullable();
            $table->string('school_name')->nullable();
            $table->string('school_graduation_year')->nullable();
            $table->Integer('kankor_id')->unique();
            $table->integer('kankor_marks');
            $table->date('admission_date');
            $table->unsignedBigInteger('department_id')->nullable(false);
            $table->foreign('department_id')->references('id')->on('departments')
                  ->noActionOnDelete()
                  ->cascadeOnUpdate();

            $table->tinyInteger('current_semester');
            $table->string('identity_cart_number')->nullable();
            $table->integer('number_maktob_sent_exam_commettee')->nullable();
            $table->integer('number_maktob_tajeel')->nullable();
            $table->integer('number_maktob_monfak')->nullable();
            $table->integer('number_maktob_lailia')->nullable();
            $table->string('image_path')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
