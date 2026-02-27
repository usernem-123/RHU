<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RHUser extends Model
{
    protected $table = 'rhu_users';

    protected $fillable = [
        'name',
        'role',
        'username',
        'password',
    ];
}
