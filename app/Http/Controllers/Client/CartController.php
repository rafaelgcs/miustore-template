<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = $this->getCartItems();
        return Inertia::render('Client/Cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function add(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'integer|min:1',
            'options' => 'nullable|array',
        ]);

        $query = CartItem::where('product_id', $product->id);

        if (auth()->check()) {
            $query->where('user_id', auth()->id());
        } else {
            $query->where('session_id', session()->getId());
        }

        $cartItem = $query->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->input('quantity', 1));
        } else {
            CartItem::create([
                'user_id' => auth()->id(),
                'session_id' => auth()->check() ? null : session()->getId(),
                'product_id' => $product->id,
                'quantity' => $request->input('quantity', 1),
                'options' => $request->input('options'),
            ]);
        }

        return back()->with('success', 'Produto adicionado ao carrinho!');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Security check
        if (auth()->check()) {
            if ($cartItem->user_id !== auth()->id()) {
                abort(403);
            }
        } else {
            if ($cartItem->session_id !== session()->getId()) {
                abort(403);
            }
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Carrinho atualizado!');
    }

    public function remove(CartItem $cartItem)
    {
        // Security check
        if (auth()->check()) {
            if ($cartItem->user_id !== auth()->id()) {
                abort(403);
            }
        } else {
            if ($cartItem->session_id !== session()->getId()) {
                abort(403);
            }
        }

        $cartItem->delete();

        return back()->with('success', 'Produto removido do carrinho!');
    }

    private function getCartItems()
    {
        if (auth()->check()) {
            return CartItem::where('user_id', auth()->id())->with('product')->get();
        }
        return CartItem::where('session_id', session()->getId())->with('product')->get();
    }
}
