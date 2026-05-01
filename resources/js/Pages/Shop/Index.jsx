import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight, Search, Heart } from 'lucide-react';

const sections = [
    {
        title: 'Coleções exclusivas',
        subtitle: 'Peças artesanais com acabamento premium',
    },
    {
        title: 'Designs atemporais',
        subtitle: 'Alianças, brincos e colares com brilho natural',
    },
    {
        title: 'Frete rápido',
        subtitle: 'Entrega nacional em embalagens de presente',
    },
];

const categories = [
    { title: 'Anéis', subtitle: 'Finos, solitários e de compromisso' },
    { title: 'Colares', subtitle: 'Elegância com detalhes em brilho' },
    { title: 'Brincos', subtitle: 'Modelos versáteis para todas as ocasiões' },
];

export default function Index({ products }) {
    return (
        <div className="min-h-screen bg-neutral-950 text-slate-100 font-sans">
            <Head title="Podologia & Massoterapia Rodrigues" />

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                            R
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Clínica Rodrigues</p>
                            <h1 className="text-lg font-semibold tracking-wide text-white">Joias & Bem-estar</h1>
                        </div>
                    </div>
                    <div className="hidden items-center gap-8 md:flex">
                        <Link href="#colecoes" className="text-sm text-slate-300 hover:text-white transition">Coleções</Link>
                        <Link href="#destaques" className="text-sm text-slate-300 hover:text-white transition">Destaques</Link>
                        <Link href="#contato" className="text-sm text-slate-300 hover:text-white transition">Contato</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition">
                            <Search className="h-5 w-5" />
                        </button>
                        <Link href={route('login')} className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 md:inline-flex">
                            Entrar
                        </Link>
                        <Link href={route('register')} className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400">
                            Comprar
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-28">
                <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                    <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-gold-500/10 blur-3xl" />
                    <div className="absolute left-1/2 top-24 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
                    <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="relative z-10">
                            <span className="inline-flex rounded-full border border-gold-500/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.28em] text-gold-200 shadow-sm shadow-gold-500/10">
                                Novidade</span>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl"
                            >
                                Joias refinadas para ocasiões inesquecíveis.
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
                            >
                                Descubra peças com acabamento premium, atenção aos detalhes e embalagens especiais para presente.
                            </motion.p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link href="#destaques" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400">
                                    Ver Produtos
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="#colecoes" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-200 transition hover:border-gold-400 hover:text-white">
                                    Conheça a coleção
                                </Link>
                            </div>

                            <div className="mt-14 grid gap-4 sm:grid-cols-3">
                                {sections.map((section) => (
                                    <div key={section.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200 shadow-xl shadow-black/10">
                                        <h3 className="text-base font-semibold text-white">{section.title}</h3>
                                        <p className="mt-2 text-sm text-slate-300">{section.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-x-0 top-0 h-full rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-transparent blur-2xl" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_50%)] p-6 shadow-[0_40px_120px_-40px_rgba(255,255,255,0.25)]">
                                        <div className="flex h-20 items-center justify-center rounded-3xl bg-neutral-950/80 text-white shadow-lg shadow-black/30">
                                            <span className="text-4xl font-semibold">∞</span>
                                        </div>
                                        <p className="mt-6 text-sm text-slate-300">Colar em ouro rosé com fecho delicado e ondas fluidas.</p>
                                        <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                                            <span>R$ 1.395</span>
                                            <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-gold-200">Novo</span>
                                        </div>
                                    </div>
                                    <div className="rounded-[1.75rem] bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.14),_transparent_50%)] p-6 shadow-[0_40px_120px_-40px_rgba(255,255,255,0.18)]">
                                        <div className="flex h-20 items-center justify-center rounded-3xl bg-neutral-950/80 text-white shadow-lg shadow-black/30">
                                            <span className="text-4xl font-semibold">✦</span>
                                        </div>
                                        <p className="mt-6 text-sm text-slate-300">Brincos com acabamento polido e brilho sutil.</p>
                                        <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                                            <span>R$ 895</span>
                                            <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-gold-200">Best seller</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 rounded-[1.75rem] bg-black/60 p-8 backdrop-blur-2xl">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Atendimento personalizado</p>
                                    <h3 className="mt-5 text-3xl font-semibold text-white">Consultoria de presente</h3>
                                    <p className="mt-4 text-sm leading-7 text-slate-300">Combinações feitas para momentos especiais com entrega em embalagem premium.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="colecoes" className="px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-200">Coleções</p>
                                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Explore nossas categorias</h2>
                            </div>
                            <p className="max-w-xl text-sm text-slate-400">Joias atemporais criadas com cuidado para ocasiões importantes.</p>
                        </div>

                        <div className="mt-8 grid gap-5 sm:grid-cols-3">
                            {categories.map((category) => (
                                <div key={category.title} className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-8 transition hover:border-gold-400 hover:bg-white/10">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-200 shadow-md shadow-gold-500/10">
                                        <Heart className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-white">{category.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-400">{category.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="destaques" className="px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-200">Destaques</p>
                                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Peças selecionadas</h2>
                            </div>
                            <p className="max-w-xl text-sm text-slate-400">Cada joia é pensada para transmitir sofisticação e conforto.</p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                            {products.length === 0 ? (
                                <div className="col-span-full rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center text-slate-400">
                                    Nenhum produto cadastrado no momento.
                                </div>
                            ) : (
                                products.map((product, index) => (
                                    <motion.article
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        className="group overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-gold-400"
                                    >
                                        <div className="relative overflow-hidden rounded-[1.75rem] bg-white/5 p-4">
                                            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white/10 via-white/5 to-white/0">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-slate-500">
                                                        <ShoppingBag className="h-12 w-12" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute left-4 top-4 rounded-full border border-gold-500/30 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold-200 shadow-lg shadow-black/40">
                                                Premium
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                                                <p className="mt-2 text-sm text-slate-400 line-clamp-2">{product.description}</p>
                                            </div>
                                            <span className="text-lg font-semibold text-gold-300">R$ {product.price}</span>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between gap-3">
                                            <button className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-gold-400 hover:bg-white/15">
                                                Detalhes
                                            </button>
                                            <button className="inline-flex h-12 min-w-[3rem] items-center justify-center rounded-full bg-gold-500 text-neutral-950 transition hover:bg-gold-400">
                                                <ShoppingBag className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </motion.article>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
