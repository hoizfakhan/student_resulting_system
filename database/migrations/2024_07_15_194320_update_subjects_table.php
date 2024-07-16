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
        Schema::table('subjects', function (Blueprint $table) {

            $table->id();
            $table->string("name");
            $table->tinyInteger("credit");
            $table->string("subject_type");
            $table->tinyInteger("practical_credit")->nullable();
            $table->tinyInteger("therical_credit")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
           $table->dropColumn(['id','name','credit','subject_type','practical_credit','therical_credit']);
        });
    }
};
