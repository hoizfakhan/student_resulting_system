<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student_Semester extends Model
{
    use HasFactory;
  //student_semester model
    protected $table = "student__semesters";

    protected $fillable = ['student_id','semester_id','status'];

    //student_semester model
    public function student(){

        return $this->belongsTo(Student::class);
    }

    public  function semester(){

        return $this->belongsTo(Semester::class);
    }
}
