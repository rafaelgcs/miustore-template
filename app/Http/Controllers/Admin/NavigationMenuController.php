<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NavigationMenu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class NavigationMenuController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Navigation/Index', [
            'menus' => NavigationMenu::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Navigation/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:link,mega,top_bar',
            'url' => 'nullable|string',
            'content' => 'nullable|array',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        NavigationMenu::create($validated);

        return redirect()->route('admin.navigation.index')->with('success', 'Menu criado com sucesso!');
    }

    public function edit(NavigationMenu $navigation)
    {
        return Inertia::render('Admin/Navigation/Edit', [
            'menu' => $navigation,
        ]);
    }

    public function update(Request $request, NavigationMenu $navigation)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:link,mega,top_bar',
            'url' => 'nullable|string',
            'content' => 'nullable|array',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $navigation->update($validated);

        return redirect()->route('admin.navigation.index')->with('success', 'Menu atualizado com sucesso!');
    }

    public function destroy(NavigationMenu $navigation)
    {
        $navigation->delete();
        return redirect()->route('admin.navigation.index')->with('success', 'Menu excluído com sucesso!');
    }
}
