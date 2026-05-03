import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Search, ArrowRight, ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import ThemeToggle from '@/Components/ThemeToggle';
import AddToCartButton from '@/Components/AddToCartButton';

export default function Products({ products, categories, types, filters, auth, userFavorites = [] }) {
    const { post } = useForm();
    const productList = products.data || [];
    const isLoggedIn = !!auth?.user;

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
            <Head title="Produtos" />

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
                            href={route('cart.index')}
                            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 transition hover:border-gold-400 dark:hover:text-white"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {usePage().props.cart?.count > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-neutral-950 shadow-lg shadow-gold-500/20">
                                    {usePage().props.cart.count}
                                </span>
                            )}
                        </Link>
                        <Link href={route('home')} className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-5 py-2 text-sm text-slate-700 dark:text-slate-200 transition hover:border-gold-400 dark:hover:text-white">
                            Voltar
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-black/70 px-4 py-20 backdrop-blur-xl pt-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Catálogo</p>
                            <h1 className="mt-3 text-4xl font-semibold text-black dark:text-white">Encontre a peça ideal</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Filtre por categoria, tipo e cor para encontrar produtos personalizados.
                            </p>
                        </div>
                    </div>

                    <form method="get" action={route('products.index')} className="mt-8 grid gap-4 lg:grid-cols-[1.7fr_0.9fr]">
                        <div className="space-y-4">
                            <label className="block rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                                <span className="text-sm text-slate-700 dark:text-slate-300">Buscar produtos</span>
                                <div className="mt-3 flex items-center gap-3 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-950/90 px-4 py-2">
                                    <Search className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                                    <input
                                        name="search"
                                        defaultValue={filters.search}
                                        placeholder="Digite o nome, material ou estilo"
                                        className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 border-none outline-none placeholder:text-slate-500 dark:placeholder:text-slate-500"
                                    />
                                </div>
                            </label>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <label className="block rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Categoria</span>
                                    <select
                                        name="category"
                                        defaultValue={filters.category || ''}
                                        className="mt-3 w-full rounded-2xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none"
                                    >
                                        <option value="">Todas</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.slug}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Tipo</span>
                                    <select
                                        name="type"
                                        defaultValue={filters.type || ''}
                                        className="mt-3 w-full rounded-2xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none"
                                    >
                                        <option value="">Todos</option>
                                        {types.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Cor</span>
                                    <input
                                        name="color"
                                        defaultValue={filters.color}
                                        placeholder="Ex: Ouro, Prata, Rosa"
                                        className="mt-3 w-full rounded-2xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lg dark:shadow-2xl shadow-slate-200/30 dark:shadow-black/20">
                            <h2 className="text-lg font-semibold text-black dark:text-white">Filtros ativos</h2>
                            <div className="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-300">
                                <div>
                                    <p className="text-slate-600 dark:text-slate-400">Pesquisa</p>
                                    <p className="mt-1 text-black dark:text-white">{filters.search || 'Nenhuma pesquisa'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-600 dark:text-slate-400">Categoria</p>
                                    <p className="mt-1 text-black dark:text-white">{filters.category || 'Todas'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-600 dark:text-slate-400">Tipo</p>
                                    <p className="mt-1 text-black dark:text-white">{filters.type || 'Todos'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-600 dark:text-slate-400">Cor</p>
                                    <p className="mt-1 text-black dark:text-white">{filters.color || 'Todas'}</p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400"
                            >
                                Aplicar filtros
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-transparent">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.32em] text-gold-600 dark:text-gold-200">Produtos</p>
                            <h2 className="mt-3 text-3xl font-semibold text-black dark:text-white">Resultados da busca</h2>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Mostrando {productList.length} de {products.total} itens</p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {productList.length === 0 ? (
                            <div className="col-span-full rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-12 text-center text-slate-600 dark:text-slate-400">
                                Nenhum produto encontrado com esses filtros.
                            </div>
                        ) : (
                            productList.map((product) => (
                                <Link
                                    key={product.id}
                                    href={route('products.show', { product: product.slug })}
                                    className="group overflow-hidden rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-neutral-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 shadow-sm hover:shadow-xl dark:shadow-lg shadow-slate-200/50 dark:shadow-black/20"
                                >
                                    <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-50 dark:bg-white/5 p-4">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-64 items-center justify-center text-slate-400 dark:text-slate-500">
                                                <ShoppingBag className="h-10 w-10" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <div className="flex items-center justify-between gap-3 text-slate-600 dark:text-slate-400">
                                            <span>{product.category?.name}</span>
                                            {product.type && <span>{product.type}</span>}
                                        </div>
                                        <h3 className="mt-3 text-xl font-semibold text-black dark:text-white">{product.name}</h3>
                                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300 line-clamp-3">
                                            {product.description}
                                        </p>
                                        <div className="mt-5 flex items-center justify-between gap-4">
                                            <span className="text-lg font-semibold text-gold-600 dark:text-gold-300">R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleFavorite(product.id);
                                                    }}
                                                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${userFavorites.includes(product.id) ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20' : 'border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-red-400 hover:text-red-500'}`}
                                                >
                                                    <Heart className={`h-4.5 w-4.5 ${userFavorites.includes(product.id) ? 'fill-current' : ''}`} />
                                                </button>
                                                <AddToCartButton product={product} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-neutral-950 transition hover:bg-gold-400">
                                                    <ShoppingBag className="h-4.5 w-4.5" />
                                                </AddToCartButton>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {products.last_page > 1 && (
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                            {products.prev_page_url ? (
                                <Link href={products.prev_page_url} className="rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 hover:border-gold-400">
                                    Anterior
                                </Link>
                            ) : (
                                <span className="rounded-full border border-slate-300 dark:border-white/10 bg-slate-200 dark:bg-slate-900/70 px-4 py-2 text-slate-500 dark:text-slate-500">Anterior</span>
                            )}
                            <span className="px-4 py-2">Página {products.current_page} de {products.last_page}</span>
                            {products.next_page_url ? (
                                <Link href={products.next_page_url} className="rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 hover:border-gold-400">
                                    Próxima
                                </Link>
                            ) : (
                                <span className="rounded-full border border-slate-300 dark:border-white/10 bg-slate-200 dark:bg-slate-900/70 px-4 py-2 text-slate-500 dark:text-slate-500">Próxima</span>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
