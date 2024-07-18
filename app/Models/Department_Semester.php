<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department_Semester extends Model
{
    use HasFactory;

    protected $table="department_semesters";
    protected $fillable = ['semester_id','department_id'];


  public function department(){

   return $this->belongsTo(Department::class);
  }

  public function semester(){

    return $this->belongsTo(Semester::class);
   }

}
