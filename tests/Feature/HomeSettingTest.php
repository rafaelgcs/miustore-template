<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\HomeSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomeSettingTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_home_settings(): void
    {
        $response = $this->get(route('admin.home-settings.edit'));
        $response->assertRedirect(route('login'));
    }

    public function test_non_admin_cannot_access_home_settings(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($user)->get(route('admin.home-settings.edit'));
        $response->assertStatus(403);
    }

    public function test_admin_can_access_edit_home_settings_page(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->get(route('admin.home-settings.edit'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/HomeSettings/Edit'));
    }

    public function test_admin_can_update_home_settings_with_footer(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $footerData = [
            'brand_name' => 'Custom Miu Store',
            'brand_description' => 'Custom description',
            'social_instagram' => 'https://instagram.com/custom',
            'social_facebook' => 'https://facebook.com/custom',
            'social_twitter' => 'https://twitter.com/custom',
            'cnpj' => 'CNPJ: 11.111.111/0001-11',
            'payment_methods' => ['credit_card', 'shield'],
            'contact_phone' => '11988888888',
            'contact_hours' => '9h - 18h',
            'contact_email' => 'custom@miu.com',
            'contact_address' => 'Custom Address',
            'columns' => [
                [
                    'title' => 'Custom Col 1',
                    'links' => [
                        ['name' => 'Link A', 'href' => '/a'],
                        ['name' => 'Link B', 'href' => '/b'],
                    ]
                ],
                [
                    'title' => 'Custom Col 2',
                    'links' => [
                        ['name' => 'Link C', 'href' => '/c'],
                    ]
                ],
            ]
        ];

        $payload = [
            'primary_color' => 'gold',
            'hero_title' => 'New Hero Title',
            'hero_subtitle' => 'New Hero Subtitle',
            'hero_cta_text' => 'New CTA',
            'hero_cta_url' => '/new-cta',
            'hero_secondary_cta_text' => 'New Secondary CTA',
            'hero_secondary_cta_url' => '/new-secondary-cta',
            'features' => [
                ['title' => 'F1', 'subtitle' => 'S1', 'icon' => 'Sparkles'],
                ['title' => 'F2', 'subtitle' => 'S2', 'icon' => 'Heart'],
                ['title' => 'F3', 'subtitle' => 'S3', 'icon' => 'Truck'],
            ],
            'footer' => $footerData
        ];

        $response = $this->actingAs($admin)->put(route('admin.home-settings.update'), $payload);

        $response->assertRedirect();
        $response->assertSessionHasNoErrors();

        $settings = HomeSetting::current();
        $this->assertEquals('Custom Miu Store', $settings->footer['brand_name']);
        $this->assertEquals('Custom Col 1', $settings->footer['columns'][0]['title']);
        $this->assertEquals('Link A', $settings->footer['columns'][0]['links'][0]['name']);
    }

    public function test_admin_cannot_update_home_settings_with_invalid_footer(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $footerData = [
            'brand_description' => 'Custom description',
        ];

        $payload = [
            'primary_color' => 'gold',
            'hero_title' => 'New Hero Title',
            'hero_subtitle' => 'New Hero Subtitle',
            'hero_cta_text' => 'New CTA',
            'hero_cta_url' => '/new-cta',
            'hero_secondary_cta_text' => 'New Secondary CTA',
            'hero_secondary_cta_url' => '/new-secondary-cta',
            'features' => [
                ['title' => 'F1', 'subtitle' => 'S1', 'icon' => 'Sparkles'],
                ['title' => 'F2', 'subtitle' => 'S2', 'icon' => 'Heart'],
                ['title' => 'F3', 'subtitle' => 'S3', 'icon' => 'Truck'],
            ],
            'footer' => $footerData
        ];

        $response = $this->actingAs($admin)->put(route('admin.home-settings.update'), $payload);

        $response->assertSessionHasErrors([
            'footer.brand_name',
            'footer.columns',
        ]);
    }
}
