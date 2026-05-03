<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\CarouselController;
use App\Http\Controllers\Admin\CampaignController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Client\CartController;

Route::get('/', [ShopController::class, 'index'])->name('home');
Route::get('/produtos', [ProductController::class, 'index'])->name('products.index');
Route::get('/produtos/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/favoritos/compartilhado/{user}', [ClientDashboardController::class, 'sharedFavorites'])->name('favorites.shared');

// Cart Routes
Route::get('/carrinho', [CartController::class, 'index'])->name('cart.index');
Route::post('/carrinho/adicionar/{product:id}', [CartController::class, 'add'])->name('cart.add');
Route::patch('/carrinho/atualizar/{cartItem}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/carrinho/remover/{cartItem}', [CartController::class, 'remove'])->name('cart.remove');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        if (auth()->user()->is_admin) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('client.dashboard');
    })->name('dashboard');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::resource('products', AdminProductController::class)->only(['index', 'edit', 'update']);
        Route::resource('carousel', CarouselController::class)->except(['show']);
        Route::resource('campaigns', CampaignController::class)->except(['show']);
    });

    // Client Routes
    Route::prefix('client')->name('client.')->group(function () {
        Route::get('/dashboard', [ClientDashboardController::class, 'index'])->name('dashboard');
        Route::get('/orders', [ClientDashboardController::class, 'orders'])->name('orders');
        Route::get('/favorites', [ClientDashboardController::class, 'favorites'])->name('favorites');
        Route::post('/favorites/{product:id}', [ClientDashboardController::class, 'toggleFavorite'])->name('favorites.toggle');
        Route::get('/cart', function() { return redirect()->route('cart.index'); })->name('cart');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
