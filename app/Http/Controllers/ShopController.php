<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\CarouselItem;
use App\Models\Campaign;
use App\Models\HomeSetting;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $categorySlug = $request->query('category');

        $categories = Category::whereHas('products')
            ->withCount('products')
            ->orderBy('name')
            ->get();

        $productsQuery = Product::where('is_active', true)
            ->with(['category', 'variants']);

        if ($search) {
            $productsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
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

        $featuredProducts = $productsQuery->latest()->take(8)->get();

        $newArrivals = Product::where('is_active', true)
            ->with(['category', 'variants'])
            ->latest()
            ->take(4)
            ->get();

        $carouselItems = CarouselItem::where('active', true)
            ->orderBy('order')
            ->get();

        $campaigns = Campaign::where('active', true)
            ->with('category')
            ->orderBy('order')
            ->take(4)
            ->get();

        if ($search || $categorySlug) {
            return redirect()->route('products.index', array_filter(['search' => $search, 'category' => $categorySlug]));
        }

        $userFavorites = auth()->check() ? auth()->user()->favorites()->pluck('product_id')->toArray() : [];

        return Inertia::render('Shop/Index', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'newArrivals' => $newArrivals,
            'carouselItems' => $carouselItems,
            'campaigns' => $campaigns,
            'userFavorites' => $userFavorites,
            'filters' => [
                'search' => $search,
                'category' => $categorySlug,
            ],
            'homeSettings' => HomeSetting::current(),
        ]);
    }
}
