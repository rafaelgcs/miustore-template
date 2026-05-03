import React, { useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { 
    History as HistoryIcon, 
    ArrowLeft, 
    Package, 
    Calendar, 
    User, 
    Tag, 
    Database,
    ExternalLink,
    Clock,
    ShoppingBag,
    Download,
    FileText,
    TrendingUp,
    PlusCircle,
    MinusCircle,
    RefreshCw,
    Award,
    Activity
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const typeStyles = {
    sale: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
    addition: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    removal: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    adjustment: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
};

const typeLabels = {
    sale: 'Venda',
    addition: 'Entrada',
    removal: 'Saída',
    adjustment: 'Ajuste',
};

const TypeIcon = ({ type, className }) => {
    switch (type) {
        case 'sale': return <ShoppingBag className={className} />;
        case 'addition': return <PlusCircle className={className} />;
        case 'removal': return <MinusCircle className={className} />;
        case 'adjustment': return <RefreshCw className={className} />;
        default: return <HistoryIcon className={className} />;
    }
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gold-500" />
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {payload[0].value} {payload[0].value === 1 ? 'venda' : 'vendas'}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function ProductHistory({ product, movements, chartData }) {
    const totalSales = useMemo(() => chartData.reduce((acc, curr) => acc + curr.vendas, 0), [chartData]);
    const avgSales = useMemo(() => (totalSales / 30).toFixed(1), [totalSales]);
    const maxSales = useMemo(() => Math.max(...chartData.map(d => d.vendas)), [chartData]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.products.index')}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-gold-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-gold-500"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Histórico do Produto</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-slate-500 dark:text-slate-400">{product.name}</span>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span className="font-mono text-sm text-slate-400 uppercase">{product.sku || 'Sem SKU'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href={route('admin.products.history.pdf', product)}
                            className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
                        >
                            <FileText className="h-4 w-4" />
                            PDF
                        </a>
                        <a
                            href={route('admin.products.history.export', product)}
                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm border border-slate-200 transition hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800"
                        >
                            <Download className="h-4 w-4" />
                            CSV
                        </a>
                    </div>
                </div>
            }
        >
            <Head title={`Histórico - ${product.name}`} />

            <div className="space-y-6">
                {/* Stats and Chart Row */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400">
                                    <Database className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Estoque</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{product.stock} un</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Vendas (30d)</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {totalSales} un
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Média Diária</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{avgSales} un</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                                    <Award className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Melhor Dia</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{maxSales} un</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 flex flex-col"
                    >
                        <div className="mb-8 flex items-center justify-between px-2">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tendência de Vendas</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Volume de vendas diárias nos últimos 30 dias</p>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fontSize: 10, fill: '#64748B' }}
                                        interval={4} // Show every 5th day to avoid overlap
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fontSize: 10, fill: '#64748B' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="vendas" 
                                        stroke="#EAB308" 
                                        strokeWidth={4}
                                        fillOpacity={1} 
                                        fill="url(#colorSales)" 
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Movements Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                >
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Linha do Tempo</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Todas as movimentações e ajustes registrados</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Data / Hora</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Tipo</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">Quant.</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">Estoque</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Descrição</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Responsável</th>
                                    <th className="px-8 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {movements.data.length > 0 ? (
                                    movements.data.map((m) => (
                                        <tr key={m.id} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    <Clock className="h-4 w-4 text-slate-400" />
                                                    {new Date(m.created_at).toLocaleString('pt-BR', { 
                                                        day: '2-digit', 
                                                        month: '2-digit', 
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${typeStyles[m.type]}`}>
                                                    <TypeIcon type={m.type} className="h-3 w-3" />
                                                    {typeLabels[m.type]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`text-sm font-black ${
                                                    m.type === 'addition' ? 'text-green-600' : 
                                                    m.type === 'sale' || m.type === 'removal' ? 'text-red-600' : 
                                                    'text-slate-600 dark:text-slate-400'
                                                }`}>
                                                    {m.type === 'addition' ? '+' : '-'}{m.quantity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-2 text-xs">
                                                    <span className="text-slate-400 font-mono">{m.old_stock}</span>
                                                    <ArrowLeft className="h-3 w-3 text-slate-300 rotate-180" />
                                                    <span className="font-bold text-slate-900 dark:text-white font-mono">{m.new_stock}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="max-w-[200px] truncate text-sm text-slate-500 dark:text-slate-400" title={m.description}>
                                                    {m.description || '-'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                        <User className="h-3.5 w-3.5 text-slate-500" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                        {m.user?.name || 'Sistema'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                {m.reference_id && m.type === 'sale' && (
                                                    <Link
                                                        href={route('admin.orders.show', m.reference_id)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600 transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-gold-500/20 dark:text-gold-400 dark:hover:bg-gold-500 dark:hover:text-neutral-950"
                                                        title="Ver Pedido"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-20 text-center text-slate-500 dark:text-slate-400">
                                            <div className="flex flex-col items-center gap-3">
                                                <HistoryIcon className="h-10 w-10 text-slate-300" />
                                                <p className="text-lg font-medium">Nenhuma movimentação registrada.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Pagination */}
                {movements.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/50 p-2 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
                            {movements.links.map((link, index) => (
                                <React.Fragment key={index}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 font-bold text-sm ${
                                                link.active
                                                    ? 'bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 scale-110'
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 dark:text-slate-600 font-bold text-sm cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
