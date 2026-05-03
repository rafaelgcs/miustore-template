<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seo_settings', function (Blueprint $table) {
            $table->id();
            // Basic SEO
            $table->string('site_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->string('meta_image')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('robots')->nullable()->default('index, follow');

            // Google Services
            $table->string('google_site_verification')->nullable();
            $table->string('google_analytics_id')->nullable();
            $table->string('google_tag_manager_id')->nullable();
            $table->string('google_adsense_client')->nullable();

            // Social Media
            $table->string('facebook_app_id')->nullable();
            $table->string('twitter_site')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('whatsapp_number')->nullable();

            // Business Information
            $table->string('business_name')->nullable();
            $table->text('business_description')->nullable();
            $table->string('business_email')->nullable();
            $table->string('business_phone')->nullable();
            $table->string('business_address')->nullable();
            $table->string('business_city')->nullable();
            $table->string('business_state')->nullable();
            $table->string('business_zip')->nullable();
            $table->string('business_country')->nullable();

            // Local SEO
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('opening_hours')->nullable(); // JSON format

            // Technical SEO
            $table->boolean('enable_sitemap')->default(true);
            $table->boolean('enable_robots_txt')->default(true);
            $table->text('custom_robots_txt')->nullable();
            $table->boolean('enable_schema_markup')->default(true);

            // Performance & Security
            $table->boolean('enable_hsts')->default(false);
            $table->boolean('enable_csp')->default(false);
            $table->text('csp_policy')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seo_settings');
    }
};
