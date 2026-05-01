import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2, CreditCard, Truck } from 'lucide-react';

const cartItems = [
    {
        id: 1,
        name: 'Colar em Ouro Rosé',
        price: 1395,
        quantity: 1,
        image: null,
        category: 'Colares',
    },
    {
        id: 2,
        name: 'Brincos Diamante',
        price: 895,
        quantity: 2,
        image: null,
        category: 'Brincos',
    },
];

export default function Cart({ auth }) {
    const [items, setItems] = useState(cartItems);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 29.90;
    const total = subtotal + shipping;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Carrinho de Compras
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Revise seus produtos antes de finalizar a compra.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">{items.length} item(s) no carrinho</span>
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Cliente: {auth.user.name}</span>
                    </div>
                </div>
            }
        >
            <Head title="Carrinho de Compras" />

            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                {items.length === 0 ? (
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <ShoppingBag className="mx-auto h-16 w-16 text-slate-400" />
                        <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-slate-100">Seu carrinho está vazio</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">Adicione produtos para começar suas compras.</p>
                        <Link href={route('home')} className="mt-6 inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                            Continuar comprando
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                        <div className="space-y-6">
                            {items.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                                >
                                    <div className="flex gap-6">
                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.5rem] bg-slate-100 dark:bg-slate-800">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="h-full w-full rounded-[1.5rem] object-cover" />
                                            ) : (
                                                <ShoppingBag className="h-8 w-8 text-slate-400" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">{item.name}</h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.category}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium text-slate-950 dark:text-slate-100">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <span className="text-lg font-semibold text-slate-950 dark:text-slate-100">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">Resumo do pedido</h3>

                                <div className="mt-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                                        <span className="text-slate-950 dark:text-slate-100">R$ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Frete</span>
                                        <span className="text-slate-950 dark:text-slate-100">
                                            {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span className="text-slate-950 dark:text-slate-100">Total</span>
                                            <span className="text-slate-950 dark:text-slate-100">R$ {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-6 w-full rounded-full bg-gold-500 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                    Finalizar compra
                                </button>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                                <div className="flex items-center gap-3">
                                    <Truck className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    <span className="text-sm font-medium text-slate-950 dark:text-slate-100">Frete grátis</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    Para compras acima de R$ 500,00
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    <span className="text-sm font-medium text-slate-950 dark:text-slate-100">Pagamento seguro</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    Aceitamos cartão, PIX e boleto
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}