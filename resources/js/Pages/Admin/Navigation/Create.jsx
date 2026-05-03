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
                                        <option value="top_bar">Barra de Avisos (Topo)</option>
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
                                        disabled={data.type === 'top_bar'}
                                    />
                                    <p className="text-[10px] text-slate-500 mt-1 flex items-center">
                                        <Info className="h-3 w-3 mr-1" /> {data.type === 'top_bar' ? 'Não aplicável para Barra de Avisos.' : 'Use nomes de rotas (ex: home) ou URLs completas.'}
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

                            {data.type === 'top_bar' && (
                                <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-8">
                                    <div className="bg-gold-50 dark:bg-gold-500/5 p-4 rounded-lg border border-gold-200 dark:border-gold-500/20">
                                        <h4 className="font-bold text-gold-800 dark:text-gold-400 flex items-center">
                                            <Info className="h-4 w-4 mr-2" /> Configuração da Barra de Avisos
                                        </h4>
                                        <p className="text-xs text-gold-700/70 dark:text-gold-400/70 mt-1">
                                            A barra de avisos aparece acima do menu principal e é dividida em 3 partes.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Link */}
                                        <div className="space-y-4 p-4 border border-slate-100 dark:border-white/5 rounded-xl">
                                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Lado Esquerdo (Link)</h5>
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Texto (ex: Atendimento)"
                                                    value={data.content.left?.text || ''}
                                                    onChange={e => setData('content', { ...data.content, left: { ...data.content.left, text: e.target.value } })}
                                                    className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="URL ou Rota"
                                                    value={data.content.left?.url || ''}
                                                    onChange={e => setData('content', { ...data.content, left: { ...data.content.left, url: e.target.value } })}
                                                    className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Nome do Ícone Lucide (ex: Headphones)"
                                                    value={data.content.left?.icon || ''}
                                                    onChange={e => setData('content', { ...data.content, left: { ...data.content.left, icon: e.target.value } })}
                                                    className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Right Link */}
                                        <div className="space-y-4 p-4 border border-slate-100 dark:border-white/5 rounded-xl">
                                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Lado Direito (Link)</h5>
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Texto (ex: Acessibilidade)"
                                                    value={data.content.right?.text || ''}
                                                    onChange={e => setData('content', { ...data.content, right: { ...data.content.right, text: e.target.value } })}
                                                    className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="URL ou Rota"
                                                    value={data.content.right?.url || ''}
                                                    onChange={e => setData('content', { ...data.content, right: { ...data.content.right, url: e.target.value } })}
                                                    className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Nome do Ícone Lucide (ex: Accessibility)"
                                                    value={data.content.right?.icon || ''}
                                                    onChange={e => setData('content', { ...data.content, right: { ...data.content.right, icon: e.target.value } })}
                                                    className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Center Carousel */}
                                        <div className="md:col-span-2 space-y-4 p-4 border border-slate-100 dark:border-white/5 rounded-xl">
                                            <div className="flex justify-between items-center">
                                                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Centro (Carrossel de Avisos)</h5>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const carousel = [...(data.content.carousel || [])];
                                                        carousel.push({ text: '', url: '' });
                                                        setData('content', { ...data.content, carousel });
                                                    }}
                                                    className="text-[10px] font-bold text-gold-600 hover:text-gold-500 uppercase tracking-widest"
                                                >
                                                    + Adicionar Aviso
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(data.content.carousel || []).map((item, index) => (
                                                    <div key={index} className="flex gap-3 items-start bg-slate-50 dark:bg-white/5 p-3 rounded-lg relative group">
                                                        <div className="flex-1 space-y-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Mensagem do aviso"
                                                                value={item.text}
                                                                onChange={e => {
                                                                    const carousel = [...data.content.carousel];
                                                                    carousel[index].text = e.target.value;
                                                                    setData('content', { ...data.content, carousel });
                                                                }}
                                                                className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="URL opcional"
                                                                value={item.url}
                                                                onChange={e => {
                                                                    const carousel = [...data.content.carousel];
                                                                    carousel[index].url = e.target.value;
                                                                    setData('content', { ...data.content, carousel });
                                                                }}
                                                                className="w-full text-sm rounded-md border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const carousel = data.content.carousel.filter((_, i) => i !== index);
                                                                setData('content', { ...data.content, carousel });
                                                            }}
                                                            className="p-1 text-slate-400 hover:text-red-500 transition"
                                                        >
                                                            <Info className="h-4 w-4 rotate-45" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {(data.content.carousel || []).length === 0 && (
                                                    <p className="text-center py-4 text-xs text-slate-500 italic">Nenhum aviso adicionado ao carrossel.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

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
