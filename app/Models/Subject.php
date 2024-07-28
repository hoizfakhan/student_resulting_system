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


   // Subject.php

public function assignSubjects()
{
    return $this->hasMany(Assign_Subject::class);
}

public function facultys()
{
    return $this->belongsToMany(Faculty::class, 'assign-_subjects')
                ->withPivot('semester_id', 'department_id');
}

public function departments()
{
    return $this->belongsToMany(Department::class, 'assign-_subjects')
                ->withPivot('semester_id', 'faculty_id');
}

public function semesters()
{
    return $this->belongsToMany(Semester::class, 'assign-_subjects')
                ->withPivot('department_id', 'faculty_id');
}

public function teacherSubjects()
{
    return $this->belongsToMany(Teacher::class, 'teacher_subjects')
                ->withPivot('semester_id', 'department_id', 'faculty_id');
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


    public function marks(){

        return $this->hasMany(Marks::class);
     }
}
