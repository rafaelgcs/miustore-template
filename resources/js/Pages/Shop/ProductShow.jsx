import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Heart, ShoppingBag, ZoomIn } from 'lucide-react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function ProductShow({ product }) {
    const [selectedSize, setSelectedSize] = useState(product.available_sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.available_colors?.[0] || '');

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans">
            <Head title={product.name} />

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-black/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                            R
                        </div>
                        <h1 className="text-lg font-semibold tracking-wide text-black dark:text-white">Joias & Bem-estar</h1>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link
                            href={route('products.index')}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-5 py-2 text-sm text-slate-700 dark:text-slate-200 transition hover:border-gold-400 dark:hover:text-white"
                        >
                            Voltar ao catálogo
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="px-4 py-10 sm:px-6 lg:px-8 pt-24 bg-slate-50/50 dark:bg-transparent">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Produto</p>
                            <h1 className="mt-3 text-4xl font-semibold text-black dark:text-white">{product.name}</h1>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{product.category?.name} · {product.type || 'Peça única'}</p>
                        </div>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-6">
                            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
                                {product.image ? (
                                    <div className="group relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-[520px] w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                        <div className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
                                            <ZoomIn className="h-4 w-4" /> Zoom
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-[520px] items-center justify-center bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                                        Imagem não disponível
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[1.75rem] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lg shadow-slate-200/40 dark:shadow-black/20">
                                    <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Descrição</p>
                                    <p className="mt-4 text-slate-700 dark:text-slate-300 leading-7">{product.description}</p>
                                </div>
                                <div className="rounded-[1.75rem] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lg shadow-slate-200/40 dark:shadow-black/20">
                                    <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Detalhes</p>
                                    <dl className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                                        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 dark:bg-slate-950/50 px-4 py-3">
                                            <dt>Preço</dt>
                                            <dd className="font-semibold text-black dark:text-white">R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</dd>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 dark:bg-slate-950/50 px-4 py-3">
                                            <dt>Estoque</dt>
                                            <dd className="font-semibold text-black dark:text-white">{product.stock} unidades</dd>
                                        </div>
                                        {product.material && (
                                            <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 dark:bg-slate-950/50 px-4 py-3">
                                                <dt>Material</dt>
                                                <dd className="font-semibold text-black dark:text-white">{product.material}</dd>
                                            </div>
                                        )}
                                        {product.sku && (
                                            <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 dark:bg-slate-950/50 px-4 py-3">
                                                <dt>SKU</dt>
                                                <dd className="font-semibold text-black dark:text-white">{product.sku}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Selecione</p>
                                        <h2 className="mt-2 text-2xl font-semibold text-black dark:text-white">Personalize sua peça</h2>
                                    </div>
                                    <span className="rounded-full bg-gold-100 dark:bg-gold-500/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-gold-700 dark:text-gold-200">Premium</span>
                                </div>

                                {product.available_sizes?.length > 0 && (
                                    <div className="mt-8">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Tamanhos</p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            {product.available_sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`rounded-full border px-4 py-2 text-sm transition ${selectedSize === size ? 'border-gold-400 bg-gold-100 dark:bg-gold-500/10 text-gold-700 dark:text-white' : 'border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-gold-400'}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.available_colors?.length > 0 && (
                                    <div className="mt-8">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Cores</p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            {product.available_colors.map((color) => (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`rounded-full border px-4 py-2 text-sm transition ${selectedColor === color ? 'border-gold-400 bg-gold-100 dark:bg-gold-500/10 text-gold-700 dark:text-white' : 'border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-gold-400'}`}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.customization_options?.length > 0 && (
                                    <div className="mt-8 rounded-[1.75rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 p-4">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Opções de customização</p>
                                        <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                                            {product.customization_options.map((option) => (
                                                <li key={option} className="rounded-2xl bg-slate-100 dark:bg-white/5 px-4 py-3">
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-8 grid gap-3">
                                    <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-4 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                        <ShoppingBag className="h-4 w-4" />
                                        Adicionar ao carrinho
                                    </button>
                                    <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-5 py-4 text-sm text-slate-700 dark:text-slate-200 transition hover:border-gold-400 hover:bg-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
                                        <Heart className="h-4 w-4" />
                                        Favoritar
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lg shadow-slate-200/40 dark:shadow-black/20">
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Inspirado em</p>
                                <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">Produto pronto para personalização, com acabamento de luxo, embalagens especiais e atendimento dedicado.</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
