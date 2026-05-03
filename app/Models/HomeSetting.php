<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeSetting extends Model
{
    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_cta_text',
        'hero_cta_url',
        'hero_secondary_cta_text',
        'hero_secondary_cta_url',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
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
        ]);
    }
}
