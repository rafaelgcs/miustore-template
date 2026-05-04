import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Search, 
    Filter, 
    Edit2, 
    Package, 
    Tag, 
    Layers, 
    Hash, 
    Database,
    CheckCircle2,
    XCircle,
    History
} from 'lucide-react';

export default function Index({ products, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Produtos</h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Gerencie o inventário, tipos e customizações da sua loja.
                        </p>
                    </div>
                    <Link
                        href={route('admin.products.create')}
                        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-95"
                    >
                        <Plus className="h-5 w-5" />
                        Novo Produto
                    </Link>
                </div>
            }
        >
            <Head title="Produtos" />

            <div className="space-y-6">
                {/* Search and Actions */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <form onSubmit={handleSearch} className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-12 w-full rounded-full border-slate-200 bg-white pl-11 pr-4 text-sm transition-all focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                        />
                    </form>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Produto</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Categoria/Tipo</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">SKU</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Estoque</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</th>
                                    <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {products.data.map((product) => (
                                    <tr key={product.id} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                                                    <Package className="h-5 w-5 text-slate-500" />
                                                </div>
                                                <div className="font-bold text-slate-900 dark:text-white">
                                                    {product.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                                                    <Tag className="h-3.5 w-3.5" />
                                                    {product.category?.name || 'Sem categoria'}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <Layers className="h-3 w-3" />
                                                    {product.type || 'Padrão'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-1.5 text-sm font-mono text-slate-500">
                                                <Hash className="h-3.5 w-3.5" />
                                                {product.sku || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <Database className="h-4 w-4 text-slate-400" />
                                                <span className={`text-sm font-bold ${product.stock <= 5 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {product.stock} un
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {product.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    Ativo
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                    <XCircle className="h-3.5 w-3.5" />
                                                    Inativo
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('admin.products.history', product)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:scale-110 active:scale-95 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                                                    title="Ver Histórico"
                                                >
                                                    <History className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={route('admin.products.edit', product)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:scale-110 active:scale-95"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/50 p-2 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
                            {products.links.map((link, index) => (
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
