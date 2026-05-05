import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { 
    Truck, 
    Package, 
    User as UserIcon, 
    Calendar, 
    ExternalLink,
    Clock,
    CheckCircle2,
    Truck as TruckIcon,
    MapPin
} from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function Management({ orders }) {
    const getStatusStyle = (status) => {
        const styles = {
            pending: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
            processing: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
            shipped: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
            delivered: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400',
            cancelled: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
        };
        return styles[status] || 'bg-slate-50 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400';
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

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciamento de Entregas</h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        Acompanhe o status e a logística dos pedidos em tempo real.
                    </p>
                </div>
            }
        >
            <Head title="Gerenciamento de Entregas" />

            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Pedido / Data</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Cliente / Destino</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Método / Modo</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Status Entrega</th>
                                    <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="font-bold text-slate-900 dark:text-white">#{order.id}</div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    <UserIcon className="h-3.5 w-3.5" />
                                                    {order.user.name}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <MapPin className="h-3 w-3" />
                                                    {order.address_id ? 'Endereço Registrado' : 'Sem endereço'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <TruckIcon className="h-3.5 w-3.5 text-gold-500" />
                                                    {order.shipping_method || 'Vários'}
                                                </div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    {order.shipping_mode === 'individual' ? 'Modo Individual' : 'Modo Conjunto'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(order.status)}`}>
                                                {order.status === 'delivered' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Link
                                                href={route('admin.orders.show', order.id)}
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:scale-110 active:scale-95 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                                                title="Ver Detalhes do Pedido"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {orders.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center text-slate-500 dark:text-slate-400">
                                            Nenhum pedido com entrega encontrada.
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
