<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student_Subject extends Model
{
    use HasFactory;

    protected $fillable = ['student_id','subject_id','semester_id'];


  public function student(){

    return $this->belongsTo(Student::class);
  }

  public function subject(){

    return $this->belongsTo(Subject::class);
  }

  public function semester(){

    return $this->belongsTo(Semester::class);
  }

}
