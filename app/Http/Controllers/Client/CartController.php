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
        $addresses = auth()->check() ? auth()->user()->addresses()->orderBy('is_default', 'desc')->get() : [];
        
        return Inertia::render('Client/Cart', [
            'cartItems' => $cartItems,
            'addresses' => $addresses,
        ]);
    }

    public function add(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'integer|min:1',
            'options' => 'nullable|array',
        ]);

        $options = $request->input('options', []);
        $query = CartItem::where('product_id', $product->id);

        if (auth()->check()) {
            $query->where('user_id', auth()->id());
        } else {
            $query->where('session_id', session()->getId());
        }

        // Check for same options
        $cartItem = $query->get()->filter(function($item) use ($options) {
            return $item->options == $options;
        })->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->input('quantity', 1));
        } else {
            CartItem::create([
                'user_id' => auth()->id(),
                'session_id' => auth()->check() ? null : session()->getId(),
                'product_id' => $product->id,
                'quantity' => $request->input('quantity', 1),
                'options' => $options,
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
        $query = CartItem::with(['product.variants', 'product.category']);
        
        if (auth()->check()) {
            $items = $query->where('user_id', auth()->id())->get();
        } else {
            $items = $query->where('session_id', session()->getId())->get();
        }

        return $items->map(function($item) {
            $item->append(['final_price', 'total']);
            return $item;
        });
    }
}
