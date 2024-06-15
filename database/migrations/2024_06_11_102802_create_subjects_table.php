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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->tinyInteger("credit");
            $table->string("subject_type");
            $table->tinyInteger("practical_credit")->nullable();
            $table->tinyInteger("therical_credit")->nullable();
            $table->unsignedBigInteger('faculty_id')->nullable();
            $table->unsignedBigInteger('department_id')->nullable();
            $table->foreign('faculty_id')->references('id')->on('faculties')
                  ->onDelete('set null')
                  ->onUpdate('cascade');
             $table->foreign('department_id')->references('id')->on('departments')
                  ->onDelete('set null')
                  ->onUpdate('cascade');
             $table->tinyInteger("semester")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
