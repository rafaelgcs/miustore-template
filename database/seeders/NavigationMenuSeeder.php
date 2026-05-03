<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NavigationMenu;

class NavigationMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'name' => 'Produtos',
                'slug' => 'produtos',
                'type' => 'link',
                'url' => 'products.index',
                'order' => 1,
            ],
            [
                'name' => 'Casamento',
                'slug' => 'casamento',
                'type' => 'mega',
                'content' => [
                    'columns' => [
                        [
                            'title' => 'NOIVADO',
                            'links' => [
                                ['name' => 'Solitário', 'href' => '#'],
                                ['name' => 'Meia aliança', 'href' => '#'],
                                ['name' => 'Aliança inteira de diamante', 'href' => '#'],
                                ['name' => 'Diamante de Laboratório', 'href' => '#'],
                            ],
                            'footer' => ['name' => 'Ver todas', 'href' => '#']
                        ],
                        [
                            'title' => 'ALIANÇAS',
                            'links' => [
                                ['name' => 'Alianças em prata', 'href' => '#'],
                                ['name' => 'Alianças em ouro', 'href' => '#'],
                                ['name' => 'Alianças com diamante', 'href' => '#'],
                            ],
                            'footer' => ['name' => 'Ver todas', 'href' => '#']
                        ],
                        [
                            'title' => 'O DIA DO CASAMENTO',
                            'links' => [
                                ['name' => 'Para noiva', 'href' => '#'],
                                ['name' => 'Para noivo', 'href' => '#'],
                            ]
                        ],
                        [
                            'title' => 'BENEFÍCIOS',
                            'links' => [
                                ['name' => 'Upgrades de anéis', 'href' => '#'],
                            ]
                        ]
                    ],
                    'featured' => [
                        'image' => '/home/rafaelgcs/.gemini/antigravity/brain/64640301-017b-4f75-9b75-1299fb95544e/mega_menu_wedding_rings_1777792343151.png',
                        'title' => 'ANÉIS DE NOIVADO',
                        'description' => 'Eternize o seu amor com uma joia marcante e repleta de significado.'
                    ]
                ],
                'order' => 2,
            ],
            [
                'name' => 'Coleções',
                'slug' => 'colecoes',
                'type' => 'link',
                'url' => '#colecoes',
                'order' => 3,
            ],
            [
                'name' => 'Destaques',
                'slug' => 'destaques',
                'type' => 'link',
                'url' => '#destaques',
                'order' => 4,
            ],
            [
                'name' => 'Contato',
                'slug' => 'contato',
                'type' => 'link',
                'url' => '#contato',
                'order' => 5,
            ],
        ];

        foreach ($menus as $menu) {
            NavigationMenu::updateOrCreate(['slug' => $menu['slug']], $menu);
        }
    }
}
