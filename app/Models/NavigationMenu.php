<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NavigationMenu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'url',
        'content',
        'order',
        'is_active',
    ];

    protected $casts = [
        'content' => 'json',
        'is_active' => 'boolean',
    ];
}
