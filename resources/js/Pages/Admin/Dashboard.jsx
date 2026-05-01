import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Users,
    Sparkles,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Visão Geral
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Acompanhe vendas, produtos e pedidos em um painel refinado.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* KPIs Section */}
                <div className="grid gap-6 md:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold-50 text-gold-700">
                                <ShoppingBag className="h-6 w-6" />
                            </div>
                            <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">Receita Total</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-100">
                                R$ {parseFloat(stats.total_revenue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </h3>
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
                            <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">Total de Clientes</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-100">{stats.total_users}</h3>
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
                            <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">Produtos Ativos</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-100">{stats.total_products}</h3>
                        </motion.div>
                    </div>

                    {/* Chart Section */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] font-medium text-gold-500">Métricas</p>
                                <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                                    Receita dos últimos 7 dias
                                </h2>
                            </div>
                        </div>
                        
                        <div className="h-80 w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.revenue_data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" className="dark:stroke-slate-800" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `R$ ${value}`} dx={-10} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`R$ ${value}`, 'Receita']}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="total" 
                                        stroke="#d4af37" 
                                        strokeWidth={4}
                                        dot={{ fill: '#d4af37', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Secondary Sections */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">Pedidos Recentes ({stats.total_orders} total)</h3>
                                <Link href="#" className="text-sm font-medium text-gold-600 hover:text-gold-700 dark:text-gold-400">Ver todos</Link>
                            </div>
                            <div className="space-y-3">
                                {stats.recent_orders.length === 0 ? (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum pedido recente</p>
                                ) : (
                                    stats.recent_orders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between rounded-[1rem] border border-slate-200/50 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">Pedido #{order.id}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{order.user.name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">R$ {parseFloat(order.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-0.5">{order.status}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">Estoque Baixo</h3>
                                <Link href={route('admin.products.index')} className="text-sm font-medium text-gold-600 hover:text-gold-700 dark:text-gold-400">Ver produtos</Link>
                            </div>
                            <div className="space-y-3">
                                {stats.low_stock_products.length === 0 ? (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Todos os produtos com estoque adequado</p>
                                ) : (
                                    stats.low_stock_products.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between rounded-[1rem] border border-red-200/50 bg-red-50 p-4 dark:border-red-800/30 dark:bg-red-900/10">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">{product.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.category?.name}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                                    {product.stock} un
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
