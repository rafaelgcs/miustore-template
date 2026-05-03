<?php

namespace App\Listeners;

use App\Models\CartItem;
use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MergeCartOnLogin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        $user = $event->user;
        $sessionId = session()->getId();

        $guestItems = CartItem::where('session_id', $sessionId)
            ->whereNull('user_id')
            ->get();

        foreach ($guestItems as $guestItem) {
            $userItem = CartItem::where('user_id', $user->id)
                ->where('product_id', $guestItem->product_id)
                ->first();

            if ($userItem) {
                $userItem->increment('quantity', $guestItem->quantity);
                $guestItem->delete();
            } else {
                $guestItem->update([
                    'user_id' => $user->id,
                    'session_id' => null,
                ]);
            }
        }
    }
}
