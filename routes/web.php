<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\CarouselController;
use App\Http\Controllers\Admin\CampaignController;
use App\Http\Controllers\Admin\SeoSettingController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\NavigationMenuController;
use App\Http\Controllers\Admin\HomeSettingController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\PromotionController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\ProductReviewController;
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

// Shipping & Reviews
Route::post('/shipping/calculate', [ShippingController::class, 'calculate'])->name('shipping.calculate');
Route::post('/products/{product}/reviews', [ProductReviewController::class, 'store'])->name('products.reviews.store');

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
        Route::resource('products', AdminProductController::class)->except(['show']);
        Route::get('/products/{product}/history', [AdminProductController::class, 'history'])->name('products.history');
        Route::get('/products/{product}/history/export', [AdminProductController::class, 'exportHistory'])->name('products.history.export');
        Route::get('/products/{product}/history/pdf', [AdminProductController::class, 'exportPdf'])->name('products.history.pdf');
        Route::resource('carousel', CarouselController::class)->except(['show']);
        Route::resource('campaigns', CampaignController::class)->except(['show']);
        Route::resource('categories', CategoryController::class)->except(['show']);
        Route::resource('collections', CollectionController::class)->except(['show']);
        Route::resource('promotions', PromotionController::class)->except(['show']);
        Route::resource('coupons', CouponController::class)->except(['show']);
        Route::resource('orders', OrderController::class)->only(['index', 'show']);
        Route::put('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
        Route::get('/notifications', [OrderController::class, 'notifications'])->name('notifications');
        Route::post('/notifications/{notification}/read', [OrderController::class, 'markNotificationAsRead'])->name('notifications.markAsRead');
        Route::post('/notifications/mark-all-read', [OrderController::class, 'markAllNotificationsAsRead'])->name('notifications.markAllAsRead');
        Route::get('/notifications/unread-count', [OrderController::class, 'getUnreadCount'])->name('notifications.unreadCount');
        Route::get('/seo', [SeoSettingController::class, 'index'])->name('seo.index');
        Route::put('/seo', [SeoSettingController::class, 'update'])->name('seo.update');
        Route::get('/home-settings', [HomeSettingController::class, 'edit'])->name('home-settings.edit');
        Route::put('/home-settings', [HomeSettingController::class, 'update'])->name('home-settings.update');
        Route::resource('navigation', NavigationMenuController::class)->except(['show']);

        // Media Library
        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
        Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
        Route::post('/media/folders', [MediaController::class, 'storeFolder'])->name('media.folders.store');
        Route::put('/media/{media}', [MediaController::class, 'update'])->name('media.update');
        Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
        Route::delete('/media/folders/{folder}', [MediaController::class, 'destroyFolder'])->name('media.folders.destroy');
    });

    // Client Routes
    Route::prefix('client')->name('client.')->group(function () {
        Route::get('/dashboard', [ClientDashboardController::class, 'index'])->name('dashboard');
        Route::get('/orders', [ClientDashboardController::class, 'orders'])->name('orders');
        Route::post('/orders', [\App\Http\Controllers\Client\OrderController::class, 'store'])->name('orders.store');
        Route::get('/orders/success/{order}', [\App\Http\Controllers\Client\OrderController::class, 'success'])->name('orders.success');
        Route::get('/favorites', [ClientDashboardController::class, 'favorites'])->name('favorites');
        Route::post('/favorites/{product:id}', [ClientDashboardController::class, 'toggleFavorite'])->name('favorites.toggle');
        Route::get('/cart', function() { return redirect()->route('cart.index'); })->name('cart');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
