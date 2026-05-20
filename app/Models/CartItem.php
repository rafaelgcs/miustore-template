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

    public function getFinalPriceAttribute()
    {
        $product = $this->product;
        if (!$product) return 0;

        $options = $this->options;
        if (!$options) return $product->price;

        $query = $product->variants();

        $hasSizes = !empty($product->available_sizes);
        $hasColors = !empty($product->available_colors);

        if ($hasSizes && !empty($options['size'])) {
            $query->where(function($q) use ($options) {
                $q->whereJsonContains('attributes->size', (string)$options['size'])
                  ->orWhereJsonContains('attributes->size', (int)$options['size']);
            });
        }

        if ($hasColors && !empty($options['color'])) {
            $query->whereJsonContains('attributes->color', $options['color']);
        }

        $variant = $query->first();

        return $variant ? ($variant->price ?? $product->price) : $product->price;
    }

    public function getTotalAttribute()
    {
        return $this->final_price * $this->quantity;
    }

    /**
     * Merge guest cart items into the user's cart upon login/registration.
     */
    public static function mergeGuestCartToUser($sessionId, $userId)
    {
        if (!$sessionId || !$userId) {
            return;
        }

        $guestItems = self::where('session_id', $sessionId)->get();

        foreach ($guestItems as $guestItem) {
            // Find if user already has the same product with the same options
            $userItem = self::where('user_id', $userId)
                ->where('product_id', $guestItem->product_id)
                ->get()
                ->filter(function ($item) use ($guestItem) {
                    return $item->options == $guestItem->options;
                })
                ->first();

            if ($userItem) {
                $userItem->increment('quantity', $guestItem->quantity);
                $guestItem->delete();
            } else {
                $guestItem->update([
                    'user_id' => $userId,
                    'session_id' => null,
                ]);
            }
        }
    }
}
