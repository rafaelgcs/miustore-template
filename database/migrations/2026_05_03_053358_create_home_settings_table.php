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
        Schema::create('home_settings', function (Blueprint $table) {
            $table->id();
            
            // Hero Fallback
            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
            $table->string('hero_cta_text')->nullable();
            $table->string('hero_cta_url')->nullable();
            $table->string('hero_secondary_cta_text')->nullable();
            $table->string('hero_secondary_cta_url')->nullable();
            
            // Feature Cards
            $table->json('features')->nullable(); // Store array of {title, subtitle, icon}
            
            $table->timestamps();
        });

        // Insert default data
        \DB::table('home_settings')->insert([
            'hero_title' => 'Joias refinadas para ocasiões inesquecíveis.',
            'hero_subtitle' => 'Descubra peças com acabamento premium, atenção aos detalhes e embalagens especiais para presente.',
            'hero_cta_text' => 'Ver Produtos',
            'hero_cta_url' => '/produtos',
            'hero_secondary_cta_text' => 'Conheça a coleção',
            'hero_secondary_cta_url' => '#colecoes',
            'features' => json_encode([
                ['title' => 'Coleções exclusivas', 'subtitle' => 'Peças artesanais com acabamento premium', 'icon' => 'Sparkles'],
                ['title' => 'Designs atemporais', 'subtitle' => 'Alianças, brincos e colares com brilho natural', 'icon' => 'Heart'],
                ['title' => 'Frete rápido', 'subtitle' => 'Entrega nacional em embalagens de presente', 'icon' => 'Truck'],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_settings');
    }
};
