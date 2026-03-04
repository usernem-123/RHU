<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'rhu_transaction';

    protected $fillable = [
        'transaction_id',
        'type',
        'payment',
    ];

    public function patient()
    {
        return $this->belongsTo(Patientes::class, 'patientes_id');
    }
}
