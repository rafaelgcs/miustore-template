import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ product, categories }) {
    const form = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        slug: product.slug || '',
        type: product.type || '',
        material: product.material || '',
        sku: product.sku || '',
        description: product.description || '',
        price: product.price || 0,
        stock: product.stock || 0,
        image: product.image || '',
        is_active: product.is_active ? 1 : 0,
        available_sizes: (product.available_sizes || []).join('\n'),
        available_colors: (product.available_colors || []).join('\n'),
        customization_options: (product.customization_options || []).join('\n'),
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(route('admin.products.update', { product: product.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">Editar Produto</h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Altere tipos, tamanhos, cores e opções de customização.</p>
                    </div>
                    <Link
                        href={route('admin.products.index')}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-gold-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                        Voltar à lista
                    </Link>
                </div>
            }
        >
            <Head title={`Editar ${product.name}`} />

            <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Produto</span>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(event) => form.setData('name', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Slug</span>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(event) => form.setData('slug', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Categoria</span>
                            <select
                                value={form.category_id}
                                onChange={(event) => form.setData('category_id', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Tipo</span>
                            <input
                                type="text"
                                value={form.type}
                                onChange={(event) => form.setData('type', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Material</span>
                            <input
                                type="text"
                                value={form.material}
                                onChange={(event) => form.setData('material', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">SKU</span>
                            <input
                                type="text"
                                value={form.sku}
                                onChange={(event) => form.setData('sku', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Descrição</span>
                        <textarea
                            value={form.description}
                            onChange={(event) => form.setData('description', event.target.value)}
                            rows={5}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        />
                    </label>

                    <div className="grid gap-6 lg:grid-cols-3">
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Preço</span>
                            <input
                                type="number"
                                step="0.01"
                                value={form.price}
                                onChange={(event) => form.setData('price', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Estoque</span>
                            <input
                                type="number"
                                value={form.stock}
                                onChange={(event) => form.setData('stock', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Imagem</span>
                            <input
                                type="text"
                                value={form.image}
                                onChange={(event) => form.setData('image', event.target.value)}
                                placeholder="/images/products/exemplo.jpg"
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Tamanhos disponíveis</span>
                            <textarea
                                value={form.available_sizes}
                                onChange={(event) => form.setData('available_sizes', event.target.value)}
                                rows={4}
                                placeholder="Um valor por linha"
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Cores disponíveis</span>
                            <textarea
                                value={form.available_colors}
                                onChange={(event) => form.setData('available_colors', event.target.value)}
                                rows={4}
                                placeholder="Um valor por linha"
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Opções de customização</span>
                        <textarea
                            value={form.customization_options}
                            onChange={(event) => form.setData('customization_options', event.target.value)}
                            rows={4}
                            placeholder="Um valor por linha"
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        />
                    </label>

                    <label className="inline-flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={form.is_active === 1}
                            onChange={(event) => form.setData('is_active', event.target.checked ? 1 : 0)}
                            className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-300"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-300">Produto ativo</span>
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400 disabled:opacity-60"
                        >
                            Salvar alterações
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
