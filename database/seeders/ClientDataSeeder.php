<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;

class ClientDataSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('is_admin', false)->first();

        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Cliente Teste',
                'email' => 'cliente@example.com',
                'is_admin' => false,
            ]);
        }

        $products = Product::take(5)->get();

        if ($products->count() > 0) {
            // Add some favorites
            $user->favorites()->sync($products->pluck('id')->take(3));

            // Create some orders
            for ($i = 1; $i <= 3; $i++) {
                $order = Order::create([
                    'user_id' => $user->id,
                    'status' => ['pending', 'processing', 'delivered'][rand(0, 2)],
                    'total_amount' => 0,
                ]);

                $total = 0;
                $orderProducts = $products->random(rand(1, 3));
                foreach ($orderProducts as $product) {
                    $qty = rand(1, 2);
                    $price = $product->price;
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'price' => $price,
                    ]);
                    $total += $price * $qty;
                }

                $order->update(['total_amount' => $total]);
            }
        }
    }
}
