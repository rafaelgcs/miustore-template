import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, X } from 'lucide-react';

const favorites = [
    {
        id: 1,
        name: 'Colar em Ouro Rosé',
        price: 'R$ 1.395',
        image: null,
        rating: 5.0,
        category: 'Colares',
    },
    {
        id: 2,
        name: 'Brincos Diamante',
        price: 'R$ 895',
        image: null,
        rating: 4.8,
        category: 'Brincos',
    },
    {
        id: 3,
        name: 'Anel de Compromisso',
        price: 'R$ 2.450',
        image: null,
        rating: 5.0,
        category: 'Anéis',
    },
];

export default function Favorites({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Meus Favoritos
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Produtos que você salvou para comprar depois.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Favoritos: {favorites.length}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-900">Cliente: {auth.user.name}</span>
                    </div>
                </div>
            }
        >
            <Head title="Meus Favoritos" />

            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                {favorites.length === 0 ? (
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <Heart className="mx-auto h-16 w-16 text-slate-400" />
                        <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-slate-100">Nenhum favorito ainda</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">Explore nossa coleção e salve seus produtos preferidos.</p>
                        <Link href={route('home')} className="mt-6 inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                            Explorar produtos
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {favorites.map((product, index) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                            >
                                <div className="relative overflow-hidden rounded-[1.75rem] bg-white/5 p-4">
                                    <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white/10 via-white/5 to-white/0">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-slate-500">
                                                <Heart className="h-12 w-12" />
                                            </div>
                                        )}
                                    </div>
                                    <button className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm transition hover:bg-red-50 hover:text-red-600 dark:bg-slate-900/80 dark:text-slate-200">
                                        <X className="h-4 w-4" />
                                    </button>
                                    <div className="absolute left-4 top-4 rounded-full border border-gold-500/30 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold-200 shadow-lg shadow-black/40">
                                        {product.category}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">{product.name}</h3>
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-lg font-semibold text-slate-950 dark:text-slate-100">{product.price}</span>
                                        <button className="inline-flex items-center rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                            <ShoppingBag className="mr-2 h-4 w-4" />
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

                <div className="mt-8 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-gold-500">Descobrir mais</p>
                            <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                                Produtos similares aos seus favoritos
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Baseado nos produtos que você curtiu, recomendamos estas opções.
                            </p>
                        </div>
                        <Link href={route('home')} className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                            Ver recomendações
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}