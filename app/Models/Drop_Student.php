<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drop_Student extends Model
{
    use HasFactory;
   //drop student
    protected $table = "drop_students";
    protected $fillable = ['student_id','semester_id','droped_year','drop_reason','maktob_number'];


    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
