<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ShippingSetting;
use Illuminate\Support\Facades\Http;

class ShippingService
{
    public static function getAllAvailableMethods()
    {
        return [
            ['id' => 'melhor_envio_pac', 'name' => 'PAC (Melhor Envio)', 'provider' => 'melhor_envio'],
            ['id' => 'melhor_envio_sedex', 'name' => 'SEDEX (Melhor Envio)', 'provider' => 'melhor_envio'],
            ['id' => 'correios_pac', 'name' => 'PAC (Correios)', 'provider' => 'correios'],
            ['id' => 'correios_sedex', 'name' => 'SEDEX (Correios)', 'provider' => 'correios'],
            ['id' => 'frenet_expresso', 'name' => 'Expresso (Frenet)', 'provider' => 'frenet'],
        ];
    }

    public function calculateForCart($items, $cep)
    {
        $cep = str_replace(['-', '.', ' '], '', $cep);
        $availableMethods = [];

        // 1. Get enabled providers
        $providers = ShippingSetting::where('is_enabled', true)->get();

        foreach ($providers as $provider) {
            $methods = $this->calculateFromProvider($provider, $items, $cep);
            $availableMethods = array_merge($availableMethods, $methods);
        }

        // 2. Filter methods based on product restrictions
        // A method is only available if ALL products in the cart allow it.
        // If a product has no restrictions (null or empty array), it allows all.
        foreach ($items as $item) {
            $product = $item->product;
            if ($product->shipping_methods && count($product->shipping_methods) > 0) {
                $availableMethods = array_filter($availableMethods, function($method) use ($product) {
                    return in_array($method['id'], $product->shipping_methods);
                });
            }
        }

        return array_values($availableMethods);
    }

    private function calculateFromProvider($setting, $items, $cep)
    {
        switch ($setting->provider) {
            case 'melhor_envio':
                return $this->calculateMelhorEnvio($setting->config, $items, $cep);
            case 'correios':
                return $this->calculateCorreios($setting->config, $items, $cep);
            case 'frenet':
                return $this->calculateFrenet($setting->config, $items, $cep);
            default:
                return [];
        }
    }

    private function calculateMelhorEnvio($config, $items, $cep)
    {
        // Real API call would go here
        // $response = Http::withToken($config['token'])->post('https://melhorenvio.com.br/api/v2/me/shipment/calculate', [...]);
        
        // Mocking for now as requested, but with real structure
        return [
            [
                'id' => 'melhor_envio_pac',
                'name' => 'PAC (Melhor Envio)',
                'price' => 22.90,
                'deadline' => 7,
                'icon' => 'truck',
                'provider' => 'melhor_envio'
            ],
            [
                'id' => 'melhor_envio_sedex',
                'name' => 'SEDEX (Melhor Envio)',
                'price' => 45.50,
                'deadline' => 2,
                'icon' => 'zap',
                'provider' => 'melhor_envio'
            ]
        ];
    }

    private function calculateCorreios($config, $items, $cep)
    {
        return [
            [
                'id' => 'correios_pac',
                'name' => 'PAC (Correios)',
                'price' => 25.00,
                'deadline' => 8,
                'icon' => 'truck',
                'provider' => 'correios'
            ]
        ];
    }

    private function calculateFrenet($config, $items, $cep)
    {
        return [
            [
                'id' => 'frenet_expresso',
                'name' => 'Expresso (Frenet)',
                'price' => 38.00,
                'deadline' => 3,
                'icon' => 'zap',
                'provider' => 'frenet'
            ]
        ];
    }
}
