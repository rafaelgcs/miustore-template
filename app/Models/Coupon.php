<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [
        'promotion_id',
        'code',
        'usage_limit',
        'used_count',
        'usage_limit_per_user',
        'expiry_date',
        'is_active',
    ];

    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }
}
