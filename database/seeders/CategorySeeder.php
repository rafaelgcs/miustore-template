<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Anéis',
                'slug' => 'aneis',
                'description' => 'Anéis de compromisso, alianças e anéis de noivado'
            ],
            [
                'name' => 'Brincos',
                'slug' => 'brincos',
                'description' => 'Brincos em ouro, prata e com pedras preciosas'
            ],
            [
                'name' => 'Colares',
                'slug' => 'colares',
                'description' => 'Colares delicados e correntes elegantes'
            ],
            [
                'name' => 'Pulseiras',
                'slug' => 'pulseiras',
                'description' => 'Pulseiras finas e braceletes sofisticados'
            ],
            [
                'name' => 'Pingentes',
                'slug' => 'pingentes',
                'description' => 'Pingentes e medalhões personalizados'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}