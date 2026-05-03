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
        $user = auth()->user();
        $cartItems = CartItem::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Seu carrinho está vazio.');
        }

        return DB::transaction(function () use ($user, $cartItems) {
            // Calculate total amount
            $subtotal = $cartItems->reduce(function ($acc, $item) {
                return $acc + ($item->product->price * $item->quantity);
            }, 0);
            
            $shipping = $subtotal > 500 ? 0 : 25.00;
            $total = $subtotal + $shipping;

            // Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'pending',
                'total_amount' => $total,
            ]);

            // Create Order Items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
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
