<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $stats = [
            'total_orders' => $user->orders()->count(),
            'total_spent' => $user->orders()->sum('total_amount'),
            'recent_orders' => $user->orders()->with('items.product')->latest()->take(3)->get(),
            'favorite_products' => Product::where('is_active', true)->inRandomOrder()->take(4)->get(), // Simulando favoritos
        ];

        return Inertia::render('Client/Dashboard', [
            'stats' => $stats,
        ]);
    }

    public function orders()
    {
        $user = auth()->user();

        $orders = $user->orders()
            ->with(['items.product'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Client/Orders', [
            'orders' => $orders,
        ]);
    }

    public function favorites()
    {
        // Por enquanto, vamos mostrar produtos aleatórios como "favoritos"
        // Em uma implementação real, você teria uma tabela de favoritos
        $favorites = Product::where('is_active', true)
            ->with('category')
            ->inRandomOrder()
            ->take(12)
            ->get();

        return Inertia::render('Client/Favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function cart()
    {
        // Por enquanto, carrinho vazio
        // Em uma implementação real, você teria uma tabela de carrinho
        return Inertia::render('Client/Cart', [
            'cart' => [],
            'total' => 0,
        ]);
    }
}
