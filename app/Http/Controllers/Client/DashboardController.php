<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Recomendações: Produtos aleatórios que não estão nos favoritos
        $favoriteIds = $user->favorites()->pluck('products.id');
        $recommended = Product::with('category')
            ->whereNotIn('id', $favoriteIds)
            ->inRandomOrder()
            ->take(4)
            ->get();

        $stats = [
            'total_orders' => $user->orders()->count(),
            'total_spent' => $user->orders()->sum('total_amount'),
            'recent_orders' => $user->orders()->with('items.product')->latest()->take(3)->get(),
            'favorite_products' => $user->favorites()->with('category')->take(4)->get(),
            'recommended_products' => $recommended,
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

    public function sharedFavorites(User $user)
    {
        $favorites = $user->favorites()
            ->with('category')
            ->latest('favorites.created_at')
            ->get();

        return Inertia::render('Client/SharedFavorites', [
            'user' => $user->only(['name']),
            'favorites' => $favorites,
        ]);
    }

    public function toggleFavorite(Product $product)
    {
        $user = auth()->user();
        
        $user->favorites()->toggle($product->id);

        return back();
    }
}
