<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemesterOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('semesters')->where('name', 'first semester')->update(['semester_order' => 1]);
        DB::table('semesters')->where('name', 'second semester')->update(['semester_order' => 2]);
        DB::table('semesters')->where('name', 'third semester')->update(['semester_order' => 3]);
        DB::table('semesters')->where('name', 'fourth semester')->update(['semester_order' => 4]);
        DB::table('semesters')->where('name', 'fifth semester')->update(['semester_order' => 5]);
        DB::table('semesters')->where('name', 'sixth semester')->update(['semester_order' => 6]);
        DB::table('semesters')->where('name', 'seventh semester')->update(['semester_order' => 7]);
        DB::table('semesters')->where('name', 'eighth semester')->update(['semester_order' => 8]);
        DB::table('semesters')->where('name', 'ninth semester')->update(['semester_order' => 9]);
        DB::table('semesters')->where('name', 'tenth semester')->update(['semester_order' => 10]);
    }
}
