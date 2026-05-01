import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, Eye, Star } from 'lucide-react';

const orders = [
    {
        id: '#1234',
        date: '15/04/2026',
        status: 'Entregue',
        total: 'R$ 189,90',
        items: 3,
        statusColor: 'text-green-600',
        statusBg: 'bg-green-50',
        icon: CheckCircle,
    },
    {
        id: '#1233',
        date: '10/04/2026',
        status: 'Em trânsito',
        total: 'R$ 245,90',
        items: 2,
        statusColor: 'text-blue-600',
        statusBg: 'bg-blue-50',
        icon: Truck,
    },
    {
        id: '#1232',
        date: '05/04/2026',
        status: 'Processando',
        total: 'R$ 89,90',
        items: 1,
        statusColor: 'text-yellow-600',
        statusBg: 'bg-yellow-50',
        icon: Clock,
    },
];

export default function Orders({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Meus Pedidos
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Acompanhe o status de todas as suas compras.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Total de pedidos: {orders.length}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Cliente: {auth.user.name}</span>
                    </div>
                </div>
            }
        >
            <Head title="Meus Pedidos" />

            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <Package className="mx-auto h-16 w-16 text-slate-400" />
                            <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-slate-100">Nenhum pedido encontrado</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Você ainda não fez nenhuma compra.</p>
                            <Link href={route('home')} className="mt-6 inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                Começar a comprar
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order, index) => (
                                <motion.article
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800">
                                                <order.icon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">{order.id}</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">{order.date} • {order.items} item(s)</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                            <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${order.statusBg} ${order.statusColor}`}>
                                                {order.status}
                                            </div>
                                            <span className="text-lg font-semibold text-slate-950 dark:text-slate-100">{order.total}</span>
                                            <button className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-gold-200 hover:bg-gold-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                                                <Eye className="mr-2 h-4 w-4" />
                                                Ver detalhes
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}

                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-gold-500">Avaliações</p>
                                <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                                    Avalie seus produtos
                                </h2>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    Sua opinião ajuda outros clientes a escolherem os melhores produtos.
                                </p>
                            </div>
                            <button className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                <Star className="mr-2 h-4 w-4" />
                                Ver avaliações pendentes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}