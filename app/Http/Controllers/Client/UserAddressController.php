<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserAddressController extends Controller
{
    public function index(Request $request)
    {
        $addresses = auth()->user()->addresses()->orderBy('is_default', 'desc')->get();
        
        if ($request->wantsJson()) {
            return response()->json($addresses);
        }

        return \Inertia\Inertia::render('Client/Addresses', [
            'addresses' => $addresses,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cep' => 'required|string|max:9',
            'logradouro' => 'required|string|max:255',
            'numero' => 'required|string|max:20',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'uf' => 'required|string|size:2',
            'is_default' => 'boolean',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            if ($validated['is_default'] ?? false) {
                auth()->user()->addresses()->update(['is_default' => false]);
            }

            // If it's the first address, make it default
            if (auth()->user()->addresses()->count() === 0) {
                $validated['is_default'] = true;
            }

            $address = auth()->user()->addresses()->create($validated);

            if ($request->wantsJson()) {
                return response()->json($address);
            }

            return back()->with('success', 'Endereço cadastrado com sucesso.');
        });
    }

    public function update(Request $request, UserAddress $userAddress)
    {
        $this->authorizeAddress($userAddress);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cep' => 'required|string|max:9',
            'logradouro' => 'required|string|max:255',
            'numero' => 'required|string|max:20',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'uf' => 'required|string|size:2',
            'is_default' => 'boolean',
        ]);

        return DB::transaction(function () use ($validated, $userAddress, $request) {
            if ($validated['is_default'] ?? false) {
                auth()->user()->addresses()->where('id', '!=', $userAddress->id)->update(['is_default' => false]);
            }

            $userAddress->update($validated);

            if ($request->wantsJson()) {
                return response()->json($userAddress);
            }

            return back()->with('success', 'Endereço atualizado com sucesso.');
        });
    }

    public function destroy(UserAddress $userAddress, Request $request)
    {
        $this->authorizeAddress($userAddress);
        $userAddress->delete();

        // If we deleted the default, set another one as default if exists
        if ($userAddress->is_default) {
            $next = auth()->user()->addresses()->first();
            if ($next) {
                $next->update(['is_default' => true]);
            }
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Endereço removido com sucesso.']);
        }

        return back()->with('success', 'Endereço removido com sucesso.');
    }

    public function setDefault(UserAddress $userAddress, Request $request)
    {
        $this->authorizeAddress($userAddress);

        DB::transaction(function () use ($userAddress) {
            auth()->user()->addresses()->update(['is_default' => false]);
            $userAddress->update(['is_default' => true]);
        });

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Endereço definido como padrão.']);
        }

        return back()->with('success', 'Endereço definido como padrão.');
    }

    private function authorizeAddress(UserAddress $userAddress)
    {
        if ($userAddress->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
