<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CollectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Collections/Index', [
            'collections' => Collection::withCount('products')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Collections/Create', [
            'products' => Product::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:collections,slug',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $collection = Collection::create($validated);

        if ($request->has('product_ids')) {
            $collection->products()->sync($request->product_ids);
        }

        return redirect()->route('admin.collections.index')->with('success', 'Coleção criada com sucesso.');
    }

    public function edit(Collection $collection)
    {
        return Inertia::render('Admin/Collections/Edit', [
            'collection' => $collection->load('products:id,name'),
            'products' => Product::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, Collection $collection)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:collections,slug,' . $collection->id,
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $collection->update($validated);

        if ($request->has('product_ids')) {
            $collection->products()->sync($request->product_ids);
        }

        return redirect()->route('admin.collections.index')->with('success', 'Coleção atualizada com sucesso.');
    }

    public function destroy(Collection $collection)
    {
        $collection->delete();
        return redirect()->route('admin.collections.index')->with('success', 'Coleção excluída com sucesso.');
    }
}
