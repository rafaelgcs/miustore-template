<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoSetting extends Model
{
    protected $fillable = [
        'site_title',
        'meta_description',
        'meta_keywords',
        'meta_image',
        'canonical_url',
        'robots',

        // Google Services
        'google_site_verification',
        'google_analytics_id',
        'google_tag_manager_id',
        'google_adsense_client',

        // Social Media
        'facebook_app_id',
        'twitter_site',
        'instagram_url',
        'facebook_url',
        'linkedin_url',
        'youtube_url',
        'whatsapp_number',

        // Business Information
        'business_name',
        'business_description',
        'business_email',
        'business_phone',
        'business_address',
        'business_city',
        'business_state',
        'business_zip',
        'business_country',

        // Local SEO
        'latitude',
        'longitude',
        'opening_hours',

        // Technical SEO
        'enable_sitemap',
        'enable_robots_txt',
        'custom_robots_txt',
        'enable_schema_markup',

        // Performance & Security
        'enable_hsts',
        'enable_csp',
        'csp_policy',
    ];

    protected $casts = [
        'robots' => 'string',
        'enable_sitemap' => 'boolean',
        'enable_robots_txt' => 'boolean',
        'enable_schema_markup' => 'boolean',
        'enable_hsts' => 'boolean',
        'enable_csp' => 'boolean',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'opening_hours' => 'array',
    ];

    public static function current(): self
    {
        return static::firstOrCreate([], [
            'robots' => 'index, follow',
            'enable_sitemap' => true,
            'enable_robots_txt' => true,
            'enable_schema_markup' => true,
            'enable_hsts' => false,
            'enable_csp' => false,
            'business_country' => 'BR',
        ]);
    }
}
