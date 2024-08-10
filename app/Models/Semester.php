<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    //semester model
    protected $fillable = ['name'];

    public function departments(){

        return $this->belongsToMany(Department::class,Department_Semester::class);
    }


    public function students(){

        return $this->belongsToMany(Student::class,Student_Semester::class);

    }

    public function Subjects(){

        return $this->belongsToMany(Subject::class,Assign_Subject::class)
                        ->withPivot('department_id','faculty_id');
    }
    //semester
    public function drop_students(){

        return $this->hasMany(Drop_Student::class);
    }
}
