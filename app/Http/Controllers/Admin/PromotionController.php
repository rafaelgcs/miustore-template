<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use App\Models\Product;
use App\Models\Category;
use App\Models\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PromotionController extends Controller
{
    public function index(Request $request)
    {
        $query = Promotion::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Admin/Promotions/Index', [
            'promotions' => $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Promotions/Create', [
            'products' => Product::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
            'collections' => Collection::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:percentage,fixed,buy_x_get_y',
            'value' => 'nullable|numeric|min:0',
            'min_order_amount' => 'nullable|numeric|min:0',
            'min_quantity' => 'nullable|integer|min:0',
            'buy_quantity' => 'nullable|integer|min:0',
            'get_quantity' => 'nullable|integer|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'targets' => 'nullable|array',
            'targets.*.type' => 'required|in:product,category,collection',
            'targets.*.id' => 'required|integer',
        ]);

        DB::transaction(function () use ($validated) {
            $promotion = Promotion::create($validated);

            if (isset($validated['targets'])) {
                foreach ($validated['targets'] as $target) {
                    DB::table('promotion_targets')->insert([
                        'promotion_id' => $promotion->id,
                        'target_type' => $target['type'],
                        'target_id' => $target['id'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        });

        return redirect()->route('admin.promotions.index')->with('success', 'Promoção criada com sucesso.');
    }

    public function edit(Promotion $promotion)
    {
        $targets = DB::table('promotion_targets')
            ->where('promotion_id', $promotion->id)
            ->get(['target_type as type', 'target_id as id']);

        return Inertia::render('Admin/Promotions/Edit', [
            'promotion' => $promotion,
            'currentTargets' => $targets,
            'products' => Product::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
            'collections' => Collection::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Promotion $promotion)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:percentage,fixed,buy_x_get_y',
            'value' => 'nullable|numeric|min:0',
            'min_order_amount' => 'nullable|numeric|min:0',
            'min_quantity' => 'nullable|integer|min:0',
            'buy_quantity' => 'nullable|integer|min:0',
            'get_quantity' => 'nullable|integer|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'targets' => 'nullable|array',
            'targets.*.type' => 'required|in:product,category,collection',
            'targets.*.id' => 'required|integer',
        ]);

        DB::transaction(function () use ($promotion, $validated) {
            $promotion->update($validated);

            DB::table('promotion_targets')->where('promotion_id', $promotion->id)->delete();

            if (isset($validated['targets'])) {
                foreach ($validated['targets'] as $target) {
                    DB::table('promotion_targets')->insert([
                        'promotion_id' => $promotion->id,
                        'target_type' => $target['type'],
                        'target_id' => $target['id'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        });

        return redirect()->route('admin.promotions.index')->with('success', 'Promoção atualizada com sucesso.');
    }

    public function destroy(Promotion $promotion)
    {
        $promotion->delete();
        return redirect()->route('admin.promotions.index')->with('success', 'Promoção excluída com sucesso.');
    }
}
