<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarouselItem extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'button_text',
        'button_url',
        'product_id',
        'image',
        'mobile_image',
        'text_color',
        'overlay_opacity',
        'order',
        'active',
        'only_image',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
