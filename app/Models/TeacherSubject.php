<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CompositeKeyTrait;

class TeacherSubject extends Model
{


    use HasFactory;

    protected $fillable=[

        'teacher_id',
        'faculty_id',
        'department_id',
        'semester',
        'subject_id',
        'status',

    ];

   protected $primarykey = ['teacher_id','faculty_id','department_id','semester','subject_id'];

   public function getKeyName()
   {
    return 'teacher_id,faculty_id,department_id,semester,subject_id';
   }

 


     // Mutator to serialize the subject field before saving to the database
    // public function setSubjectAttribute($value)
     //{
       //  $this->attributes['subject'] = serialize($value);
     //}

     // Accessor to unserialize the subject field when retrieving from the database
     //public function getSubjectAttribute($value)
     //{
       //  return unserialize($value);
     //}

     public function teacher(){

        return $this->belongsTo(Teacher::class);
     }

     public function faculty(){

        return $this->belongsTo(Faculty::class);
     }

     public function department(){

        return $this->belongsTo(Department::class);
     }

     public  function subject(){

        return $this->belongsTo(Subject::class);
     }
}
