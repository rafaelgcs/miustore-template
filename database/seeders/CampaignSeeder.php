<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('slug');
        $products = Product::all()->keyBy('slug');

        Campaign::create([
            'category_id' => $categories['aneis']->id,
            'product_id' => $products['anel-compromisso-diamante']->id,
            'title' => 'Anéis de Compromisso',
            'subtitle' => 'Modelos clássicos e sofisticados para celebrar o momento especial.',
            'image' => '/images/campaigns/campaign-aneis.jpg',
            'link' => '/#colecoes',
            'order' => 1,
            'active' => true,
        ]);

        Campaign::create([
            'category_id' => $categories['brincos']->id,
            'product_id' => $products['brincos-perola']->id,
            'title' => 'Brincos que inspiram',
            'subtitle' => 'Peças delicadas e com acabamento brilhante para todos os estilos.',
            'image' => '/images/campaigns/campaign-brincos.jpg',
            'link' => '/#colecoes',
            'order' => 2,
            'active' => true,
        ]);

        Campaign::create([
            'category_id' => $categories['colares']->id,
            'product_id' => $products['colar-esmeralda']->id,
            'title' => 'Colares de impacto',
            'subtitle' => 'Peças marcantes pensadas para looks elegantes e contemporâneos.',
            'image' => '/images/campaigns/campaign-colares.jpg',
            'link' => '/#colecoes',
            'order' => 3,
            'active' => true,
        ]);
    }
}
