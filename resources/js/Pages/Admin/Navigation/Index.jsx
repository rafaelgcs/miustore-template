import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash2, Move, Layers, Link as LinkIcon } from 'lucide-react';

export default function Index({ auth, menus }) {
    const { delete: destroy } = useForm();

    const deleteMenu = (id) => {
        if (confirm('Tem certeza que deseja excluir este item de menu?')) {
            destroy(route('admin.navigation.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 dark:text-slate-200 leading-tight">Gestão de Navegação</h2>}
        >
            <Head title="Menus de Navegação" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-900 overflow-hidden shadow-sm sm:rounded-lg border border-slate-200 dark:border-white/10">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Menus Ativos</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Gerencie os links e mega menus que aparecem no topo do site.</p>
                                </div>
                                <Link
                                    href={route('admin.navigation.create')}
                                    className="inline-flex items-center px-4 py-2 bg-gold-500 border border-transparent rounded-md font-semibold text-xs text-neutral-950 uppercase tracking-widest hover:bg-gold-400 transition"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Novo Menu
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-white/10">
                                            <th className="py-4 px-4 text-xs uppercase tracking-wider text-slate-500 font-bold">Ordem</th>
                                            <th className="py-4 px-4 text-xs uppercase tracking-wider text-slate-500 font-bold">Nome</th>
                                            <th className="py-4 px-4 text-xs uppercase tracking-wider text-slate-500 font-bold">Tipo</th>
                                            <th className="py-4 px-4 text-xs uppercase tracking-wider text-slate-500 font-bold">Status</th>
                                            <th className="py-4 px-4 text-xs uppercase tracking-wider text-slate-500 font-bold text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menus.map((menu) => (
                                            <tr key={menu.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-bold">
                                                        {menu.order}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="font-medium text-slate-900 dark:text-slate-100">{menu.name}</div>
                                                    <div className="text-xs text-slate-500">{menu.slug}</div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    {menu.type === 'mega' ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                            <Layers className="h-3 w-3 mr-1" /> Mega Menu
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                            <LinkIcon className="h-3 w-3 mr-1" /> Link Direto
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4">
                                                    {menu.is_active ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Ativo</span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Inativo</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-right space-x-2">
                                                    <Link
                                                        href={route('admin.navigation.edit', menu.id)}
                                                        className="inline-flex items-center p-2 text-slate-400 hover:text-gold-500 transition"
                                                        title="Editar"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteMenu(menu.id)}
                                                        className="inline-flex items-center p-2 text-slate-400 hover:text-red-500 transition"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
