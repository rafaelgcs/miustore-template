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
        Schema::table('products', function (Blueprint $table) {
            $table->string('type')->nullable()->after('slug');
            $table->string('material')->nullable()->after('type');
            $table->json('available_sizes')->nullable()->after('stock');
            $table->json('available_colors')->nullable()->after('available_sizes');
            $table->json('customization_options')->nullable()->after('available_colors');
            $table->string('sku')->nullable()->after('material');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['type', 'material', 'sku', 'available_sizes', 'available_colors', 'customization_options']);
        });
    }
};
