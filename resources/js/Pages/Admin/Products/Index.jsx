import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">Produtos</h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Gerencie tipos, tamanhos, cores e customizações dos produtos.</p>
                    </div>
                </div>
            }
        >
            <Head title="Produtos" />

            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="flex items-center justify-between gap-4 pb-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Produtos ativos</p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">Lista de produtos</h2>
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-slate-600 dark:text-slate-300">
                            <thead className="border-b border-slate-200/80 text-slate-900 dark:border-slate-700 dark:text-slate-100">
                                <tr>
                                    <th className="px-4 py-3">Nome</th>
                                    <th className="px-4 py-3">Categoria</th>
                                    <th className="px-4 py-3">Tipo</th>
                                    <th className="px-4 py-3">SKU</th>
                                    <th className="px-4 py-3">Estoque</th>
                                    <th className="px-4 py-3">Ativo</th>
                                    <th className="px-4 py-3">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((product) => (
                                    <tr key={product.id} className="border-b border-slate-200/80 dark:border-slate-800">
                                        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">{product.name}</td>
                                        <td className="px-4 py-4">{product.category?.name}</td>
                                        <td className="px-4 py-4">{product.type || '-'}</td>
                                        <td className="px-4 py-4">{product.sku || '-'}</td>
                                        <td className="px-4 py-4">{product.stock}</td>
                                        <td className="px-4 py-4">{product.is_active ? 'Sim' : 'Não'}</td>
                                        <td className="px-4 py-4">
                                            <Link
                                                href={route('admin.products.edit', { product: product.id })}
                                                className="rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {products.last_page > 1 && (
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
                            <span>Página {products.current_page} de {products.last_page}</span>
                            <div className="flex flex-wrap gap-2">
                                {products.prev_page_url ? (
                                    <Link href={products.prev_page_url} className="rounded-full border border-slate-200 px-4 py-2 hover:border-gold-400 dark:border-slate-700">
                                        Anterior
                                    </Link>
                                ) : null}
                                {products.next_page_url ? (
                                    <Link href={products.next_page_url} className="rounded-full border border-slate-200 px-4 py-2 hover:border-gold-400 dark:border-slate-700">
                                        Próxima
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
