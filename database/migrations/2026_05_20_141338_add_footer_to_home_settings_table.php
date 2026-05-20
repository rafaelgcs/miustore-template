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
        Schema::table('home_settings', function (Blueprint $table) {
            $table->json('footer')->nullable();
        });

        // Seed default footer data for the existing settings row
        $first = \DB::table('home_settings')->first();
        if ($first) {
            \DB::table('home_settings')->where('id', $first->id)->update([
                'footer' => json_encode([
                    'brand_name' => 'Miu Store',
                    'brand_description' => 'Joias exclusivas e produtos de bem-estar selecionados para elevar sua autoestima e proporcionar momentos de puro luxo.',
                    'social_instagram' => '#',
                    'social_facebook' => '#',
                    'social_twitter' => '#',
                    'cnpj' => 'CNPJ: 00.000.000/0001-00',
                    'payment_methods' => ['credit_card', 'shield', 'truck'],
                    'contact_phone' => '(11) 99999-9999',
                    'contact_hours' => 'Seg. a Sex. das 09h às 18h',
                    'contact_email' => 'contato@miustore.com.br',
                    'contact_address' => "Rua das Joias, 123 - Jardins\nSão Paulo, SP",
                    'columns' => [
                        [
                            'title' => 'Categorias',
                            'links' => [
                                ['name' => 'Joias em Ouro', 'href' => '/produtos'],
                                ['name' => 'Prata 925', 'href' => '/produtos'],
                                ['name' => 'Bem-estar', 'href' => '/produtos'],
                                ['name' => 'Coleções Especiais', 'href' => '/produtos'],
                            ]
                        ],
                        [
                            'title' => 'Institucional',
                            'links' => [
                                ['name' => 'Sobre a Miu Store', 'href' => '#'],
                                ['name' => 'Política de Trocas', 'href' => '#'],
                                ['name' => 'Envio e Entrega', 'href' => '#'],
                                ['name' => 'Contato', 'href' => '#'],
                            ]
                        ]
                    ]
                ])
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('home_settings', function (Blueprint $table) {
            $table->dropColumn('footer');
        });
    }
};
