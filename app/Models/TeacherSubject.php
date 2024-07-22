<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CompositeKeyTrait;

class TeacherSubject extends Model
{

    use HasFactory;

    protected $table = "teacher_subjects";

    protected $fillable=[

        'teacher_id',
        'faculty_id',
        'department_id',
        'semester_id',
        'subject_id',
        'status',

    ];

     public function teacher(){

        return $this->belongsTo(Teacher::class);
     }

     public function faculty(){

        return $this->belongsTo(Faculty::class);
     }

     public function department(){

        return $this->belongsTo(Department::class);
     }

     public function semester(){

        return $this->belongsTo(Semester::class);
     }

     public  function subject(){

        return $this->belongsTo(Subject::class);
     }

}
