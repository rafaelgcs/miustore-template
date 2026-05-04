import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Layers, Link as LinkIcon } from 'lucide-react';

export default function Index({ auth, menus }) {
    const { delete: destroy } = useForm();

    const deleteMenu = (id) => {
        if (confirm('Tem certeza que deseja excluir este item de menu?')) {
            destroy(route('admin.navigation.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-100">
                            Gestão de Navegação
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Gerencie os links e mega menus que aparecem no topo do site.
                        </p>
                    </div>
                    <Link
                        href={route('admin.navigation.create')}
                        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-95"
                    >
                        <Plus className="h-5 w-5" />
                        Novo Menu
                    </Link>
                </div>
            }
        >
            <Head title="Menus de Navegação" />

            <div className="py-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ordem</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Nome</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Tipo</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</th>
                                    <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {menus.map((menu) => (
                                    <tr key={menu.id} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                                        <td className="px-6 py-5">
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                {menu.order}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-slate-900 dark:text-white">{menu.name}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">{menu.slug}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {menu.type === 'mega' ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                                                    <Layers className="h-3.5 w-3.5" /> Mega Menu
                                                </span>
                                            ) : menu.type === 'top_bar' ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-xs font-bold text-gold-700 dark:bg-gold-500/10 dark:text-gold-400">
                                                    <Plus className="h-3.5 w-3.5" /> Barra de Avisos
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                                    <LinkIcon className="h-3.5 w-3.5" /> Link Direto
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            {menu.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">Ativo</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">Inativo</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('admin.navigation.edit', menu.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:scale-110 active:scale-95"
                                                    title="Editar"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteMenu(menu.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {menus.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center text-slate-500 dark:text-slate-400">
                                            Nenhum item de menu cadastrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
