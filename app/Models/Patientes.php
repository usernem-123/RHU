<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patientes extends Model
{
    protected $table = 'rhu_patients';

    protected $fillable = [
        'name',
        'address',
        'gender',
        'contact_number',
        'birthday',
    ];

    public function records() {
        return $this->hasMany(Records::class, 'patientes_id');
    }
}
