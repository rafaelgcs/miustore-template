<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_user_management(): void
    {
        $response = $this->get(route('admin.users.index'));
        $response->assertRedirect('/login');
    }

    public function test_client_cannot_access_user_management(): void
    {
        $client = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($client)
            ->get(route('admin.users.index'));

        $response->assertForbidden();
    }

    public function test_admin_can_access_user_management(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)
            ->get(route('admin.users.index'));

        $response->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Users/Index'));
    }

    public function test_admin_can_filter_users(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $client1 = User::factory()->create(['name' => 'Alice Jones', 'is_admin' => false]);
        $client2 = User::factory()->create(['name' => 'Bob Smith', 'is_admin' => false]);

        // Search test
        $response = $this->actingAs($admin)
            ->get(route('admin.users.index', ['search' => 'Alice']));

        $response->assertOk()
            ->assertInertia(function ($page) {
                $users = $page->toArray()['props']['users']['data'];
                $this->assertCount(1, $users);
                $this->assertEquals('Alice Jones', $users[0]['name']);
            });

        // Role test
        $response = $this->actingAs($admin)
            ->get(route('admin.users.index', ['role' => 'admin']));

        $response->assertOk()
            ->assertInertia(function ($page) {
                $users = $page->toArray()['props']['users']['data'];
                // Only the admin is returned
                $this->assertCount(1, $users);
                $this->assertTrue((bool) $users[0]['is_admin']);
            });
    }

    public function test_admin_can_toggle_user_role(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $client = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($admin)
            ->patch(route('admin.users.toggle-role', $client));

        $response->assertRedirect();
        $this->assertTrue((bool) $client->fresh()->is_admin);

        // Toggle back to client
        $response = $this->actingAs($admin)
            ->patch(route('admin.users.toggle-role', $client));

        $response->assertRedirect();
        $this->assertFalse((bool) $client->fresh()->is_admin);
    }

    public function test_admin_cannot_demote_themselves(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)
            ->patch(route('admin.users.toggle-role', $admin));

        $response->assertRedirect()
            ->assertSessionHas('error', 'Você não pode alterar seu próprio perfil de administrador.');
        
        $this->assertTrue((bool) $admin->fresh()->is_admin);
    }

    public function test_admin_can_delete_user_without_orders(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $client = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($admin)
            ->delete(route('admin.users.destroy', $client));

        $response->assertRedirect()
            ->assertSessionHas('success', 'Usuário excluído com sucesso.');
            
        $this->assertNull($client->fresh());
    }

    public function test_admin_cannot_delete_user_with_orders(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $client = User::factory()->create(['is_admin' => false]);

        // Create an order associated with the client
        Order::create([
            'user_id' => $client->id,
            'status' => 'pending',
            'subtotal' => 100.00,
            'shipping_amount' => 10.00,
            'total_amount' => 110.00,
        ]);

        $response = $this->actingAs($admin)
            ->delete(route('admin.users.destroy', $client));

        $response->assertRedirect()
            ->assertSessionHas('error', 'Não é possível excluir o usuário porque ele possui histórico de pedidos.');
            
        $this->assertNotNull($client->fresh());
    }

    public function test_admin_cannot_delete_themselves(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)
            ->delete(route('admin.users.destroy', $admin));

        $response->assertRedirect()
            ->assertSessionHas('error', 'Você não pode excluir sua própria conta.');

        $this->assertNotNull($admin->fresh());
    }
}
