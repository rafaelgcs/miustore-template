<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'session_id',
        'product_id',
        'quantity',
        'options',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getPriceAttribute()
    {
        $product = $this->product;
        if (!$product) return 0;

        $options = $this->options;
        if (!$options) return $product->price;

        // Eager load variants if not loaded
        if (!$product->relationLoaded('variants')) {
            $product->load('variants');
        }

        $variant = $product->variants->filter(function($v) use ($options) {
            $attr = $v->attributes;
            return ($attr['size'] ?? null) == ($options['size'] ?? null) &&
                   ($attr['color'] ?? null) == ($options['color'] ?? null);
        })->first();

        return $variant ? ($variant->price ?? $product->price) : $product->price;
    }

    public function getTotalAttribute()
    {
        return $this->price * $this->quantity;
    }
}
