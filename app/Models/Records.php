<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Records extends Model
{
    protected $table = 'rhu_records';

    protected $fillable = [
        'type',
        'description',
    ];

    public function patiente() {
    return $this->belongsTo(Patientes::class, 'patientes_id');
}
}
