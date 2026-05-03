<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\OrderItem;
use App\Models\ProductMovement;

class SyncProductMovements extends Command
{
    protected $signature = 'products:sync-movements';
    protected $description = 'Sync existing order items into product movements';

    public function handle()
    {
        $items = OrderItem::with('order')->get();
        $count = 0;

        foreach ($items as $item) {
            // Check if movement already exists for this order item
            $exists = ProductMovement::where('product_id', $item->product_id)
                ->where('type', 'sale')
                ->where('reference_id', $item->order_id)
                ->exists();

            if (!$exists) {
                ProductMovement::create([
                    'product_id' => $item->product_id,
                    'user_id' => $item->order->user_id,
                    'type' => 'sale',
                    'quantity' => $item->quantity,
                    'old_stock' => 0, // Unknown for past items
                    'new_stock' => 0, // Unknown for past items
                    'description' => "Venda retroativa (Pedido #{$item->order_id})",
                    'reference_id' => $item->order_id,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ]);
                $count++;
            }
        }

        $this->info("Sincronizados {$count} novos registros de movimentação.");
    }
}
