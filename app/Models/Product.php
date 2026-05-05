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
        'meta_title',
        'meta_description',
        'meta_keywords',
        'size_guide',
        'shipping_methods',
        'origin_zip',
        'allow_pickup',
    ];
    
    protected $casts = [
        'available_sizes' => 'array',
        'available_colors' => 'array',
        'customization_options' => 'array',
        'shipping_methods' => 'array',
        'allow_pickup' => 'boolean',
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

    public function movements()
    {
        return $this->hasMany(ProductMovement::class);
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }

    public function getAverageRatingAttribute()
    {
        return round($this->reviews()->where('status', 'approved')->avg('rating') ?: 0, 1);
    }

    public function getReviewsCountAttribute()
    {
        return $this->reviews()->where('status', 'approved')->count();
    }
}
