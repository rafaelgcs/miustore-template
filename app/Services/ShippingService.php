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
            ['id' => 'retirada', 'name' => 'Retirada no Local', 'provider' => 'general'],
        ];
    }

    public function calculateForCart($items, $cep, $location = null)
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
                    // Always allow pickup if explicitly enabled for the product, or if it matches the restriction
                    if ($method['id'] === 'retirada') return true; 
                    return in_array($method['id'], $product->shipping_methods);
                });
            }
        }

        // 3. Add Pickup (Retirada) option if allowed
        $generalSettings = ShippingSetting::where('provider', 'general')->first();
        $isPickupAllowedGlobally = $generalSettings ? ($generalSettings->config['allow_pickup'] ?? false) : false;
        
        $allowPickup = $isPickupAllowedGlobally;
        
        // Check city/state restrictions
        if ($allowPickup && $generalSettings) {
            $allowedCities = array_filter(array_map('trim', explode(',', $generalSettings->config['pickup_cities'] ?? '')));
            $allowedStates = array_filter(array_map('trim', explode(',', strtoupper($generalSettings->config['pickup_states'] ?? ''))));

            if (!empty($allowedCities) || !empty($allowedStates)) {
                // If we don't have location, we might need to fetch it
                if (!$location) {
                    $viaCepResponse = Http::get("https://viacep.com.br/ws/{$cep}/json/");
                    if ($viaCepResponse->successful() && !isset($viaCepResponse['erro'])) {
                        $location = [
                            'city' => $viaCepResponse['localidade'],
                            'state' => $viaCepResponse['uf']
                        ];
                    }
                }

                if ($location) {
                    $cityMatch = empty($allowedCities) || in_array(trim($location['city']), $allowedCities);
                    $stateMatch = empty($allowedStates) || in_array(trim($location['state']), $allowedStates);
                    
                    if (!$cityMatch || !$stateMatch) {
                        $allowPickup = false;
                    }
                } else {
                    // If we can't determine location and there are restrictions, we shouldn't allow pickup to be safe
                    $allowPickup = false;
                }
            }
        }

        if ($allowPickup) {
            foreach ($items as $item) {
                if (!$item->product->allow_pickup) {
                    $allowPickup = false;
                    break;
                }
            }
        }

        if ($allowPickup) {
            $availableMethods[] = [
                'id' => 'retirada',
                'name' => 'Retirada no Local',
                'price' => 0.00,
                'deadline' => 0,
                'icon' => 'home',
                'provider' => 'general',
                'address' => $generalSettings ? ($generalSettings->config['origin_address'] ?? null) : null
            ];
        }

        return array_values($availableMethods);
    }

    private function calculateFromProvider($setting, $items, $cep)
    {
        // Determine origin CEP
        // Logic: use the origin_zip of the first product that has it, or the global default.
        $originZip = null;
        foreach ($items as $item) {
            if ($item->product->origin_zip) {
                $originZip = str_replace(['-', '.', ' '], '', $item->product->origin_zip);
                break;
            }
        }
        
        if (!$originZip) {
            $generalSettings = ShippingSetting::where('provider', 'general')->first();
            $originZip = str_replace(['-', '.', ' '], '', $generalSettings->config['origin_address']['zip'] ?? '');
        }

        switch ($setting->provider) {
            case 'melhor_envio':
                return $this->calculateMelhorEnvio($setting->config, $items, $cep, $originZip);
            case 'correios':
                return $this->calculateCorreios($setting->config, $items, $cep, $originZip);
            case 'frenet':
                return $this->calculateFrenet($setting->config, $items, $cep, $originZip);
            default:
                return [];
        }
    }

    private function calculateMelhorEnvio($config, $items, $cep, $originZip)
    {
        // In a real implementation, $originZip would be used here
        // $response = Http::withToken($config['token'])->post('...', [
        //     'from' => ['postal_code' => $originZip],
        //     'to' => ['postal_code' => $cep],
        //     ...
        // ]);
        
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

    private function calculateCorreios($config, $items, $cep, $originZip)
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

    private function calculateFrenet($config, $items, $cep, $originZip)
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
