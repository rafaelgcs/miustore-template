<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items.product']);

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search by order ID or customer email
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('email', 'like', "%{$search}%")
                            ->orWhere('name', 'like', "%{$search}%");
                    });
            });
        }

        // Sort
        $sortBy = $request->get('sort', 'id');
        $sortDirection = $request->get('direction', 'desc');

        if (in_array($sortBy, ['id', 'status', 'total_amount', 'created_at'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $orders = $query->paginate(15)->appends($request->query());

        // Get unread notifications count
        $unreadNotifications = Notification::where('user_id', auth()->id())
            ->where('read', false)
            ->count();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'search', 'sort', 'direction']),
            'unreadNotifications' => $unreadNotifications,
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        $order->load(['user', 'items.product', 'notifications', 'address']);

        // Get unread notifications count
        $unreadNotifications = Notification::where('user_id', auth()->id())
            ->where('read', false)
            ->count();

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
            'unreadNotifications' => $unreadNotifications,
        ]);
    }

    /**
     * Update the status of an order.
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $oldStatus = $order->status;
        $order->update($validated);

        // Create notification
        $statusMessages = [
            'pending' => 'Seu pedido foi recebido e está em análise.',
            'processing' => 'Seu pedido está sendo processado.',
            'shipped' => 'Seu pedido foi enviado!',
            'delivered' => 'Seu pedido foi entregue!',
            'cancelled' => 'Seu pedido foi cancelado.',
        ];

        Notification::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'type' => 'order_' . $validated['status'],
            'title' => 'Pedido #' . $order->id . ' - ' . ucfirst($validated['status']),
            'message' => $statusMessages[$validated['status']],
        ]);

        return redirect()->route('admin.orders.show', $order)->with('success', 'Status do pedido atualizado com sucesso.');
    }

    /**
     * Get admin notifications.
     */
    public function notifications()
    {
        $notifications = Notification::where('user_id', auth()->id())
            ->with('order')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Notifications', [
            'notifications' => $notifications,
        ]);
    }

    /**
     * Mark notification as read.
     */
    public function markNotificationAsRead(Notification $notification)
    {
        if ($notification->user_id === auth()->id()) {
            $notification->markAsRead();
        }

        return back();
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllNotificationsAsRead()
    {
        Notification::where('user_id', auth()->id())
            ->where('read', false)
            ->update(['read' => true, 'read_at' => now()]);

        return back();
    }

    /**
     * Get unread notifications count (for header).
     */
    public function getUnreadCount()
    {
        $count = Notification::where('user_id', auth()->id())
            ->where('read', false)
            ->count();

        return response()->json(['unread_count' => $count]);
    }
}

