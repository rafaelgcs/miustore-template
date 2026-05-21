import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Search, ShoppingCart } from 'lucide-react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function SharedFavorites({ user, favorites }) {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans">
            <Head title={`Favoritos de ${user.name}`} />

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-black/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                                A
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.32em] text-slate-400 dark:text-slate-400">Antonelli Acessórios</p>
                                <h1 className="text-lg font-semibold tracking-wide text-black dark:text-white">Joias & Bem-estar</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href={route('home')} className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400">
                            Ir para a Loja
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="text-sm uppercase tracking-[0.4em] text-gold-600 dark:text-gold-400 font-medium">Lista de Desejos</p>
                        <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                            Favoritos de <span className="text-gold-600 dark:text-gold-500">{user.name}</span>
                        </h2>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Confira as peças selecionadas por {user.name}. Toque em qualquer item para ver detalhes ou comprar.
                        </p>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-16 text-center">
                            <Heart className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-700" />
                            <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">Esta lista está vazia</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">O usuário ainda não adicionou produtos aos favoritos.</p>
                            <Link href={route('home')} className="mt-8 inline-flex items-center rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                Começar a comprar
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {favorites.map((product, index) => (
                                <motion.article
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900/80 p-6 shadow-xl shadow-slate-200/40 dark:shadow-none transition hover:-translate-y-1 hover:border-gold-400"
                                >
                                    <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-white/5 p-4">
                                        <div className="aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-slate-200 dark:from-white/10 to-white dark:to-transparent">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-slate-400">
                                                    <Heart className="h-12 w-12" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute left-4 top-4 rounded-full border border-gold-300 dark:border-gold-500/30 bg-gold-50 dark:bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold-700 dark:text-gold-200 shadow-lg shadow-black/40">
                                            {product.category?.name}
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white line-clamp-1">{product.name}</h3>
                                        <div className="mt-3 flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">5.0</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-xl font-bold text-gold-600 dark:text-gold-400">
                                                R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                            <Link href={route('products.show', product.slug)} className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400">
                                                <ShoppingBag className="mr-2 h-4 w-4" />
                                                Ver Detalhes
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 py-12">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        &copy; 2026 Antonelli Acessórios Joias & Bem-estar. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
