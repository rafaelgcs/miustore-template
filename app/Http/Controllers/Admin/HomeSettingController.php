<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeSettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/HomeSettings/Edit', [
            'settings' => HomeSetting::current(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'primary_color' => 'required|string|max:20',
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
            'hero_cta_text' => 'nullable|string|max:50',
            'hero_cta_url' => 'nullable|string|max:255',
            'hero_secondary_cta_text' => 'nullable|string|max:50',
            'hero_secondary_cta_url' => 'nullable|string|max:255',
            'features' => 'required|array|min:3|max:3',
            'features.*.title' => 'required|string|max:255',
            'features.*.subtitle' => 'required|string|max:255',
            'features.*.icon' => 'required|string|max:50',
            'footer' => 'required|array',
            'footer.brand_name' => 'required|string|max:255',
            'footer.brand_description' => 'required|string',
            'footer.social_instagram' => 'nullable|string|max:255',
            'footer.social_facebook' => 'nullable|string|max:255',
            'footer.social_twitter' => 'nullable|string|max:255',
            'footer.cnpj' => 'nullable|string|max:255',
            'footer.payment_methods' => 'nullable|array',
            'footer.contact_phone' => 'nullable|string|max:255',
            'footer.contact_hours' => 'nullable|string|max:255',
            'footer.contact_email' => 'nullable|string|max:255', // Keep as string for fallback or custom formats if needed
            'footer.contact_address' => 'nullable|string',
            'footer.columns' => 'required|array|min:2|max:2',
            'footer.columns.*.title' => 'required|string|max:255',
            'footer.columns.*.links' => 'required|array',
            'footer.columns.*.links.*.name' => 'required|string|max:255',
            'footer.columns.*.links.*.href' => 'required|string|max:255',
        ]);

        HomeSetting::current()->update($validated);

        return redirect()->back()->with('success', 'Configurações da Home atualizadas com sucesso!');
    }
}
