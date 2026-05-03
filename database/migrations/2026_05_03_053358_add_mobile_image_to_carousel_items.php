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
        Schema::table('carousel_items', function (Blueprint $table) {
            $table->string('mobile_image')->nullable()->after('image');
            $table->string('text_color')->default('white')->after('mobile_image');
            $table->decimal('overlay_opacity', 3, 2)->default(0.3)->after('text_color');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carousel_items', function (Blueprint $table) {
            $table->dropColumn(['mobile_image', 'text_color', 'overlay_opacity']);
        });
    }
};
