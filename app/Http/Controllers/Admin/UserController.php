<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index(Request $request)
    {
        $query = User::withCount('orders');

        // Search by name or email
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->filled('role')) {
            $role = $request->role;
            if ($role === 'admin') {
                $query->where('is_admin', true);
            } elseif ($role === 'client') {
                $query->where('is_admin', false);
            }
        }

        // Sorting
        $sortBy = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');

        if (in_array($sortBy, ['name', 'email', 'is_admin', 'created_at', 'orders_count'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        // Pagination
        $perPage = $request->integer('per_page', 15);
        if (!in_array($perPage, [10, 20, 50, 100])) {
            $perPage = 15;
        }

        $users = $query->paginate($perPage)->appends($request->query());

        // Get unread notifications count for layout
        $unreadNotifications = Notification::where('user_id', auth()->id())
            ->where('read', false)
            ->count();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => (object) $request->only(['search', 'role', 'sort', 'direction', 'per_page']),
            'unreadNotifications' => $unreadNotifications,
        ]);
    }

    /**
     * Toggle role of a user between admin and client.
     */
    public function toggleRole(User $user)
    {
        // Safety guard: cannot toggle own role
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Você não pode alterar seu próprio perfil de administrador.');
        }

        $user->update([
            'is_admin' => !$user->is_admin,
        ]);

        $roleName = $user->is_admin ? 'Administrador' : 'Cliente';

        return back()->with('success', "Perfil de {$user->name} alterado para {$roleName} com sucesso.");
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        // Safety guard: cannot delete own account
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Você não pode excluir sua própria conta.');
        }

        // If the user has orders, we might want to cascade or reject.
        // Let's check if the user has completed or active orders.
        if ($user->orders()->count() > 0) {
            // Option A: soft delete or reject deletion to maintain financial history.
            // In typical e-commerce, deleting a user with orders requires caution.
            // Let's allow deletion but delete/clean up or simply prevent to avoid integrity issues,
            // or let the DB cascade handle it if configured.
            // To be safe, let's notify the admin and prevent deletion of users with order history,
            // or we could delete orders. Preventing is much safer for accounting.
            return back()->with('error', 'Não é possível excluir o usuário porque ele possui histórico de pedidos.');
        }

        $user->delete();

        return back()->with('success', 'Usuário excluído com sucesso.');
    }
}
