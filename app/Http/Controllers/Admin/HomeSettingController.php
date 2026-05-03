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
        ]);

        HomeSetting::current()->update($validated);

        return redirect()->back()->with('success', 'Configurações da Home atualizadas com sucesso!');
    }
}
