<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('seo_settings', function (Blueprint $table) {
            // Basic SEO
            $table->string('canonical_url')->nullable()->after('robots');

            // Google Services
            // (já existem)

            // Social Media
            $table->string('facebook_app_id')->nullable()->after('google_adsense_client');
            $table->string('twitter_site')->nullable()->after('facebook_app_id');
            $table->string('instagram_url')->nullable()->after('twitter_site');
            $table->string('facebook_url')->nullable()->after('instagram_url');
            $table->string('linkedin_url')->nullable()->after('facebook_url');
            $table->string('youtube_url')->nullable()->after('linkedin_url');
            $table->string('whatsapp_number')->nullable()->after('youtube_url');

            // Business Information
            $table->string('business_name')->nullable()->after('whatsapp_number');
            $table->text('business_description')->nullable()->after('business_name');
            $table->string('business_email')->nullable()->after('business_description');
            $table->string('business_phone')->nullable()->after('business_email');
            $table->string('business_address')->nullable()->after('business_phone');
            $table->string('business_city')->nullable()->after('business_address');
            $table->string('business_state')->nullable()->after('business_city');
            $table->string('business_zip')->nullable()->after('business_state');
            $table->string('business_country')->nullable()->after('business_zip')->default('BR');

            // Local SEO
            $table->decimal('latitude', 10, 8)->nullable()->after('business_country');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->json('opening_hours')->nullable()->after('longitude');

            // Technical SEO
            $table->boolean('enable_sitemap')->default(true)->after('opening_hours');
            $table->boolean('enable_robots_txt')->default(true)->after('enable_sitemap');
            $table->text('custom_robots_txt')->nullable()->after('enable_robots_txt');
            $table->boolean('enable_schema_markup')->default(true)->after('custom_robots_txt');

            // Performance & Security
            $table->boolean('enable_hsts')->default(false)->after('enable_schema_markup');
            $table->boolean('enable_csp')->default(false)->after('enable_hsts');
            $table->text('csp_policy')->nullable()->after('enable_csp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('seo_settings', function (Blueprint $table) {
            $table->dropColumn([
                'canonical_url',
                'facebook_app_id',
                'twitter_site',
                'instagram_url',
                'facebook_url',
                'linkedin_url',
                'youtube_url',
                'whatsapp_number',
                'business_name',
                'business_description',
                'business_email',
                'business_phone',
                'business_address',
                'business_city',
                'business_state',
                'business_zip',
                'business_country',
                'latitude',
                'longitude',
                'opening_hours',
                'enable_sitemap',
                'enable_robots_txt',
                'custom_robots_txt',
                'enable_schema_markup',
                'enable_hsts',
                'enable_csp',
                'csp_policy',
            ]);
        });
    }
};
