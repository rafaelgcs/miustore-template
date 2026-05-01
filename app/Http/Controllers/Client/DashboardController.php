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
            'favorite_products' => $user->favorites()->with('category')->take(4)->get(),
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
            ->get();

        return Inertia::render('Client/Orders', [
            'orders' => $orders,
        ]);
    }

    public function favorites()
    {
        $user = auth()->user();
        
        $favorites = $user->favorites()
            ->with('category')
            ->latest('favorites.created_at')
            ->get();

        return Inertia::render('Client/Favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function toggleFavorite(Product $product)
    {
        $user = auth()->user();
        
        $user->favorites()->toggle($product->id);

        return back();
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
