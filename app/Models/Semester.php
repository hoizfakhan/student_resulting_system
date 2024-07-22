<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function departments(){

        return $this->belongsToMany(Department::class,Department_Semester::class);
    }

    //semester model
    public function students(){

        return $this->belongsToMany(Student::class,Student_Semester::class);

    }

    public function Subjects(){

        return $this->belongsToMany(Subject::class,Assign_Subject::class)
                        ->withPivot('department_id','faculty_id');
    }
}
