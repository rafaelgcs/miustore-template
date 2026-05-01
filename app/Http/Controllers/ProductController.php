<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $categorySlug = $request->query('category');
        $type = $request->query('type');
        $color = $request->query('color');

        $categories = Category::withCount('products')
            ->having('products_count', '>', 0)
            ->orderBy('name')
            ->get();

        $types = Product::whereNotNull('type')
            ->where('type', '!=', '')
            ->distinct()
            ->orderBy('type')
            ->pluck('type');

        $productsQuery = Product::where('is_active', true)
            ->with('category');

        if ($search) {
            $productsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($categorySlug) {
            $productsQuery->whereHas('category', function ($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            });
        }

        if ($type) {
            $productsQuery->where('type', $type);
        }

        if ($color) {
            $productsQuery->whereJsonContains('available_colors', $color);
        }

        $products = $productsQuery->latest()->paginate(12)->withQueryString();

        $userFavorites = auth()->check() ? auth()->user()->favorites()->pluck('product_id')->toArray() : [];

        return Inertia::render('Shop/Products', [
            'products' => $products,
            'categories' => $categories,
            'types' => $types,
            'userFavorites' => $userFavorites,
            'filters' => [
                'search' => $search,
                'category' => $categorySlug,
                'type' => $type,
                'color' => $color,
            ],
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category');
        $isFavorited = auth()->check() ? auth()->user()->favorites()->where('product_id', $product->id)->exists() : false;

        return Inertia::render('Shop/ProductShow', [
            'product' => $product,
            'isFavorited' => $isFavorited,
        ]);
    }
}
