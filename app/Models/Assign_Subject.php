<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assign_Subject extends Model
{
    use HasFactory;
    protected $table="assign-_subjects";
  // assign_subject model
    protected $fillable = ['subject_id','faculty_id','department_id','semester_id'];


  public function subject(){

    return $this->belongsTo(Subject::class);
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



}
