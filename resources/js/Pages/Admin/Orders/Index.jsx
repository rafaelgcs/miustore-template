import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronUp, 
    ChevronDown, 
    ChevronsUp, 
    ChevronsDown, 
    Eye, 
    Search, 
    Filter,
    Calendar,
    User,
    CreditCard,
    Package,
    ArrowRight
} from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function OrdersIndex({ orders, filters = {} }) {
    // Ensure filters is an object and not picking up Array.prototype methods if it's an empty array
    const safeFilters = Array.isArray(filters) ? {} : filters;

    const [search, setSearch] = useState(safeFilters.search || '');
    const [status, setStatus] = useState(safeFilters.status || '');
    const [sort, setSort] = useState(typeof safeFilters.sort === 'string' ? safeFilters.sort : 'id');
    const [direction, setDirection] = useState(typeof safeFilters.direction === 'string' ? safeFilters.direction : 'desc');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), {
            search,
            status,
            sort,
            direction,
        }, {
            preserveState: true,
        });
    };

    const handleSort = (column) => {
        const newDirection = sort === column && direction === 'asc' ? 'desc' : 'asc';
        setSort(column);
        setDirection(newDirection);
        router.get(route('admin.orders.index'), {
            search,
            status,
            sort: column,
            direction: newDirection,
        }, {
            preserveState: true,
        });
    };

    const SortIcon = ({ column }) => {
        if (sort !== column) return <ChevronsUp className="w-3.5 h-3.5 opacity-30" />;
        return direction === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-gold-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gold-500" />;
    };

    const getStatusStyles = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20',
            processing: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20',
            shipped: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200/50 dark:border-purple-500/20',
            delivered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20',
            cancelled: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200/50 dark:border-rose-500/20',
        };
        return styles[status] || 'bg-slate-50 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200/50 dark:border-slate-500/20';
    };

    const getStatusLabel = (status) => {
        const labels = {
            pending: 'Pendente',
            processing: 'Processando',
            shipped: 'Enviado',
            delivered: 'Entregue',
            cancelled: 'Cancelado',
        };
        return labels[status] || status;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciamento de Pedidos</h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Acompanhe e gerencie todos os pedidos dos seus clientes.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Gerenciamento de Pedidos" />

            <div className="space-y-6">
                {/* Filters Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                >
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-6 relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar por ID, nome ou email do cliente..."
                                className="h-12 w-full rounded-full border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm transition-all focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-4 relative">
                            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="h-12 w-full rounded-full border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm transition-all focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white appearance-none"
                            >
                                <option value="">Todos os status</option>
                                <option value="pending">Pendente</option>
                                <option value="processing">Processando</option>
                                <option value="shipped">Enviado</option>
                                <option value="delivered">Entregue</option>
                                <option value="cancelled">Cancelado</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="h-12 w-full rounded-full bg-slate-950 text-white font-bold text-sm transition-all hover:bg-slate-800 active:scale-95 dark:bg-gold-500 dark:text-neutral-950 dark:hover:bg-gold-400"
                            >
                                Filtrar
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Orders Table Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-5">
                                        <button onClick={() => handleSort('id')} className="flex items-center gap-2 group">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-gold-500 transition-colors">ID</span>
                                            <SortIcon column="id" />
                                        </button>
                                    </th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Cliente</th>
                                    <th className="px-6 py-5">
                                        <button onClick={() => handleSort('status')} className="flex items-center gap-2 group">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-gold-500 transition-colors">Status</span>
                                            <SortIcon column="status" />
                                        </button>
                                    </th>
                                    <th className="px-6 py-5">
                                        <button onClick={() => handleSort('total_amount')} className="flex items-center gap-2 group">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-gold-500 transition-colors">Total</span>
                                            <SortIcon column="total_amount" />
                                        </button>
                                    </th>
                                    <th className="px-6 py-5">
                                        <button onClick={() => handleSort('created_at')} className="flex items-center gap-2 group">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-gold-500 transition-colors">Data</span>
                                            <SortIcon column="created_at" />
                                        </button>
                                    </th>
                                    <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {orders.data.length > 0 ? (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-bold text-slate-900 dark:text-white">#{order.id}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                                                        <User className="h-4 w-4 text-slate-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{order.user.name}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{order.user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${getStatusStyles(order.status)}`}>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {getStatusLabel(order.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="h-4 w-4 text-slate-400" />
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(order.total_amount)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">{formatDate(order.created_at)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link
                                                    href={route('admin.orders.show', order.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:scale-110 active:scale-95"
                                                >
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Package className="h-10 w-10 text-slate-300" />
                                                <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum pedido encontrado</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <Pagination links={orders.links} />
            </div>
        </AuthenticatedLayout>
    );
}
