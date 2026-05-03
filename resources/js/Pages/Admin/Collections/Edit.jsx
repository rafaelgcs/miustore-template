import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Layers, Search, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ auth, collection, products }) {
    const { data, setData, put, processing, errors } = useForm({
        name: collection.name || '',
        slug: collection.slug || '',
        description: collection.description || '',
        image: collection.image || '',
        product_ids: collection.products.map(p => p.id) || [],
    });

    const fullUrl = `${window.location.origin}/produtos?collection=${data.slug}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl);
        alert('URL copiada para a área de transferência!');
    };

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleProduct = (id) => {
        const newIds = data.product_ids.includes(id)
            ? data.product_ids.filter(i => i !== id)
            : [...data.product_ids, id];
        setData('product_ids', newIds);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.collections.update', collection.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.collections.index')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Editar Coleção</h2>
                </div>
            }
        >
            <Head title={`Editar ${collection.name}`} />

            <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Basic Info */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                <Layers className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Informações</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Atualize os dados da coleção.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Nome da Coleção</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50 ${errors.name ? 'border-red-500' : ''}`}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">URL Slug</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50 ${errors.slug ? 'border-red-500' : ''}`}
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                    />
                                    {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
                                </div>
                            </div>

                            {collection.slug && (
                                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500">URL da Coleção</label>
                                    <div className="flex items-center gap-3">
                                        <code className="flex-1 text-xs text-gold-600 dark:text-gold-400 break-all">{fullUrl}</code>
                                        <button
                                            type="button"
                                            onClick={copyToClipboard}
                                            className="rounded-lg bg-gold-500 px-3 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-gold-400"
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Descrição</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Descreva o conceito desta coleção..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Selection */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 flex flex-col">
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                    <X className="h-8 w-8 rotate-45" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Produtos</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{data.product_ids.length} selecionados</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Filtrar produtos..."
                                className="w-full rounded-xl border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-white/5"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 space-y-2 custom-scrollbar">
                            {filteredProducts.map((product) => {
                                const isSelected = data.product_ids.includes(product.id);
                                return (
                                    <button
                                        key={product.id}
                                        type="button"
                                        onClick={() => toggleProduct(product.id)}
                                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-sm transition ${isSelected
                                            ? 'border-gold-500 bg-gold-500/10 text-gold-700 dark:text-gold-500'
                                            : 'border-slate-100 bg-white/50 text-slate-600 hover:border-gold-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400'
                                            }`}
                                    >
                                        <span className="font-medium">{product.name}</span>
                                        {isSelected && <Check className="h-4 w-4" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Link
                        href={route('admin.collections.index')}
                        className="rounded-2xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-8 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
