<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendence extends Model
{
    use HasFactory;

    protected $table = "attendences";

    protected $fillable= ['student_id','subject_id','semester_id','attendence_year','total_hours','absent_hours'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject(){

        return $this->belongsTo(Subject::class);
    }
}

