<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CouponController extends Controller
{
    public function validateCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'subtotal' => 'required|numeric',
        ]);

        $coupon = Coupon::where('code', $request->code)
            ->where('is_active', true)
            ->with('promotion')
            ->first();

        if (!$coupon) {
            return response()->json(['message' => 'Cupom inválido.'], 422);
        }

        // Check expiry
        if ($coupon->expiry_date && Carbon::parse($coupon->expiry_date)->isPast()) {
            return response()->json(['message' => 'Cupom expirado.'], 422);
        }

        // Check usage limit
        if ($coupon->usage_limit && $coupon->used_count >= $coupon->usage_limit) {
            return response()->json(['message' => 'Este cupom atingiu o limite de uso.'], 422);
        }

        $promotion = $coupon->promotion;

        // Check min order amount
        if ($promotion->min_order_amount && $request->subtotal < $promotion->min_order_amount) {
            return response()->json([
                'message' => 'O valor mínimo para usar este cupom é R$ ' . number_format($promotion->min_order_amount, 2, ',', '.')
            ], 422);
        }

        // Calculate discount
        $discountAmount = 0;
        if ($promotion->type === 'percentage') {
            $discountAmount = ($request->subtotal * $promotion->value) / 100;
        } elseif ($promotion->type === 'fixed') {
            $discountAmount = $promotion->value;
        }

        // Ensure discount doesn't exceed subtotal
        if ($discountAmount > $request->subtotal) {
            $discountAmount = $request->subtotal;
        }

        return response()->json([
            'coupon' => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'discount_amount' => $discountAmount,
                'type' => $promotion->type,
                'value' => $promotion->value
            ],
            'message' => 'Cupom aplicado com sucesso!'
        ]);
    }
}
