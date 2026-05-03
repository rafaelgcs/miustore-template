<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = [
        'name',
        'description',
        'type',
        'value',
        'min_order_amount',
        'min_quantity',
        'buy_quantity',
        'get_quantity',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function coupons()
    {
        return $this->hasMany(Coupon::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'promotion_targets', 'promotion_id', 'target_id')
            ->where('target_type', 'product');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'promotion_targets', 'promotion_id', 'target_id')
            ->where('target_type', 'category');
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class, 'promotion_targets', 'promotion_id', 'target_id')
            ->where('target_type', 'collection');
    }
}
