<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable =  [

        'name',
        'last_name',
        'father_name',
        'phone',
        'department_id',
        'user_id'

    ];

    public function department(){

        return $this->belongsTo(Department::class);
    }

    public function user(){

        return $this->belongsTo(User::class);
    }

   public function subjects(){

     return $this->belongsToMany(Subject::class,TeacherSubject::class)
                                  ->withPivot('faculty_id','department_id', 'semester_id');
   }
                                                                                                
}
