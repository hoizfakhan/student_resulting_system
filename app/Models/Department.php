<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;



    //departement model
    protected $fillable = ['name','head','faculty_id'];

    public function faculty(){

        return $this->belongsTo(Faculty::class);
    }

    static public function gettotaldepartment(){

        return self::select('departments')
                    ->count();
    }

    public function students(){

        return $this->hasMany(Student::class);
    }

    public function subjects(){

        return $this->belongsToMany(Subject::class,Assign_Subject::class)
                          ->withPivot('semester_id','faculty_id');
    }

    public function teachers(){

        return $this->hasMany(Teacher::class);
    }

    public function semesters(){

        return $this->belongsToMany(Semester::class,Department_Semester::class);
    }

}
