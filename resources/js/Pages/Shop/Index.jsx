import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight, Search, Heart, ShoppingCart } from 'lucide-react';
import ThemeToggle from '@/Components/ThemeToggle';
import AddToCartButton from '@/Components/AddToCartButton';

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

export default function Index({ featuredProducts, categories, newArrivals, carouselItems, campaigns, filters, auth, userFavorites = [] }) {
    const { post } = useForm();
    const isLoggedIn = !!auth?.user;
    const selectedCategory = filters?.category ?? '';
    const searchValue = filters?.search ?? '';

    const toggleFavorite = (productId) => {
        if (!isLoggedIn) {
            window.location.href = route('login');
            return;
        }
        post(route('client.favorites.toggle', productId), {
            preserveScroll: true,
        });
    };
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans">
            <Head title="Miu Store" />

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-black/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                            M
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.32em] text-slate-400 dark:text-slate-400">Miu Store</p>
                            <h1 className="text-lg font-semibold tracking-wide text-black dark:text-white">Joias & Bem-estar</h1>
                        </div>
                    </div>
                    <div className="hidden items-center gap-8 md:flex">
                        <Link href={route('products.index')} className="text-sm text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 transition font-medium">Produtos</Link>
                        <Link href="#colecoes" className="text-sm text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 transition font-medium">Coleções</Link>
                        <Link href="#destaques" className="text-sm text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 transition font-medium">Destaques</Link>
                        <Link href="#contato" className="text-sm text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 transition font-medium">Contato</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link
                            href={route('products.index')}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition"
                            aria-label="Buscar produtos"
                            title="Buscar produtos"
                        >
                            <Search className="h-5 w-5" />
                        </Link>
                        <Link
                            href={route('cart.index')}
                            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {usePage().props.cart?.count > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-neutral-950 shadow-lg shadow-gold-500/20">
                                    {usePage().props.cart.count}
                                </span>
                            )}
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <Link href={route('client.dashboard')} className="hidden rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-sm text-slate-600 dark:text-slate-200 transition hover:bg-slate-200 dark:hover:bg-white/10 md:inline-flex">
                                    Minha Conta
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="hidden rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-sm text-slate-600 dark:text-slate-200 transition hover:bg-slate-200 dark:hover:bg-white/10 md:inline-flex">
                                    Entrar
                                </Link>
                            </>
                        )}
                        <Link href={route('register')} className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400">
                            Comprar
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-28">
                <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 dark:from-slate-900/50 to-white dark:to-neutral-950">
                    <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-gold-500/10 blur-3xl" />
                    <div className="absolute left-1/2 top-24 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-gold-400/5 dark:bg-white/5 blur-3xl" />
                    <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="relative z-10">
                            <span className="inline-flex rounded-full border border-gold-300 dark:border-gold-500/20 bg-gold-50 dark:bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.28em] text-gold-700 dark:text-gold-200 shadow-sm shadow-gold-500/10">
                                Novidade</span>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-black dark:text-white sm:text-6xl"
                            >
                                Joias refinadas para ocasiões inesquecíveis.
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300"
                            >
                                Descubra peças com acabamento premium, atenção aos detalhes e embalagens especiais para presente.
                            </motion.p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link href={route('products.index')} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:shadow-gold-500/40">
                                    Ver Produtos
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="#colecoes" className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-6 py-3 text-sm text-slate-700 dark:text-slate-200 transition hover:border-gold-400 hover:bg-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
                                    Conheça a coleção
                                </Link>
                            </div>

                            <form method="get" action={route('products.index')} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    name="search"
                                    defaultValue={searchValue}
                                    placeholder="Buscar joias, coleções ou estilos"
                                    className="min-w-0 flex-1 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-gold-400 dark:focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
                                />
                                <input type="hidden" name="category" value={selectedCategory} />
                                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:shadow-gold-500/40">
                                    Buscar
                                </button>
                            </form>

                            <div className="mt-14 grid gap-4 sm:grid-cols-3">
                                {sections.map((section) => (
                                    <div key={section.title} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5 text-slate-700 dark:text-slate-200 shadow-md dark:shadow-xl shadow-slate-200/5 dark:shadow-black/10">
                                        <h3 className="text-base font-semibold text-black dark:text-white">{section.title}</h3>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{section.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-x-0 top-0 h-full rounded-[2rem] bg-gradient-to-br from-slate-100 dark:from-white/10 via-transparent to-transparent blur-2xl" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 shadow-lg dark:shadow-2xl shadow-slate-200/30 dark:shadow-black/20">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-100 dark:from-white/10 to-slate-50 dark:to-white/5 p-6 shadow-md dark:shadow-lg shadow-slate-200/20 dark:shadow-black/30">
                                        <div className="flex h-20 items-center justify-center rounded-3xl bg-white dark:bg-neutral-950/80 text-slate-900 dark:text-white shadow-lg shadow-slate-200/30 dark:shadow-black/30">
                                            <span className="text-4xl font-semibold">∞</span>
                                        </div>
                                        <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">Colar em ouro rosé com fecho delicado e ondas fluidas.</p>
                                        <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                            <span>R$ 1.395</span>
                                            <span className="rounded-full border border-gold-300 dark:border-gold-500/30 bg-gold-50 dark:bg-gold-500/10 px-3 py-1 text-gold-700 dark:text-gold-200">Novo</span>
                                        </div>
                                    </div>
                                    <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-100 dark:from-white/10 to-slate-50 dark:to-white/5 p-6 shadow-md dark:shadow-lg shadow-slate-200/20 dark:shadow-black/30">
                                        <div className="flex h-20 items-center justify-center rounded-3xl bg-white dark:bg-neutral-950/80 text-slate-900 dark:text-white shadow-lg shadow-slate-200/30 dark:shadow-black/30">
                                            <span className="text-4xl font-semibold">✦</span>
                                        </div>
                                        <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">Brincos com acabamento polido e brilho sutil.</p>
                                        <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                            <span>R$ 895</span>
                                            <span className="rounded-full border border-gold-300 dark:border-gold-500/30 bg-gold-50 dark:bg-gold-500/10 px-3 py-1 text-gold-700 dark:text-gold-200">Best seller</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 rounded-[1.75rem] bg-gradient-to-br from-slate-900 dark:from-black/60 to-slate-800 dark:to-transparent p-8 backdrop-blur-2xl">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Atendimento personalizado</p>
                                    <h3 className="mt-5 text-3xl font-semibold text-black dark:text-white">Consultoria de presente</h3>
                                    <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">Combinações feitas para momentos especiais com entrega em embalagem premium.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="destaque-carrossel" className="px-4 pb-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-transparent">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Destaque</p>
                                <h2 className="mt-3 text-3xl font-semibold text-black dark:text-white sm:text-4xl">Campanhas em destaque</h2>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Promoções e histórias de produto com imagens inspiradoras.</p>
                        </div>

                        <div className="mt-8 grid gap-6 lg:grid-cols-3">
                            {carouselItems.map((item, index) => (
                                <div key={item.id} className="group relative overflow-hidden rounded-[2rem] bg-white/5 shadow-2xl shadow-black/20 transition hover:-translate-y-1">
                                    {item.image && (
                                        <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="relative p-8">
                                        <p className="text-sm uppercase tracking-[0.32em] text-gold-200">{item.subtitle}</p>
                                        <h3 className="mt-3 text-3xl font-semibold text-white">{item.title}</h3>
                                        <Link href={item.button_url || (item.product_id ? route('products.index', { search: item.title }) : '/')} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400">
                                            {item.button_text || 'Ver agora'}
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="campanhas" className="px-4 pb-24 sm:px-6 lg:px-8 bg-white dark:bg-transparent">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Campanhas</p>
                                <h2 className="mt-3 text-3xl font-semibold text-black dark:text-white sm:text-4xl">Promoções por categoria</h2>
                            </div>
                            <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">Cada campanha traz um produto selecionado e uma proposta de estilo.</p>
                        </div>

                        <div className="mt-8 grid gap-6 lg:grid-cols-3">
                            {campaigns.map((campaign) => (
                                <Link
                                    key={campaign.id}
                                    href={campaign.link || route('products.index', { category: campaign.category.slug })}
                                    className="group overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6 transition hover:border-gold-400 hover:bg-slate-100 dark:hover:bg-white/10"
                                >
                                    {campaign.image && (
                                        <div className="mb-5 overflow-hidden rounded-[1.5rem] bg-slate-200 dark:bg-black/10">
                                            <img src={campaign.image} alt={campaign.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">{campaign.category.name}</p>
                                        <h3 className="mt-3 text-2xl font-semibold text-black dark:text-white">{campaign.title}</h3>
                                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{campaign.subtitle}</p>
                                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 dark:text-gold-300">
                                            Ver campanha
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="colecoes" className="px-4 pb-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-transparent">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Coleções</p>
                                <h2 className="mt-3 text-3xl font-semibold text-black dark:text-white sm:text-4xl">Explore nossas categorias</h2>
                            </div>
                            <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">Joias atemporais criadas com cuidado para ocasiões importantes.</p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('products.index', { category: category.slug })}
                                    className={`inline-flex rounded-full border px-4 py-2 text-sm transition ${selectedCategory === category.slug ? 'border-gold-500 bg-gold-100 dark:bg-gold-500/10 text-gold-700 dark:text-white' : 'border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:border-gold-400 dark:hover:text-white'}`}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 grid gap-5 sm:grid-cols-3">
                            {categories.map((category) => (
                                <div key={category.id} className="group rounded-[1.75rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 transition hover:border-gold-400 hover:bg-slate-100 dark:hover:bg-white/10">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 dark:bg-gold-500/10 text-gold-600 dark:text-gold-200 shadow-md shadow-gold-500/10">
                                        <Heart className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-black dark:text-white">{category.name}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
                                    <p className="mt-2 text-xs text-gold-600 dark:text-gold-200">{category.products_count} produtos</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="novidades" className="px-4 pb-20 sm:px-6 lg:px-8 bg-white dark:bg-transparent">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Novidades</p>
                                <h2 className="mt-3 text-3xl font-semibold text-black dark:text-white sm:text-4xl">Chegadas recentes</h2>
                            </div>
                            <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">As últimas peças adicionadas à nossa coleção.</p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {newArrivals.map((product, index) => (
                                <motion.article
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="group overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-900/80 p-4 shadow-lg dark:shadow-2xl shadow-slate-200/30 dark:shadow-black/30 transition hover:-translate-y-1 hover:border-gold-400"
                                >
                                    <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-100 dark:bg-white/5 p-3">
                                        <div className="aspect-[4/5] overflow-hidden rounded-[1rem] bg-gradient-to-br from-slate-200 dark:from-white/10 via-slate-100 dark:via-white/5 to-white dark:to-white/0">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                                                    <ShoppingBag className="h-8 w-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute left-3 top-3 rounded-full border border-gold-300 dark:border-gold-500/30 bg-gold-50 dark:bg-black/60 px-2 py-1 text-xs uppercase tracking-[0.24em] text-gold-700 dark:text-gold-200 shadow-lg shadow-black/40">
                                            Novo
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-black dark:text-white line-clamp-1">{product.name}</h3>
                                        <p className="mt-1 text-xs text-gold-600 dark:text-gold-200">{product.category?.name}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gold-600 dark:text-gold-300">R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => toggleFavorite(product.id)}
                                                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${userFavorites.includes(product.id) ? 'bg-red-500 border-red-500 text-white' : 'border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-red-400 hover:text-red-500'}`}
                                                >
                                                    <Heart className={`h-4 w-4 ${userFavorites.includes(product.id) ? 'fill-current' : ''}`} />
                                                </button>
                                                <AddToCartButton product={product} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-neutral-950 transition hover:bg-gold-400">
                                                    <ShoppingBag className="h-4 w-4" />
                                                </AddToCartButton>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="destaques" className="px-4 pb-24 sm:px-6 lg:px-8 bg-slate-50 dark:bg-transparent">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Destaques</p>
                                <h2 className="mt-3 text-3xl font-semibold text-black dark:text-white sm:text-4xl">Peças selecionadas</h2>
                                {(searchValue || selectedCategory) && (
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        {searchValue && <>Busca por <span className="font-semibold text-black dark:text-white">"{searchValue}"</span>{selectedCategory ? ' · ' : null}</>}
                                        {selectedCategory && <>Categoria <span className="font-semibold text-black dark:text-white">{selectedCategory}</span></>}
                                    </p>
                                )}
                            </div>
                            <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">Cada joia é pensada para transmitir sofisticação e conforto.</p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                            {featuredProducts.length === 0 ? (
                                <div className="col-span-full rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-12 text-center text-slate-600 dark:text-slate-400">
                                    Nenhum produto cadastrado no momento.
                                </div>
                            ) : (
                                featuredProducts.map((product, index) => (
                                    <motion.article
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        className="group overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-900/80 p-6 shadow-lg dark:shadow-2xl shadow-slate-200/30 dark:shadow-black/30 transition hover:-translate-y-1 hover:border-gold-400"
                                    >
                                        <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100 dark:bg-white/5 p-4">
                                            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-200 dark:from-white/10 via-slate-100 dark:via-white/5 to-white dark:to-white/0">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                                                        <ShoppingBag className="h-12 w-12" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute left-4 top-4 rounded-full border border-gold-300 dark:border-gold-500/30 bg-gold-50 dark:bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold-700 dark:text-gold-200 shadow-lg shadow-black/40">
                                                {product.stock > 0 ? 'Disponível' : 'Esgotado'}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-black dark:text-white">{product.name}</h3>
                                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{product.description}</p>
                                                <p className="mt-1 text-xs text-gold-600 dark:text-gold-200">{product.category?.name}</p>
                                            </div>
                                            <span className="text-lg font-semibold text-gold-600 dark:text-gold-300">R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between gap-3">
                                            <Link href={route('products.show', product.slug)} className="inline-flex items-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/10 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 transition hover:border-gold-400 hover:bg-slate-200 dark:hover:bg-white/15">
                                                Detalhes
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => toggleFavorite(product.id)}
                                                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition ${userFavorites.includes(product.id) ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20' : 'border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:border-red-400 hover:text-red-500'}`}
                                                >
                                                    <Heart className={`h-5 w-5 ${userFavorites.includes(product.id) ? 'fill-current' : ''}`} />
                                                </button>
                                                <AddToCartButton product={product} className="inline-flex h-12 min-w-[3rem] items-center justify-center rounded-full bg-gold-500 text-neutral-950 transition hover:bg-gold-400">
                                                    <ShoppingBag className="h-5 w-5" />
                                                </AddToCartButton>
                                            </div>
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
