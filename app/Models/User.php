<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

     const STUDENT = 0;
     const ADMIN = 1;
     const  TEACHER = 2;
     const SUPERADMIN = 3;


    protected $fillable = [

        'name',
        'email',
        'password',
        'usertype',
        'email_verified_at',
        'faculty_id',
        'status',

    ];


    public function faculty(){

        return $this->belongsTo(Faculty::class,'faculty_id','id');
    }

   static public function getTotalUser($user_type){

         return self::select('users.id')
                      ->where('usertype','=',$user_type)
                      ->count();


    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
