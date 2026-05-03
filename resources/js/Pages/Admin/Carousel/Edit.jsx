import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, Image as ImageIcon, Smartphone } from 'lucide-react';

export default function Edit({ carouselItem }) {
    const { data, setData, put, processing, errors } = useForm({
        title: carouselItem.title || '',
        subtitle: carouselItem.subtitle || '',
        button_text: carouselItem.button_text || 'Ver agora',
        button_url: carouselItem.button_url || '/produtos',
        image: carouselItem.image || '',
        mobile_image: carouselItem.mobile_image || '',
        text_color: carouselItem.text_color || 'white',
        overlay_opacity: carouselItem.overlay_opacity || 0.3,
        order: carouselItem.order || 0,
        active: carouselItem.active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.carousel.update', carouselItem.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.carousel.index')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Editar Banner
                        </h1>
                    </div>
                </div>
            }
        >
            <Head title="Editar Banner" />

            <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100 mb-6">Informações Gerais</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Título do Banner</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                        placeholder="Ex: Promoção Dia das Mães"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subtítulo / Descrição</label>
                                    <textarea
                                        value={data.subtitle}
                                        onChange={e => setData('subtitle', e.target.value)}
                                        rows={3}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                        placeholder="Breve descrição da promoção ou produto"
                                    />
                                    {errors.subtitle && <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Texto do Botão</label>
                                        <input
                                            type="text"
                                            value={data.button_text}
                                            onChange={e => setData('button_text', e.target.value)}
                                            className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL de Destino</label>
                                        <input
                                            type="text"
                                            value={data.button_url}
                                            onChange={e => setData('button_url', e.target.value)}
                                            className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                            placeholder="/produtos ou link externo"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100 mb-6">Mídia</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <ImageIcon className="h-4 w-4" />
                                        Imagem Desktop (URL)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.image}
                                        onChange={e => setData('image', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                        placeholder="https://exemplo.com/imagem-desktop.jpg"
                                    />
                                    <p className="mt-1 text-xs text-slate-500">Recomendado: 1920x800px</p>
                                    {data.image && (
                                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                                            <img src={data.image} alt="Preview Desktop" className="w-full h-32 object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <Smartphone className="h-4 w-4" />
                                        Imagem Mobile (URL) - Opcional
                                    </label>
                                    <input
                                        type="text"
                                        value={data.mobile_image}
                                        onChange={e => setData('mobile_image', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                        placeholder="https://exemplo.com/imagem-mobile.jpg"
                                    />
                                    <p className="mt-1 text-xs text-slate-500">Recomendado: 800x1000px (Vertical)</p>
                                    {data.mobile_image && (
                                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 w-32">
                                            <img src={data.mobile_image} alt="Preview Mobile" className="w-full h-40 object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Settings */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100 mb-6">Configurações</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Cor do Texto</label>
                                    <select
                                        value={data.text_color}
                                        onChange={e => setData('text_color', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <option value="white">Branco (Padrão)</option>
                                        <option value="black">Preto</option>
                                        <option value="gold-500">Dourado</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Opacidade do Overlay (Contraste)</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={data.overlay_opacity}
                                        onChange={e => setData('overlay_opacity', parseFloat(e.target.value))}
                                        className="mt-4 w-full accent-gold-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500">
                                        <span>0 (Transparente)</span>
                                        <span>{(data.overlay_opacity * 100).toFixed(0)}%</span>
                                        <span>1 (Opaco)</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Ativo</label>
                                        <button
                                            type="button"
                                            onClick={() => setData('active', !data.active)}
                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${data.active ? 'bg-gold-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.active ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Ordem de Exibição</label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={e => setData('order', parseInt(e.target.value))}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
