<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Notification;
use App\Models\User;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'subtotal' => 'required|numeric',
            'shipping_amount' => 'nullable|numeric',
            'shipping_method' => 'nullable|string',
            'shipping_mode' => 'nullable|string',
            'individual_shipping' => 'nullable|array',
            'address_id' => 'required|exists:user_addresses,id',
            'coupon_id' => 'nullable|exists:coupons,id',
            'discount_amount' => 'nullable|numeric',
        ]);

        $user = auth()->user();
        $cartItems = CartItem::where('user_id', $user->id)->with(['product.variants'])->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Seu carrinho está vazio.');
        }

        return DB::transaction(function () use ($user, $cartItems, $request) {
            $subtotal = $request->subtotal;
            
            if ($request->shipping_mode === 'individual') {
                $shipping = collect($request->individual_shipping)->sum('price');
            } else {
                $shipping = $request->shipping_amount;
            }

            $discount = $request->discount_amount ?? 0;
            $total = $subtotal + $shipping - $discount;

            // Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'pending',
                'subtotal' => $subtotal,
                'shipping_amount' => $shipping,
                'shipping_method' => $request->shipping_method,
                'shipping_mode' => $request->shipping_mode ?? 'ensemble',
                'individual_shipping' => $request->individual_shipping,
                'address_id' => $request->address_id,
                'total_amount' => $total,
                'coupon_id' => $request->coupon_id,
                'discount_amount' => $discount,
            ]);

            // Increment Coupon Use
            if ($request->coupon_id) {
                Coupon::where('id', $request->coupon_id)->increment('used_count');
            }

            // Create Order Items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->final_price,
                    'options' => $cartItem->options,
                ]);
            }

            // Clear Cart
            CartItem::where('user_id', $user->id)->delete();

            // Notify Admins
            $admins = User::where('is_admin', true)->get();
            foreach ($admins as $admin) {
                Notification::create([
                    'user_id' => $admin->id,
                    'order_id' => $order->id,
                    'type' => 'order_pending',
                    'title' => 'Novo Pedido #' . $order->id,
                    'message' => 'O cliente ' . $user->name . ' realizou um novo pedido no valor de R$ ' . number_format($total, 2, ',', '.'),
                ]);
            }

            // Notify Customer (Confirmation)
            Notification::create([
                'user_id' => $user->id,
                'order_id' => $order->id,
                'type' => 'order_pending',
                'title' => 'Pedido Recebido #' . $order->id,
                'message' => 'O pedido foi agendado. Aguarde mensagem no Whatsapp para confirmação e finalizar o pedido.',
            ]);

            return redirect()->route('client.orders.success', $order->id);
        });
    }

    /**
     * Display a listing of the client's orders.
     */
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with(['items.product'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Client/Orders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the success page after order creation.
     */
    public function success(Order $order)
    {
        // Security check: ensure the order belongs to the user
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('Client/Orders/Success', [
            'order' => $order,
        ]);
    }

    /**
     * Display the specified order details.
     */
    public function show(Order $order)
    {
        // Security check: ensure the order belongs to the user
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['items.product', 'notifications', 'address']);

        $generalSetting = \App\Models\ShippingSetting::where('provider', 'general')->first();
        $customShippingMethods = $generalSetting ? ($generalSetting->config['custom_methods'] ?? []) : [];

        return Inertia::render('Client/Orders/Show', [
            'order' => $order,
            'customShippingMethods' => $customShippingMethods,
        ]);
    }
}
