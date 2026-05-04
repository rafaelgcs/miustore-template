import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Info, Plus, Trash2, Layout, Type, Globe, Hash, CheckCircle2 } from 'lucide-react';
import MegaMenuBuilder from '@/Components/MegaMenuBuilder';

export default function Create({ auth }) {
    const [editorMode, setEditorMode] = useState('visual');
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'link',
        url: '',
        content: {
            columns: [],
            featured: { image: '', title: '', description: '' },
            left: { text: '', url: '', icon: '' },
            right: { text: '', url: '', icon: '' },
            carousel: []
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
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                            <Link href={route('admin.navigation.index')} className="hover:text-gold-500 transition-colors">Navegação</Link>
                            <span>/</span>
                            <span>Novo Item</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Novo Item de Menu</h1>
                    </div>
                    <Link
                        href={route('admin.navigation.index')}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-gold-400 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar à lista
                    </Link>
                </div>
            }
        >
            <Head title="Criar Menu" />

            <div className="mx-auto max-w-4xl pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                >
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    <Type className="h-4 w-4 text-gold-500" />
                                    Nome do Menu
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                    placeholder="Ex: Joias, Casamento, Relógios"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    <Layout className="h-4 w-4 text-gold-500" />
                                    Tipo de Menu
                                </label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                >
                                    <option value="link">Link Direto</option>
                                    <option value="mega">Mega Menu (Submenus)</option>
                                    <option value="top_bar">Barra de Avisos (Topo)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    <Globe className="h-4 w-4 text-gold-500" />
                                    URL ou Rota
                                </label>
                                <input
                                    type="text"
                                    value={data.url}
                                    onChange={e => setData('url', e.target.value)}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                    placeholder="Ex: products.index ou /promocoes"
                                    disabled={data.type === 'top_bar'}
                                />
                                <p className="text-[10px] text-slate-500 flex items-center">
                                    <Info className="h-3 w-3 mr-1" /> {data.type === 'top_bar' ? 'Não aplicável para Barra de Avisos.' : 'Use nomes de rotas ou URLs completas.'}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    <Hash className="h-4 w-4 text-gold-500" />
                                    Ordem de Exibição
                                </label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={e => setData('order', e.target.value)}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                                        Menu Ativo e Visível
                                    </label>
                                </div>
                            </div>
                        </div>

                        {data.type === 'top_bar' && (
                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-8">
                                <div className="bg-gold-50 dark:bg-gold-500/5 p-6 rounded-[2rem] border border-gold-200 dark:border-gold-500/20">
                                    <h4 className="font-bold text-gold-800 dark:text-gold-400 flex items-center gap-2">
                                        <Info className="h-5 w-5" /> Configuração da Barra de Avisos
                                    </h4>
                                    <p className="text-xs text-gold-700/70 dark:text-gold-400/70 mt-2 font-medium">
                                        A barra de avisos aparece acima do menu principal e é dividida em 3 partes.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Link */}
                                    <div className="space-y-4 p-6 border border-slate-200/50 dark:border-white/5 rounded-[2rem] bg-slate-50/30 dark:bg-white/5">
                                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Lado Esquerdo (Link)</h5>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Texto (ex: Atendimento)"
                                                value={data.content.left?.text || ''}
                                                onChange={e => setData('content', { ...data.content, left: { ...data.content.left, text: e.target.value } })}
                                                className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL ou Rota"
                                                value={data.content.left?.url || ''}
                                                onChange={e => setData('content', { ...data.content, left: { ...data.content.left, url: e.target.value } })}
                                                className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Nome do Ícone Lucide (ex: Headphones)"
                                                value={data.content.left?.icon || ''}
                                                onChange={e => setData('content', { ...data.content, left: { ...data.content.left, icon: e.target.value } })}
                                                className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Link */}
                                    <div className="space-y-4 p-6 border border-slate-200/50 dark:border-white/5 rounded-[2rem] bg-slate-50/30 dark:bg-white/5">
                                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Lado Direito (Link)</h5>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Texto (ex: Acessibilidade)"
                                                value={data.content.right?.text || ''}
                                                onChange={e => setData('content', { ...data.content, right: { ...data.content.right, text: e.target.value } })}
                                                className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL ou Rota"
                                                value={data.content.right?.url || ''}
                                                onChange={e => setData('content', { ...data.content, right: { ...data.content.right, url: e.target.value } })}
                                                className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Nome do Ícone Lucide (ex: Accessibility)"
                                                value={data.content.right?.icon || ''}
                                                onChange={e => setData('content', { ...data.content, right: { ...data.content.right, icon: e.target.value } })}
                                                className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Center Carousel */}
                                    <div className="md:col-span-2 space-y-4 p-6 border border-slate-200/50 dark:border-white/5 rounded-[2.5rem] bg-slate-50/30 dark:bg-white/5">
                                        <div className="flex justify-between items-center mb-4">
                                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Centro (Carrossel de Avisos)</h5>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const carousel = [...(data.content.carousel || [])];
                                                    carousel.push({ text: '', url: '' });
                                                    setData('content', { ...data.content, carousel });
                                                }}
                                                className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-2 text-[10px] font-bold text-gold-600 transition hover:bg-gold-500/20 dark:text-gold-400 uppercase tracking-widest"
                                            >
                                                <Plus className="h-3 w-3" /> Adicionar Aviso
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {(data.content.carousel || []).map((item, index) => (
                                                <div key={index} className="flex gap-4 items-start bg-white dark:bg-slate-900/50 p-4 rounded-2xl relative group shadow-sm">
                                                    <div className="flex-1 space-y-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Mensagem do aviso"
                                                            value={item.text}
                                                            onChange={e => {
                                                                const carousel = [...data.content.carousel];
                                                                carousel[index].text = e.target.value;
                                                                setData('content', { ...data.content, carousel });
                                                            }}
                                                            className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
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
                                                            className="w-full text-sm rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-800 focus:ring-gold-500"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const carousel = data.content.carousel.filter((_, i) => i !== index);
                                                            setData('content', { ...data.content, carousel });
                                                        }}
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white shadow-sm"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {(data.content.carousel || []).length === 0 && (
                                                <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                                                    <p className="text-sm text-slate-500 italic">Nenhum aviso adicionado ao carrossel.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {data.type === 'mega' && (
                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-xl">
                                            <Layout className="h-5 w-5 text-purple-500" /> Configuração do Mega Menu
                                        </h4>
                                        <p className="text-xs text-slate-500 font-medium">Personalize a estrutura de submenus e destaques.</p>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/5 p-1">
                                        <button
                                            type="button"
                                            onClick={() => setEditorMode('visual')}
                                            className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${editorMode === 'visual' ? 'bg-white text-gold-600 shadow-sm dark:bg-slate-800 dark:text-gold-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        >
                                            Editor Visual
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditorMode('json')}
                                            className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${editorMode === 'json' ? 'bg-white text-gold-600 shadow-sm dark:bg-slate-800 dark:text-gold-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        >
                                            JSON
                                        </button>
                                    </div>
                                </div>

                                {editorMode === 'visual' ? (
                                    <MegaMenuBuilder 
                                        content={data.content} 
                                        onChange={(newContent) => setData('content', newContent)} 
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-amber-50 dark:bg-amber-500/5 p-4 rounded-2xl border border-amber-200 dark:border-amber-500/20 flex items-start gap-3">
                                            <Info className="h-5 w-5 text-amber-500 mt-0.5" />
                                            <p className="text-xs text-amber-700 dark:text-amber-400">
                                                <strong>Atenção:</strong> O modo JSON é destinado a usuários avançados. Certifique-se de manter a estrutura correta para evitar erros na exibição do site.
                                            </p>
                                        </div>
                                        <textarea
                                            value={JSON.stringify(data.content, null, 2)}
                                            onChange={e => {
                                                try {
                                                    setData('content', JSON.parse(e.target.value));
                                                } catch (err) {
                                                    // Handle invalid JSON
                                                }
                                            }}
                                            rows="16"
                                            className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-xs font-mono transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-end pt-8 border-t border-slate-100 dark:border-slate-800">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-10 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                            >
                                <Save className="h-5 w-5" />
                                {processing ? 'Salvando...' : 'Salvar Menu'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
