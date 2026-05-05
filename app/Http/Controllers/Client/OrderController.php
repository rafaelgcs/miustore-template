<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Notification;
use App\Models\User;
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

            $total = $subtotal + $shipping;

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
            ]);

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
                'message' => 'Recebemos seu pedido! Ele está sendo analisado e em breve será processado.',
            ]);

            return redirect()->route('client.orders.success', $order->id);
        });
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
}
