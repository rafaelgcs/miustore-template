import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Layout, Sparkles, Heart, Truck, Info } from 'lucide-react';

export default function Edit({ settings }) {
    const { data, setData, put, processing, errors } = useForm({
        primary_color: settings.primary_color || 'gold',
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_cta_text: settings.hero_cta_text || '',
        hero_cta_url: settings.hero_cta_url || '',
        hero_secondary_cta_text: settings.hero_secondary_cta_text || '',
        hero_secondary_cta_url: settings.hero_secondary_cta_url || '',
        features: settings.features || [
            { title: '', subtitle: '', icon: 'Sparkles' },
            { title: '', subtitle: '', icon: 'Heart' },
            { title: '', subtitle: '', icon: 'Truck' },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.home-settings.update'));
    };

    const updateFeature = (index, field, value) => {
        const newFeatures = [...data.features];
        newFeatures[index][field] = value;
        setData('features', newFeatures);
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                        Configurações da Home
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Configure o conteúdo exibido quando não houver banners ativos.
                    </p>
                </div>
            }
        >
            <Head title="Configurações da Home" />

            <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-8 pb-12">
                {/* Theme Color Selection */}
                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Paleta de Cores do Site</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                        {[
                            { id: 'gold', name: 'Dourado Miú', color: '#d99712', class: 'bg-[#d99712]' },
                            { id: 'rose', name: 'Rose Premium', color: '#e11d48', class: 'bg-[#e11d48]' },
                            { id: 'emerald', name: 'Esmeralda Luxo', color: '#059669', class: 'bg-[#059669]' },
                            { id: 'blue', name: 'Azul Safira', color: '#2563eb', class: 'bg-[#2563eb]' },
                            { id: 'slate', name: 'Slate Moderno', color: '#475569', class: 'bg-[#475569]' },
                        ].map((palette) => (
                            <button
                                key={palette.id}
                                type="button"
                                onClick={() => setData('primary_color', palette.id)}
                                className={`group relative flex flex-col items-center gap-3 rounded-[1.5rem] border-2 p-4 transition ${
                                    data.primary_color === palette.id
                                        ? 'border-gold-500 bg-gold-50/50 dark:border-gold-500 dark:bg-gold-500/10'
                                        : 'border-slate-100 hover:border-slate-200 dark:border-slate-800'
                                }`}
                            >
                                <div className={`h-12 w-12 rounded-full shadow-inner ${palette.class}`} />
                                <span className={`text-xs font-bold uppercase tracking-wider ${
                                    data.primary_color === palette.id ? 'text-gold-700 dark:text-gold-400' : 'text-slate-500'
                                }`}>
                                    {palette.name}
                                </span>
                                {data.primary_color === palette.id && (
                                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg">
                                        <Save className="h-3 w-3" />
                                    </div>
                                )}
                            </button>
                        ))}

                        {/* Custom Color Picker */}
                        <div className={`group relative flex flex-col items-center gap-3 rounded-[1.5rem] border-2 p-4 transition ${
                            data.primary_color.startsWith('#')
                                ? 'border-gold-500 bg-gold-50/50 dark:border-gold-500 dark:bg-gold-500/10'
                                : 'border-slate-100 hover:border-slate-200 dark:border-slate-800'
                        }`}>
                            <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-inner border border-slate-200 dark:border-white/10">
                                <input
                                    type="color"
                                    value={data.primary_color.startsWith('#') ? data.primary_color : '#d99712'}
                                    onChange={(e) => setData('primary_color', e.target.value)}
                                    className="absolute inset-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] cursor-pointer border-none bg-transparent"
                                />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                                data.primary_color.startsWith('#') ? 'text-gold-700 dark:text-gold-400' : 'text-slate-500'
                            }`}>
                                Personalizada
                            </span>
                            {data.primary_color.startsWith('#') && (
                                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg">
                                    <Save className="h-3 w-3" />
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-slate-500 italic">
                        * A alteração da paleta afetará botões, links, badges e elementos de destaque em todo o site.
                    </p>
                </div>

                {/* Hero Fallback Section */}
                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                            <Layout className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Hero Fallback (Design Atual)</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Título de Impacto</label>
                            <input
                                type="text"
                                value={data.hero_title}
                                onChange={e => setData('hero_title', e.target.value)}
                                className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subtítulo / Descrição</label>
                            <textarea
                                value={data.hero_subtitle}
                                onChange={e => setData('hero_subtitle', e.target.value)}
                                rows={3}
                                className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Texto CTA Principal</label>
                            <input
                                type="text"
                                value={data.hero_cta_text}
                                onChange={e => setData('hero_cta_text', e.target.value)}
                                className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL CTA Principal</label>
                            <input
                                type="text"
                                value={data.hero_cta_url}
                                onChange={e => setData('hero_cta_url', e.target.value)}
                                className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Texto CTA Secundário</label>
                            <input
                                type="text"
                                value={data.hero_secondary_cta_text}
                                onChange={e => setData('hero_secondary_cta_text', e.target.value)}
                                className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL CTA Secundário</label>
                            <input
                                type="text"
                                value={data.hero_secondary_cta_url}
                                onChange={e => setData('hero_secondary_cta_url', e.target.value)}
                                className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Cards Section */}
                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Cards de Destaque</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {data.features.map((feature, index) => (
                            <div key={index} className="space-y-4 rounded-2xl border border-slate-100 p-6 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Card {index + 1}</span>
                                    <select
                                        value={feature.icon}
                                        onChange={e => updateFeature(index, 'icon', e.target.value)}
                                        className="text-xs rounded-lg border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <option value="Sparkles">Brilho</option>
                                        <option value="Heart">Coração</option>
                                        <option value="Truck">Caminhão</option>
                                        <option value="Info">Informação</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Título</label>
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={e => updateFeature(index, 'title', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 text-sm focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Subtítulo</label>
                                    <textarea
                                        value={feature.subtitle}
                                        onChange={e => updateFeature(index, 'subtitle', e.target.value)}
                                        rows={2}
                                        className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 text-sm focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-full bg-gold-500 px-12 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Salvando...' : 'Salvar Todas as Configurações'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
