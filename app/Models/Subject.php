<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'faculty_id',
        'department_id',
        'semester',
        'credit',
        'practical_credit',
        'therical_credit',
        'subject_type',

    ];

    public function faculty(){

        return $this->belongsTo(Faculty::class,'faculty_id');
    }

    public function department(){

        return $this->belongsTo(Department::class,'department_id');
    }


}
