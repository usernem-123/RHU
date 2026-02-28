<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class RHUser extends Authenticatable
{
    protected $table = 'rhu_users';

    protected $fillable = [
        'name',
        'role',
        'username',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}