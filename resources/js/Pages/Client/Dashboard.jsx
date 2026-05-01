import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, User, LogOut, Package, CreditCard, Star } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Meu Painel
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Acompanhe seus pedidos e produtos favoritos.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Cliente: {auth.user.name}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Tema: Claro/Escuro</span>
                    </div>
                </div>
            }
        >
            <Head title="Meu Painel" />

            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none">
                        <div className="flex items-center gap-3 pb-6 border-b border-slate-200/70 dark:border-slate-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                                    Cliente
                                </p>
                                <p className="text-lg font-semibold text-slate-950 dark:text-slate-100">
                                    {auth.user.name}
                                </p>
                            </div>
                        </div>

                        <nav className="mt-6 space-y-2">
                            <Link
                                href={route('client.dashboard')}
                                className="flex items-center gap-3 rounded-3xl border border-gold-100 bg-gold-50 px-4 py-3 text-sm font-semibold text-gold-700 shadow-sm shadow-gold-200 transition hover:bg-gold-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                <Package className="h-5 w-5" />
                                Meu Painel
                            </Link>
                            <Link
                                href={route('client.orders')}
                                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-gold-200 hover:bg-gold-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Meus Pedidos
                            </Link>
                            <Link
                                href={route('client.favorites')}
                                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-gold-200 hover:bg-gold-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <Heart className="h-5 w-5" />
                                Favoritos
                            </Link>
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-gold-200 hover:bg-gold-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <User className="h-5 w-5" />
                                Perfil
                            </Link>
                        </nav>

                        <div className="mt-8 border-t border-slate-200/70 pt-5 dark:border-slate-800">
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-red-900/50"
                            >
                                <LogOut className="h-5 w-5" />
                                Sair
                            </Link>
                        </div>
                    </aside>

                    <section className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold-50 text-gold-700">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Pedidos realizados</p>
                                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">{stats.total_orders}</h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    <Heart className="h-6 w-6" />
                                </div>
                                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Total gasto</p>
                                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">R$ {parseFloat(stats.total_spent).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    <Star className="h-6 w-6" />
                                </div>
                                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Produtos favoritos</p>
                                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">{stats.favorite_products.length}</h3>
                            </motion.div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-gold-500">Bem-vindo de volta</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                                        Continue suas compras
                                    </h2>
                                </div>
                                <Link href={route('home')} className="inline-flex items-center rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                    Ver Produtos
                                </Link>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Último pedido</p>
                                    {stats.recent_orders.length > 0 ? (
                                        <>
                                            <p className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Pedido #{stats.recent_orders[0].id}</p>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Status: {stats.recent_orders[0].status}</p>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">R$ {parseFloat(stats.recent_orders[0].total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        </>
                                    ) : (
                                        <p className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Nenhum pedido</p>
                                    )}
                                </div>
                                <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Carrinho</p>
                                    <p className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">0 itens</p>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">R$ 0,00</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-gold-500">Recomendações</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                                        Produtos que você pode gostar
                                    </h2>
                                </div>
                                <Link href={route('client.favorites')} className="inline-flex items-center rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                    Ver Favoritos
                                </Link>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {stats.favorite_products.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group overflow-hidden rounded-[1.5rem] border border-slate-200/50 bg-slate-50 p-4 transition hover:border-gold-200 hover:bg-gold-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-gold-900/20"
                                    >
                                        <div className="aspect-[4/5] overflow-hidden rounded-[1rem] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-slate-400">
                                                    <ShoppingBag className="h-8 w-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-100 line-clamp-2">{product.name}</h3>
                                            <p className="mt-1 text-xs text-gold-600 dark:text-gold-400">{product.category?.name}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-sm font-semibold text-slate-950 dark:text-slate-100">R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                <button className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-neutral-950 transition hover:bg-gold-400">
                                                    <Heart className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
