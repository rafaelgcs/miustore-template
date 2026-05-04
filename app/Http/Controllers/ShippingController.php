<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Product;

class ShippingController extends Controller
{
    public function calculate(Request $request)
    {
        $request->validate([
            'cep' => 'required|string',
            'product_id' => 'required|exists:products,id',
        ]);

        $cep = str_replace(['-', '.', ' '], '', $request->cep);

        // 1. Get Address via ViaCEP
        $viaCepResponse = Http::get("https://viacep.com.br/ws/{$cep}/json/");
        
        if ($viaCepResponse->failed() || isset($viaCepResponse['erro'])) {
            return response()->json(['message' => 'CEP não encontrado.'], 422);
        }

        $address = $viaCepResponse->json();

        // 2. Mock Correios Shipping Calculation
        // In a real scenario, you would call Correios API here.
        // For demonstration, we'll return fixed values based on distance or just static values.
        
        $shippingMethods = [
            [
                'name' => 'PAC',
                'price' => 24.90,
                'deadline' => 8,
                'icon' => 'truck'
            ],
            [
                'name' => 'SEDEX',
                'price' => 48.50,
                'deadline' => 2,
                'icon' => 'zap'
            ]
        ];

        return response()->json([
            'address' => $address,
            'methods' => $shippingMethods
        ]);
    }
}
