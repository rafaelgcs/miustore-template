import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { ShoppingCart, Loader2 } from 'lucide-react';

export default function AddToCartButton({ product, quantity = 1, options = null, className = "", children }) {
    const [processing, setProcessing] = React.useState(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post(route('cart.add', product.id), {
            quantity: quantity,
            options: options,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <form onSubmit={submit} className="contents">
            <button
                type="submit"
                disabled={processing || product.stock <= 0}
                className={className || "inline-flex items-center justify-center rounded-full bg-gold-500 p-2 text-neutral-950 transition hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed"}
            >
                {processing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    children || <ShoppingCart className="h-5 w-5" />
                )}
            </button>
        </form>
    );
}
