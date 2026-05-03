<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoSettingController extends Controller
{
    public function index()
    {
        $seoSetting = SeoSetting::current();

        return Inertia::render('Admin/SeoSettings', [
            'seoSetting' => $seoSetting,
        ]);
    }

    public function update(Request $request)
    {
        $seoSetting = SeoSetting::current();

        $validated = $request->validate([
            // Basic SEO
            'site_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:2048',
            'canonical_url' => 'nullable|string|max:2048',
            'robots' => 'nullable|string|max:50',

            // Google Services
            'google_site_verification' => 'nullable|string|max:255',
            'google_analytics_id' => 'nullable|string|max:50',
            'google_tag_manager_id' => 'nullable|string|max:50',
            'google_adsense_client' => 'nullable|string|max:50',

            // Social Media
            'facebook_app_id' => 'nullable|string|max:50',
            'twitter_site' => 'nullable|string|max:50',
            'instagram_url' => 'nullable|string|max:2048',
            'facebook_url' => 'nullable|string|max:2048',
            'linkedin_url' => 'nullable|string|max:2048',
            'youtube_url' => 'nullable|string|max:2048',
            'whatsapp_number' => 'nullable|string|max:50',

            // Business Information
            'business_name' => 'nullable|string|max:255',
            'business_description' => 'nullable|string|max:500',
            'business_email' => 'nullable|email|max:255',
            'business_phone' => 'nullable|string|max:50',
            'business_address' => 'nullable|string|max:255',
            'business_city' => 'nullable|string|max:100',
            'business_state' => 'nullable|string|max:50',
            'business_zip' => 'nullable|string|max:20',
            'business_country' => 'nullable|string|max:5',

            // Local SEO
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'opening_hours' => 'nullable|array',

            // Technical SEO
            'enable_sitemap' => 'boolean',
            'enable_robots_txt' => 'boolean',
            'custom_robots_txt' => 'nullable|string|max:5000',
            'enable_schema_markup' => 'boolean',

            // Performance & Security
            'enable_hsts' => 'boolean',
            'enable_csp' => 'boolean',
            'csp_policy' => 'nullable|string|max:5000',
        ]);

        $seoSetting->update($validated);

        return redirect()->route('admin.seo.index')->with('success', 'Configurações de SEO atualizadas com sucesso.');
    }
}
