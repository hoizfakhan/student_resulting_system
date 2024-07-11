<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department_Semester extends Model
{
    use HasFactory;

    protected $fillable = ['semester_id','department_id'];
}
