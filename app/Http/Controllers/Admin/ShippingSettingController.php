<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShippingSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShippingSettingController extends Controller
{
    public function index()
    {
        $settings = ShippingSetting::all();
        
        // Ensure default providers exist
        $providers = ['general', 'melhor_envio', 'correios', 'frenet'];
        foreach ($providers as $provider) {
            if (!$settings->where('provider', $provider)->first()) {
                ShippingSetting::create([
                    'provider' => $provider,
                    'is_enabled' => $provider === 'general',
                    'config' => $this->getDefaultConfig($provider)
                ]);
            }
        }

        return Inertia::render('Admin/Shipping/Index', [
            'settings' => ShippingSetting::all(),
        ]);
    }

    public function update(Request $request, ShippingSetting $setting)
    {
        $data = $request->validate([
            'is_enabled' => 'required|boolean',
            'config' => 'required|array',
        ]);

        $setting->update($data);

        return back()->with('success', 'Configurações de frete atualizadas.');
    }

    private function getDefaultConfig($provider)
    {
        switch ($provider) {
            case 'general':
                return [
                    'origin_address' => [
                        'street' => '',
                        'number' => '',
                        'complement' => '',
                        'neighborhood' => '',
                        'city' => '',
                        'state' => '',
                        'zip' => '',
                    ],
                    'allow_pickup' => true,
                    'pickup_cities' => '',
                    'pickup_states' => '',
                ];
            case 'melhor_envio':
                return ['token' => ''];
            case 'correios':
                return ['user' => '', 'password' => ''];
            case 'frenet':
                return ['key' => ''];
            default:
                return [];
        }
    }
}
