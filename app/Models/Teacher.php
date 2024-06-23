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

    ];

    public function department(){

        return $this->belongsTo(Department::class);
    }

  
}
