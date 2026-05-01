<?php

namespace Database\Seeders;

use App\Models\CarouselItem;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarouselSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::take(3)->get();

        CarouselItem::create([
            'title' => 'Coleção Essencial',
            'subtitle' => 'Descubra peças elegantes com design atemporal.',
            'button_text' => 'Ver coleção',
            'button_url' => '/#destaques',
            'product_id' => $products->get(0)?->id,
            'image' => '/images/banner/banner-1.jpg',
            'order' => 1,
            'active' => true,
        ]);

        CarouselItem::create([
            'title' => 'Brilho para ocasiões especiais',
            'subtitle' => 'Alianças, brincos e colares com acabamento premium.',
            'button_text' => 'Explore agora',
            'button_url' => '/#colecoes',
            'product_id' => $products->get(1)?->id,
            'image' => '/images/banner/banner-2.jpg',
            'order' => 2,
            'active' => true,
        ]);

        CarouselItem::create([
            'title' => 'Presentes que encantam',
            'subtitle' => 'Embalagens premium e atendimento personalizado.',
            'button_text' => 'Confira os lançamentos',
            'button_url' => '/#novidades',
            'product_id' => $products->get(2)?->id,
            'image' => '/images/banner/banner-3.jpg',
            'order' => 3,
            'active' => true,
        ]);
    }
}
