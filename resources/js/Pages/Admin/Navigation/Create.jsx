import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Info } from 'lucide-react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'link',
        url: '',
        content: {
            columns: [],
            featured: { image: '', title: '', description: '' }
        },
        order: 0,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.navigation.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 dark:text-slate-200 leading-tight">Novo Item de Menu</h2>}
        >
            <Head title="Criar Menu" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-900 overflow-hidden shadow-sm sm:rounded-lg border border-slate-200 dark:border-white/10">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                                <Link href={route('admin.navigation.index')} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center text-sm font-medium">
                                    <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-2 bg-gold-500 border border-transparent rounded-md font-bold text-xs text-neutral-950 uppercase tracking-widest hover:bg-gold-400 transition"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Salvar Menu
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nome do Menu</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full rounded-md border-slate-300 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-gold-500 focus:border-gold-500 shadow-sm"
                                        placeholder="Ex: Joias, Casamento, Relógios"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tipo de Menu</label>
                                    <select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className="w-full rounded-md border-slate-300 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-gold-500 focus:border-gold-500 shadow-sm"
                                    >
                                        <option value="link">Link Direto</option>
                                        <option value="mega">Mega Menu (Submenus)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">URL ou Rota</label>
                                    <input
                                        type="text"
                                        value={data.url}
                                        onChange={e => setData('url', e.target.value)}
                                        className="w-full rounded-md border-slate-300 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-gold-500 focus:border-gold-500 shadow-sm"
                                        placeholder="Ex: products.index ou /promocoes"
                                    />
                                    <p className="text-[10px] text-slate-500 mt-1 flex items-center">
                                        <Info className="h-3 w-3 mr-1" /> Use nomes de rotas (ex: home) ou URLs completas.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Ordem de Exibição</label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={e => setData('order', e.target.value)}
                                        className="w-full rounded-md border-slate-300 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-gold-500 focus:border-gold-500 shadow-sm"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                        />
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Menu Ativo e Visível</span>
                                    </label>
                                </div>
                            </div>

                            {data.type === 'mega' && (
                                <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Configuração do Mega Menu (JSON)</h4>
                                    <p className="text-xs text-slate-500">No momento, a edição do conteúdo do mega menu é feita via JSON. No futuro, teremos um construtor visual.</p>
                                    <textarea
                                        value={JSON.stringify(data.content, null, 2)}
                                        onChange={e => {
                                            try {
                                                setData('content', JSON.parse(e.target.value));
                                            } catch (err) {
                                                // Wait for valid JSON
                                            }
                                        }}
                                        rows="12"
                                        className="w-full rounded-md border-slate-300 dark:border-white/10 dark:bg-slate-800 dark:text-white font-mono text-xs focus:ring-gold-500 shadow-sm"
                                    />
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
