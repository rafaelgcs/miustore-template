<?php

namespace App\Http\Middleware;

use App\Models\SeoSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $cartCount = 0;
        $unreadNotificationsCount = 0;
        if (auth()->check()) {
            $cartCount = \App\Models\CartItem::where('user_id', auth()->id())->sum('quantity');
            $unreadNotificationsCount = \App\Models\Notification::where('user_id', auth()->id())
                ->where('read', false)
                ->count();
        } else {
            $cartCount = \App\Models\CartItem::where('session_id', session()->getId())->sum('quantity');
        }

        $seoSetting = SeoSetting::current();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cart' => [
                'count' => $cartCount,
            ],
            'notifications' => [
                'unread_count' => $unreadNotificationsCount,
            ],
            'seo' => [
                'site_title' => $seoSetting?->site_title,
                'meta_description' => $seoSetting?->meta_description,
                'meta_keywords' => $seoSetting?->meta_keywords,
                'meta_image' => $seoSetting?->meta_image,
                'google_site_verification' => $seoSetting?->google_site_verification,
                'google_analytics_id' => $seoSetting?->google_analytics_id,
                'google_tag_manager_id' => $seoSetting?->google_tag_manager_id,
                'google_adsense_client' => $seoSetting?->google_adsense_client,
                'robots' => $seoSetting?->robots,
            ],
            'navigation_menus' => \App\Models\NavigationMenu::where('is_active', true)
                ->orderBy('order')
                ->get(),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
