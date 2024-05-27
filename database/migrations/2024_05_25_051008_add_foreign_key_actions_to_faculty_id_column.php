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
        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign(['faculty_id']);
            $table->foreign('faculty_id')
                   ->references('id')
                   ->on('faculties')
                   ->noActionOnDelete()
                   ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('departments', function (Blueprint $table) {

           $table->dropForeign(['faculty_id']);

        });
    }
};
