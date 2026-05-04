<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;
use Barryvdh\DomPDF\Facade\Pdf;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function edit(Product $product)
    {
        $categories = Category::orderBy('name')->get();
        $product->load(['images', 'variants']);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'type' => 'nullable|string|max:255',
            'material' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'available_sizes' => 'nullable|string',
            'available_colors' => 'nullable|string',
            'customization_options' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*.url' => 'required|string',
            'images.*.is_main' => 'boolean',
            'images.*.sort_order' => 'integer',
            'size_guide' => 'nullable|string',
            'variants' => 'nullable|array',
            'variants.*.attributes' => 'required|array',
            'variants.*.price' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.sku' => 'nullable|string|max:255',
        ]);

        $oldStock = $product->stock;
        $newStock = (int)$data['stock'];

        $product->update([
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'slug' => $data['slug'],
            'type' => $data['type'] ?? null,
            'material' => $data['material'] ?? null,
            'sku' => $data['sku'] ?? null,
            'description' => $data['description'] ?? null,
            'price' => $data['price'],
            'stock' => $newStock,
            'image' => $data['image'] ?? null,
            'is_active' => $request->boolean('is_active'),
            'available_sizes' => $this->explodeLines($data['available_sizes'] ?? ''),
            'available_colors' => $this->explodeLines($data['available_colors'] ?? ''),
            'customization_options' => $this->explodeLines($data['customization_options'] ?? ''),
            'meta_title' => $data['meta_title'] ?? null,
            'meta_description' => $data['meta_description'] ?? null,
            'meta_keywords' => $data['meta_keywords'] ?? null,
            'size_guide' => $data['size_guide'] ?? null,
        ]);

        // Sync images
        if ($request->has('images')) {
            $product->images()->delete();
            foreach ($data['images'] as $img) {
                $product->images()->create([
                    'url' => $img['url'],
                    'is_main' => $img['is_main'] ?? false,
                    'sort_order' => $img['sort_order'] ?? 0,
                ]);

                if ($img['is_main']) {
                    $product->update(['image' => $img['url']]);
                }
            }
        }

        // Sync variants
        if ($request->has('variants')) {
            $product->variants()->delete();
            foreach ($data['variants'] as $variant) {
                $product->variants()->create([
                    'attributes' => $variant['attributes'],
                    'price' => $variant['price'] ?? null,
                    'stock' => $variant['stock'] ?? 0,
                    'sku' => $variant['sku'] ?? null,
                ]);
            }
        }

        if ($oldStock !== $newStock) {
            ProductMovement::create([
                'product_id' => $product->id,
                'user_id' => auth()->id(),
                'type' => $newStock > $oldStock ? 'addition' : 'adjustment',
                'quantity' => abs($newStock - $oldStock),
                'old_stock' => $oldStock,
                'new_stock' => $newStock,
                'description' => 'Atualização manual via painel administrativo',
            ]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Produto atualizado com sucesso.');
    }

    public function history(Product $product)
    {
        // Get movements
        $movements = $product->movements()
            ->with('user')
            ->latest()
            ->paginate(20);

        // Get sales movements for the last 30 days
        $salesData = $product->movements()
            ->where('type', 'sale')
            ->where('created_at', '>=', now()->subDays(30))
            ->selectRaw('DATE(created_at) as date, SUM(quantity) as total')
            ->groupBy('date')
            ->pluck('total', 'date');

        // Fill all 30 days to ensure the chart is continuous
        $chartData = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $label = now()->subDays($i)->format('d/m');
            $chartData[] = [
                'name' => $label,
                'vendas' => (int)($salesData[$date] ?? 0),
            ];
        }

        return Inertia::render('Admin/Products/History', [
            'product' => $product,
            'movements' => $movements,
            'chartData' => $chartData,
        ]);
    }

    public function exportHistory(Product $product)
    {
        $movements = $product->movements()->with('user')->latest()->get();
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"historico-{$product->slug}.csv\"",
        ];

        $callback = function() use ($movements) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Data', 'Tipo', 'Quantidade', 'Estoque Antigo', 'Estoque Novo', 'Usuário', 'Descrição']);

            foreach ($movements as $m) {
                fputcsv($file, [
                    $m->id,
                    $m->created_at->format('d/m/Y H:i'),
                    $m->type,
                    $m->quantity,
                    $m->old_stock,
                    $m->new_stock,
                    $m->user ? $m->user->name : 'Sistema',
                    $m->description
                ]);
            }
            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }

    public function exportPdf(Product $product)
    {
        $movements = $product->movements()->with('user')->latest()->get();
        
        $pdf = Pdf::loadView('pdf.product_history', [
            'product' => $product,
            'movements' => $movements
        ]);

        return $pdf->download("historico-{$product->slug}.pdf");
    }

    private function explodeLines(string $value): array
    {
        return array_values(array_filter(array_map('trim', preg_split('/[\r\n,]+/', $value))));
    }
}
