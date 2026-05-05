<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use Inertia\Inertia;

class ShippingManagementController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'items.product'])
            ->whereNotNull('shipping_method')
            ->orWhereNotNull('individual_shipping')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Shipping/Management', [
            'orders' => $orders
        ]);
    }
}
