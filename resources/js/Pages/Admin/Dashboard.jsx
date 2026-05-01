import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Sparkles,
    ShieldCheck,
} from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Painel Administrativo
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Acompanhe vendas, produtos e pedidos em um painel refinado.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Tema disponível: Claro/Escuro</span>
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Usuário: {auth.user.name}</span>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none">
                        <div className="flex items-center gap-3 pb-6 border-b border-slate-200/70 dark:border-slate-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                                R
                            </div>
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                                    Administrador
                                </p>
                                <p className="text-lg font-semibold text-slate-950 dark:text-slate-100">
                                    {auth.user.name}
                                </p>
                            </div>
                        </div>

                        <nav className="mt-6 space-y-2">
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-3xl border border-gold-100 bg-gold-50 px-4 py-3 text-sm font-semibold text-gold-700 shadow-sm shadow-gold-200 transition hover:bg-gold-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                <LayoutDashboard className="h-5 w-5" />
                                Visão Geral
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-gold-200 hover:bg-gold-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Produtos
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-gold-200 hover:bg-gold-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <Users className="h-5 w-5" />
                                Clientes
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-gold-200 hover:bg-gold-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <Settings className="h-5 w-5" />
                                Configurações
                            </a>
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
                                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Receita Total</p>
                                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">R$ {parseFloat(stats.total_revenue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    <Users className="h-6 w-6" />
                                </div>
                                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Total de Clientes</p>
                                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">{stats.total_users}</h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Produtos Ativos</p>
                                <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">{stats.total_products}</h3>
                            </motion.div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-gold-500">Visão geral</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                                        Principais métricas da semana
                                    </h2>
                                </div>
                                <button className="inline-flex items-center rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                    Ver relatório
                                </button>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Total de Pedidos</p>
                                    <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-slate-100">{stats.total_orders}</p>
                                </div>
                                <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Produtos com Estoque Baixo</p>
                                    <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-slate-100">{stats.low_stock_products.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">Pedidos Recentes</h3>
                                <div className="mt-4 space-y-3">
                                    {stats.recent_orders.length === 0 ? (
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum pedido recente</p>
                                    ) : (
                                        stats.recent_orders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between rounded-lg border border-slate-200/50 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-950 dark:text-slate-100">Pedido #{order.id}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{order.user.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">R$ {parseFloat(order.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{order.status}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">Estoque Baixo</h3>
                                <div className="mt-4 space-y-3">
                                    {stats.low_stock_products.length === 0 ? (
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Todos os produtos com estoque adequado</p>
                                    ) : (
                                        stats.low_stock_products.map((product) => (
                                            <div key={product.id} className="flex items-center justify-between rounded-lg border border-red-200/50 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-950 dark:text-slate-100">{product.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{product.category?.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">{product.stock} unidades</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
