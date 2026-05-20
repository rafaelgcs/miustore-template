<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeSetting extends Model
{
    protected $fillable = [
        'primary_color',
        'hero_title',
        'hero_subtitle',
        'hero_cta_text',
        'hero_cta_url',
        'hero_secondary_cta_text',
        'hero_secondary_cta_url',
        'features',
        'footer',
    ];

    protected $casts = [
        'features' => 'array',
        'footer' => 'array',
    ];

    public static function current(): self
    {
        return static::first() ?? static::create([
            'hero_title' => 'Joias refinadas para ocasiões inesquecíveis.',
            'hero_subtitle' => 'Descubra peças com acabamento premium, atenção aos detalhes e embalagens especiais para presente.',
            'hero_cta_text' => 'Ver Produtos',
            'hero_cta_url' => '/produtos',
            'hero_secondary_cta_text' => 'Conheça a coleção',
            'hero_secondary_cta_url' => '#colecoes',
            'features' => [
                ['title' => 'Coleções exclusivas', 'subtitle' => 'Peças artesanais com acabamento premium', 'icon' => 'Sparkles'],
                ['title' => 'Designs atemporais', 'subtitle' => 'Alianças, brincos e colares com brilho natural', 'icon' => 'Heart'],
                ['title' => 'Frete rápido', 'subtitle' => 'Entrega nacional em embalagens de presente', 'icon' => 'Truck'],
            ],
            'footer' => static::defaultFooter(),
        ]);
    }

    public static function defaultFooter(): array
    {
        return [
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
        ];
    }
}
