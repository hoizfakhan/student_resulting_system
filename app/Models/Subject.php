<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $table="subjects";

    protected $fillable = [

        'name',
        'credit',
        'practical_credit',
        'therical_credit',
        'subject_type',

    ];


   public function facultys(){

      return $this->belongsToMany(Faculty::class,Assign_Subject::class);
   }

   public function departments(){

     return $this->belongsToMany(Department::class,Assign_Subject::class);
   }

   public function semesters(){

    return $this->belongsToMany(Semester::class,Assign_Subject::class);
  }



    public function teachers(){

        return $this->belongsToMany(Teacher::class,TeacherSubject::class);
    }


    public  function students(){

        return $this->belongsToMany(Student::class,Student_Subject::class);
    }

    public function attendences(){

      return $this->hasMany(Attendence::class);
    }


}
