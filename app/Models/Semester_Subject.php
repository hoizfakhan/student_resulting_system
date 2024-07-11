<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester_Subject extends Model
{
    use HasFactory;

    protected $fillable = ['subject_id','semester_id'];

    public function subject(){

        return $this->belongsTo(Student::class);
    }

    public function semester(){

        return $this->belongsTo(Semester::class);
    }

    
}
