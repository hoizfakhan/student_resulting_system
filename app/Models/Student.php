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
      'current_semester',
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




}
