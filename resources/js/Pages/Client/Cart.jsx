import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Minus, Plus, ArrowLeft, ShoppingCart, CreditCard } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';

export default function Cart({ auth, cartItems }) {
    const { patch, delete: destroy, post, processing } = useForm();

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        patch(route('cart.update', id), {
            quantity: quantity,
        }, {
            preserveScroll: true,
        });
    };

    const removeItem = (id) => {
        destroy(route('cart.remove', id), {
            preserveScroll: true,
        });
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.product.price) * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 25.00;
    const total = subtotal + shipping;

    const CartContent = (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Meu Carrinho</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        {cartItems.length} {cartItems.length === 1 ? 'item selecionado' : 'itens selecionados'}
                    </p>
                </div>
                <Link
                    href={route('products.index')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:text-gold-500 transition"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Continuar comprando
                </Link>
            </div>

            {cartItems.length === 0 ? (
                <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-20 text-center backdrop-blur-xl">
                    <div className="flex justify-center mb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-500/10 text-gold-600 dark:text-gold-200">
                            <ShoppingCart className="h-10 w-10" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Seu carrinho está vazio</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                        Parece que você ainda não adicionou nada ao seu carrinho. Explore nossa coleção e encontre a joia perfeita.
                    </p>
                    <Link
                        href={route('products.index')}
                        className="mt-8 inline-flex items-center rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                    >
                        Ver Produtos
                    </Link>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="group relative flex flex-col sm:flex-row gap-6 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-sm backdrop-blur-xl transition hover:border-gold-300/50 dark:hover:border-gold-500/30"
                                >
                                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/5">
                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-slate-400">
                                                <ShoppingBag className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {item.product.name}
                                                </h3>
                                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold text-gold-600 dark:text-gold-400">
                                                R$ {parseFloat(item.product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-white dark:hover:bg-white/10 hover:text-gold-600 transition"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-10 text-center text-sm font-semibold text-slate-900 dark:text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-white dark:hover:bg-white/10 hover:text-gold-600 transition"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition"
                                                title="Remover item"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 shadow-xl backdrop-blur-xl">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Resumo do Pedido</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Frete</span>
                                    <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-gold-600 dark:text-gold-400">
                                        Adicione mais R$ {(500 - subtotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} para frete grátis!
                                    </p>
                                )}
                                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between text-xl font-bold text-slate-900 dark:text-white">
                                    <span>Total</span>
                                    <span className="text-gold-600 dark:text-gold-400">
                                        R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => post(route('client.orders.store'))}
                                disabled={processing || cartItems.length === 0}
                                className="mt-8 w-full flex items-center justify-center gap-3 rounded-full bg-gold-500 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:shadow-gold-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CreditCard className="h-5 w-5" />
                                {auth.user ? 'Finalizar Compra' : 'Entre para Comprar'}
                            </button>

                            <div className="mt-6 flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                                        ✓
                                    </div>
                                    Pagamento 100% Seguro
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                                        ✓
                                    </div>
                                    Troca Grátis em até 30 dias
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    if (auth.user) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-200">Carrinho</h2>}
            >
                <Head title="Carrinho" />
                <div className="py-2">
                    {CartContent}
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans">
            <Head title="Carrinho - Miu Store" />
            <nav className="border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-black/70 backdrop-blur-xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                            M
                        </div>
                        <h1 className="text-lg font-semibold tracking-wide text-black dark:text-white">Miu Store</h1>
                    </Link>
                </div>
            </nav>
            <main className="pt-8">
                {CartContent}
            </main>
        </div>
    );
}