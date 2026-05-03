import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Megaphone, Upload, X } from 'lucide-react';
import { useState } from 'react';

export default function Create({ auth, categories, products }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        image: null,
        link: '',
        category_id: '',
        product_id: '',
        order: 0,
        active: true,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.campaigns.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.campaigns.index')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Nova Campanha</h2>
                </div>
            }
        >
            <Head title="Criar Campanha" />

            <div className="mx-auto max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Content */}
                        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                    <Megaphone className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Conteúdo</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Título e informações da campanha.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Título Principal</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50 ${errors.title ? 'border-red-500' : ''}`}
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Ex: Coleção de Inverno"
                                    />
                                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Subtítulo / Descrição</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.subtitle}
                                        onChange={(e) => setData('subtitle', e.target.value)}
                                        placeholder="Ex: Até 50% de desconto em itens selecionados"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Link de Destino</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.link}
                                        onChange={(e) => setData('link', e.target.value)}
                                        placeholder="/shop/winter"
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Categoria (Opcional)</label>
                                        <select
                                            className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                        >
                                            <option value="">Nenhuma</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Ordem</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                            value={data.order}
                                            onChange={(e) => setData('order', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-8">
                            <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                        <Upload className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Imagem da Campanha</h3>
                                </div>

                                <div className="relative">
                                    {preview ? (
                                        <div className="relative group overflow-hidden rounded-[2rem] border-2 border-dashed border-gold-500/50 aspect-video">
                                            <img src={preview} alt="Preview" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    type="button"
                                                    onClick={() => { setPreview(null); setData('image', null); }}
                                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                                                >
                                                    <X className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 transition hover:border-gold-500/50 hover:bg-gold-50/10 dark:border-white/10 dark:bg-white/5 aspect-video cursor-pointer">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-900">
                                                <Upload className="h-8 w-8 text-gold-500" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Clique para enviar</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG ou WebP (Máx. 5MB)</p>
                                            </div>
                                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                    )}
                                    {errors.image && <p className="mt-2 text-center text-xs text-red-500">{errors.image}</p>}
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={data.active}
                                                onChange={(e) => setData('active', e.target.checked)}
                                            />
                                            <div className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-gold-500 dark:bg-slate-800"></div>
                                            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></div>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Campanha Ativa</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-8 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-50"
                            >
                                <Save className="h-5 w-5" />
                                {processing ? 'Enviando...' : 'Criar Campanha'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
