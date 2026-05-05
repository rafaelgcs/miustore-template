<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingSetting extends Model
{
    protected $fillable = ['provider', 'is_enabled', 'config'];

    protected $casts = [
        'is_enabled' => 'boolean',
        'config' => 'array',
    ];

    public static function getForProvider($provider)
    {
        return self::where('provider', $provider)->first();
    }
}
