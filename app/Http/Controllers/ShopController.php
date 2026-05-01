<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Product;

class ShopController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)->get();
        return Inertia::render('Shop/Index', [
            'products' => $products
        ]);
    }
}
