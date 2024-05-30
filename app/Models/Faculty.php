<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;
    protected $table="faculties";

    protected $fillable = ['faculty_name','faculty_boss'];

    public function departments(){

        return $this->hasMany(Department::class);
    }

    static public function gettotalfaculty(){

         return self::select('faculties.id')
                     ->count();

    }

}
