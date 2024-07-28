<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marks extends Model
{
    use HasFactory;

    protected $table = "marks";
    protected $fillable = ['student_id','subject_id','chance','marks_year','home_work_marks','attendence_and_class_activity_marks','midterm_marks','final_marks'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
     {

        return $this->belongsTo(Subject::class);
     }





}


