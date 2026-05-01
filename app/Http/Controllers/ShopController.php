<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;

class ShopController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::where('is_active', true)
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        $categories = Category::withCount('products')
            ->having('products_count', '>', 0)
            ->get();

        $newArrivals = Product::where('is_active', true)
            ->with('category')
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Shop/Index', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'newArrivals' => $newArrivals,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
}
