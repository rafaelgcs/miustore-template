<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarouselItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarouselController extends Controller
{
    public function index()
    {
        $items = CarouselItem::orderBy('order')->get();

        return Inertia::render('Admin/Carousel/Index', [
            'carouselItems' => $items,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Carousel/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|string|max:255',
            'mobile_image' => 'nullable|string|max:255',
            'text_color' => 'nullable|string|max:20',
            'overlay_opacity' => 'nullable|numeric|min:0|max:1',
            'order' => 'nullable|integer',
            'active' => 'boolean',
            'only_image' => 'boolean',
        ]);

        CarouselItem::create($request->only(['title', 'subtitle', 'button_text', 'button_url', 'product_id', 'image', 'mobile_image', 'text_color', 'overlay_opacity', 'order', 'active', 'only_image']));

        return redirect()->route('admin.carousel.index');
    }

    public function edit(CarouselItem $carousel)
    {
        return Inertia::render('Admin/Carousel/Edit', [
            'carouselItem' => $carousel,
        ]);
    }

    public function update(Request $request, CarouselItem $carousel)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|string|max:255',
            'mobile_image' => 'nullable|string|max:255',
            'text_color' => 'nullable|string|max:20',
            'overlay_opacity' => 'nullable|numeric|min:0|max:1',
            'order' => 'nullable|integer',
            'active' => 'boolean',
            'only_image' => 'boolean',
        ]);

        $carousel->update($request->only(['title', 'subtitle', 'button_text', 'button_url', 'product_id', 'image', 'mobile_image', 'text_color', 'overlay_opacity', 'order', 'active', 'only_image']));

        return redirect()->route('admin.carousel.index');
    }

    public function destroy(CarouselItem $carousel)
    {
        $carousel->delete();

        return redirect()->route('admin.carousel.index');
    }
}
