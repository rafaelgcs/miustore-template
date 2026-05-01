<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'type',
        'material',
        'sku',
        'description',
        'price',
        'stock',
        'available_sizes',
        'available_colors',
        'customization_options',
        'image',
        'is_active',
    ];

    protected $casts = [
        'available_sizes' => 'array',
        'available_colors' => 'array',
        'customization_options' => 'array',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }
}
