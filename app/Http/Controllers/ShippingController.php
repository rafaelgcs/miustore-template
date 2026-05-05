<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Product;
use App\Services\ShippingService;
use App\Models\CartItem;

class ShippingController extends Controller
{
    protected $shippingService;

    public function __construct(ShippingService $shippingService)
    {
        $this->shippingService = $shippingService;
    }

    public function calculate(Request $request)
    {
        $request->validate([
            'cep' => 'required|string',
            'product_id' => 'nullable|exists:products,id',
            'cart' => 'nullable|boolean',
        ]);

        $cep = str_replace(['-', '.', ' '], '', $request->cep);

        // 1. Get Address via ViaCEP
        $viaCepResponse = Http::get("https://viacep.com.br/ws/{$cep}/json/");
        
        if ($viaCepResponse->failed() || isset($viaCepResponse['erro'])) {
            return response()->json(['message' => 'CEP não encontrado.'], 422);
        }

        $address = $viaCepResponse->json();

        // 2. Get items to calculate
        if ($request->cart) {
            $query = CartItem::with(['product.variants']);
            if (auth()->check()) {
                $items = $query->where('user_id', auth()->id())->get();
            } else {
                $items = $query->where('session_id', session()->getId())->get();
            }
        } else {
            $product = Product::with('variants')->find($request->product_id);
            $items = [
                (object) ['product' => $product, 'quantity' => 1]
            ];
        }

        if (count($items) === 0) {
            return response()->json(['message' => 'Nenhum item para calcular.'], 422);
        }

        $methods = $this->shippingService->calculateForCart($items, $cep, [
            'city' => $address['localidade'],
            'state' => $address['uf']
        ]);

        return response()->json([
            'address' => $address,
            'methods' => $methods
        ]);
    }
}
