<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        // Generate mock data for the last 7 days of revenue
        $revenueData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('d/m');
            // Mock random revenue for demonstration purposes
            // In a real app, you would query: Order::whereDate('created_at', now()->subDays($i))->sum('total_amount')
            $revenueData[] = [
                'name' => $date,
                'total' => rand(100, 1500),
            ];
        }

        $stats = [
            'total_products' => Product::where('is_active', true)->count(),
            'total_categories' => Category::count(),
            'total_orders' => Order::count(),
            'total_users' => User::where('is_admin', false)->count(),
            'total_revenue' => Order::sum('total_amount'),
            'recent_orders' => Order::with('user')->latest()->take(5)->get(),
            'low_stock_products' => Product::where('is_active', true)
                ->where('stock', '<=', 5)
                ->orderBy('stock', 'asc')
                ->take(5)
                ->get(),
            'revenue_data' => $revenueData,
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
