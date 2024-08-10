<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduated_Student extends Model
{
    use HasFactory;

    protected $table = "graduated_students";

    protected $fillable = ['student_id','graduated_date','education_degree','monograph_title','monograph_defence_date'];

//
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
