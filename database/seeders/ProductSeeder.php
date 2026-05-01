<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        $products = [
            // Anéis
            [
                'category_id' => $categories->where('slug', 'aneis')->first()->id,
                'name' => 'Anel de Compromisso Diamante',
                'slug' => 'anel-compromisso-diamante',
                'description' => 'Anel de compromisso com diamante central de 1.5ct, corte brilhante, em ouro 18k branco. Acompanha certificado de autenticidade.',
                'price' => 8500.00,
                'stock' => 5,
                'image' => '/images/products/anel-diamante.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'aneis')->first()->id,
                'name' => 'Aliança Ouro 18k',
                'slug' => 'alianca-ouro-18k',
                'description' => 'Aliança clássica em ouro 18k amarelo, design elegante e atemporal. Largura de 4mm.',
                'price' => 1200.00,
                'stock' => 15,
                'image' => '/images/products/alianca-ouro.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'aneis')->first()->id,
                'name' => 'Anel Solitário Rubi',
                'slug' => 'anel-solitario-rubi',
                'description' => 'Anel solitário com rubi natural de 2ct, engastado em ouro rosa 18k. Peça única e sofisticada.',
                'price' => 3200.00,
                'stock' => 3,
                'image' => '/images/products/anel-rubi.jpg',
                'is_active' => true,
            ],

            // Brincos
            [
                'category_id' => $categories->where('slug', 'brincos')->first()->id,
                'name' => 'Brincos Argola Ouro',
                'slug' => 'brincos-argola-ouro',
                'description' => 'Brincos argola em ouro 18k amarelo, design minimalista e elegante. Diâmetro de 15mm.',
                'price' => 450.00,
                'stock' => 20,
                'image' => '/images/products/brincos-argola.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'brincos')->first()->id,
                'name' => 'Brincos Pérola',
                'slug' => 'brincos-perola',
                'description' => 'Brincos com pérolas naturais cultivadas, engastadas em prata 925. Conjunto de 2 unidades.',
                'price' => 280.00,
                'stock' => 12,
                'image' => '/images/products/brincos-perola.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'brincos')->first()->id,
                'name' => 'Brincos Zircônia',
                'slug' => 'brincos-zirconia',
                'description' => 'Brincos com zircônias cúbicas, brilho intenso similar ao diamante. Em prata folheada a ouro.',
                'price' => 180.00,
                'stock' => 25,
                'image' => '/images/products/brincos-zirconia.jpg',
                'is_active' => true,
            ],

            // Colares
            [
                'category_id' => $categories->where('slug', 'colares')->first()->id,
                'name' => 'Colar Corrente Delgada',
                'slug' => 'colar-corrente-delgada',
                'description' => 'Colar corrente delicada em ouro 18k amarelo, comprimento ajustável de 40-45cm.',
                'price' => 380.00,
                'stock' => 18,
                'image' => '/images/products/colar-corrente.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'colares')->first()->id,
                'name' => 'Colar Pingente Coração',
                'slug' => 'colar-pingente-coracao',
                'description' => 'Colar com pingente coração em ouro 18k, cravejado com pequenos brilhantes. Comprimento 45cm.',
                'price' => 520.00,
                'stock' => 10,
                'image' => '/images/products/colar-coracao.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'colares')->first()->id,
                'name' => 'Colar Esmeralda',
                'slug' => 'colar-esmeralda',
                'description' => 'Colar com esmeralda colombiana de 3ct, engastada em ouro branco 18k. Peça sofisticada.',
                'price' => 4500.00,
                'stock' => 2,
                'image' => '/images/products/colar-esmeralda.jpg',
                'is_active' => true,
            ],

            // Pulseiras
            [
                'category_id' => $categories->where('slug', 'pulseiras')->first()->id,
                'name' => 'Pulseira Tennis',
                'slug' => 'pulseira-tennis',
                'description' => 'Pulseira tennis com diamantes, total de 5ct em ouro branco 18k. Design esportivo e elegante.',
                'price' => 12500.00,
                'stock' => 3,
                'image' => '/images/products/pulseira-tennis.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'pulseiras')->first()->id,
                'name' => 'Pulseira Corrente',
                'slug' => 'pulseira-corrente',
                'description' => 'Pulseira corrente grossa em ouro 18k amarelo, design robusto e masculino.',
                'price' => 890.00,
                'stock' => 8,
                'image' => '/images/products/pulseira-corrente.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'pulseiras')->first()->id,
                'name' => 'Pulseira Prata',
                'slug' => 'pulseira-prata',
                'description' => 'Pulseira artesanal em prata 925, com detalhes em banho de ouro. Comprimento ajustável.',
                'price' => 150.00,
                'stock' => 30,
                'image' => '/images/products/pulseira-prata.jpg',
                'is_active' => true,
            ],

            // Pingentes
            [
                'category_id' => $categories->where('slug', 'pingentes')->first()->id,
                'name' => 'Pingente Cruz',
                'slug' => 'pingente-cruz',
                'description' => 'Pingente cruz em ouro 18k, design delicado com detalhes em brilhantes.',
                'price' => 320.00,
                'stock' => 15,
                'image' => '/images/products/pingente-cruz.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'pingentes')->first()->id,
                'name' => 'Pingente Árvore da Vida',
                'slug' => 'pingente-arvore-vida',
                'description' => 'Pingente árvore da vida em prata 925, símbolo de renovação e crescimento.',
                'price' => 180.00,
                'stock' => 22,
                'image' => '/images/products/pingente-arvore.jpg',
                'is_active' => true,
            ],
            [
                'category_id' => $categories->where('slug', 'pingentes')->first()->id,
                'name' => 'Pingente Inicial Personalizado',
                'slug' => 'pingente-inicial-personalizado',
                'description' => 'Pingente com inicial personalizada em ouro 18k, disponível em todas as letras do alfabeto.',
                'price' => 250.00,
                'stock' => 50,
                'image' => '/images/products/pingente-inicial.jpg',
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}