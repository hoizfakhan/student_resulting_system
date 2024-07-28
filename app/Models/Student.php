<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [

      'name',
      'last_name',
      'father_name',
      'grandfather_name',
      'original_province',
      'original_district',
      'original_village',
      'current_province',
      'current_district',
      'current_village',
      'phone_number',
      'nic_number',
      'birth_date',
      'school_name',
      'school_graduation_year',
      'kankor_id',
      'kankor_marks',
      'admission_date',
      'department_id',
      'user_id',
      'identity_cart_number',
      'number_maktob_sent_exam_commettee',
      'number_maktob_tajeel',
      'number_maktob_monfak',
      'number_maktob_lailia',
      'image_path'


    ];


    public function department(){

        return $this->belongsTo(Department::class);
    }


    public function attendence()
    {
        return $this->hasMany(Attendence::class);
    }

    public  function subjects(){

        return $this->belongsToMany(Subject::class,Student_Subject::class);

    }

    public function user(){

        return $this->belongsTo(User::class);
    }



    public function semesters()
        {
            return $this->belongsToMany(Semester::class, Student_Semester::class)
                        ->withPivot('status') // include the pivot table column 'status'
                        ->withTimestamps(); // enable timestamps on pivot table
        }

     public function marks(){

        return $this->hasMany(Marks::class);
     }

    


}
