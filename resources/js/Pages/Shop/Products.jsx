import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Search, ArrowRight, ShoppingBag, Heart, ShoppingCart, ChevronDown, ChevronUp, Filter, X, Star } from 'lucide-react';
import ThemeToggle from '@/Components/ThemeToggle';
import AddToCartButton from '@/Components/AddToCartButton';
import ShopNavbar from '@/Components/ShopNavbar';
import Footer from '@/Components/Footer';
import ProductOptionsModal from '@/Components/ProductOptionsModal';

export default function Products({ products, categories, types, filters, auth, userFavorites = [], currentCollection = null, currentCategory = null }) {
    const { post } = useForm();
    const productList = products.data || [];
    const isLoggedIn = !!auth?.user;
    const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
    const [selectedProductForOptions, setSelectedProductForOptions] = useState(null);

    const toggleFavorite = (productId) => {
        if (!isLoggedIn) {
            window.location.href = route('login');
            return;
        }
        post(route('client.favorites.toggle', productId), {
            preserveScroll: true,
        });
    };

    const activeFiltersCount = [
        filters.search,
        filters.category,
        filters.type,
        filters.color,
        filters.collection
    ].filter(Boolean).length;

    // Determine page title and description
    let pageSubtitle = "Catálogo";
    let pageTitle = "Encontre a peça ideal";
    let pageDescription = "Filtre por categoria, tipo e cor para encontrar produtos personalizados.";

    if (currentCollection) {
        pageSubtitle = "Coleção";
        pageTitle = currentCollection.name;
        pageDescription = currentCollection.description || pageDescription;
    } else if (currentCategory) {
        pageSubtitle = "Categoria";
        pageTitle = currentCategory.name;
        pageDescription = currentCategory.description || pageDescription;
    } else if (filters.search) {
        pageSubtitle = "Busca";
        pageTitle = `Resultados para "${filters.search}"`;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans">
            <Head title={currentCollection?.name || currentCategory?.name || "Produtos"} />

            <ShopNavbar />

            <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-black/70 px-4 py-20 backdrop-blur-xl pt-36 sm:px-6 lg:px-8">
                {/* Background Decoration */}
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-[100px]" />
                <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-gold-500/5 blur-[100px]" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-xs font-bold uppercase tracking-[0.4em] text-gold-600 dark:text-gold-400">{pageSubtitle}</p>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
                                {pageTitle}
                            </h1>
                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                {pageDescription}
                            </p>
                        </div>
                    </div>

                    <form method="get" action={route('products.index')} className="mt-12 grid gap-6 lg:grid-cols-[1fr_350px]">
                        <div className="space-y-6">
                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-1">
                                <div className="flex items-center gap-3 px-6 py-4">
                                    <Search className="h-5 w-5 text-slate-400" />
                                    <input
                                        name="search"
                                        defaultValue={filters.search}
                                        placeholder="O que você está procurando hoje?"
                                        className="flex-1 bg-transparent text-lg text-slate-900 dark:text-slate-100 border-none outline-none placeholder:text-slate-400"
                                    />
                                    {filters.search && (
                                        <Link href={route('products.index', { ...filters, search: '' })} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                            <X className="h-5 w-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="group relative">
                                    <label className="block rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-4 transition-all hover:border-gold-500/50">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Categoria</span>
                                        <select
                                            name="category"
                                            defaultValue={filters.category || ''}
                                            className="mt-1 w-full bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 outline-none border-none appearance-none cursor-pointer shadow-md rounded-xl"
                                        >
                                            <option value="">Todas as categorias</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.slug} className="dark:bg-neutral-900">
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <ChevronDown className="absolute right-4 bottom-4 h-4 w-4 text-slate-400 pointer-events-none" /> */}
                                    </label>
                                </div>

                                <div className="group relative">
                                    <label className="block rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-4 transition-all hover:border-gold-500/50">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tipo</span>
                                        <select
                                            name="type"
                                            defaultValue={filters.type || ''}
                                            className="mt-1 w-full bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 outline-none border-none appearance-none cursor-pointer shadow-md rounded-xl"
                                        >
                                            <option value="">Todos os tipos</option>
                                            {types.map((type) => (
                                                <option key={type} value={type} className="dark:bg-neutral-900">
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <ChevronDown className="absolute right-4 bottom-4 h-4 w-4 text-slate-400 pointer-events-none" /> */}
                                    </label>
                                </div>

                                <div className="group relative">
                                    <label className="block rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-4 transition-all hover:border-gold-500/50">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cor</span>
                                        <input
                                            name="color"
                                            defaultValue={filters.color}
                                            placeholder="Ex: Ouro, Prata"
                                            className="mt-1 w-full bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 outline-none border-none shadow-md rounded-xl"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={`h-fit overflow-hidden rounded-[2rem] border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 transition-all duration-300 shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/40 ${isFiltersExpanded ? 'p-6' : 'p-4'}`}>
                            <button
                                type="button"
                                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                                className="flex w-full items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400">
                                        <Filter className="h-4 w-4" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-sm font-bold text-black dark:text-white">Filtros Ativos</h2>
                                        {!isFiltersExpanded && (
                                            <p className="text-[10px] text-slate-500">{activeFiltersCount} filtro(s) aplicado(s)</p>
                                        )}
                                    </div>
                                </div>
                                {isFiltersExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                            </button>

                            <div className={`grid transition-all duration-300 ease-in-out ${isFiltersExpanded ? 'mt-6 opacity-100 mb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                                        <span className="font-medium">Busca</span>
                                        <span className="font-bold text-black dark:text-white">{filters.search || '—'}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                                        <span className="font-medium">Categoria</span>
                                        <span className="font-bold text-black dark:text-white">{currentCategory?.name || filters.category || 'Todas'}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                                        <span className="font-medium">Tipo</span>
                                        <span className="font-bold text-black dark:text-white">{filters.type || 'Todos'}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                                        <span className="font-medium">Cor</span>
                                        <span className="font-bold text-black dark:text-white">{filters.color || 'Todas'}</span>
                                    </div>
                                    {currentCollection && (
                                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                                            <span className="font-medium">Coleção</span>
                                            <span className="font-bold text-black dark:text-white">{currentCollection.name}</span>
                                        </div>
                                    )}
                                </div>

                                {activeFiltersCount > 0 && (
                                    <Link
                                        href={route('products.index')}
                                        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-200 dark:border-white/10 px-5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 transition hover:bg-slate-50 dark:hover:bg-white/5"
                                    >
                                        Limpar Filtros
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-transparent">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-8">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.4em] text-gold-600 dark:text-gold-400">Explorar</p>
                            <h2 className="mt-2 text-3xl font-bold text-black dark:text-white">Vitrine de Produtos</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-black dark:text-white">{products.total}</p>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Itens Disponíveis</p>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {productList.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10 p-20 text-center">
                                <div className="rounded-full bg-slate-100 dark:bg-white/5 p-6 text-slate-400">
                                    <ShoppingBag className="h-12 w-12" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-black dark:text-white">Nenhum produto encontrado</h3>
                                <p className="mt-2 text-slate-500 dark:text-slate-400">Tente ajustar seus filtros para encontrar o que procura.</p>
                                <Link href={route('products.index')} className="mt-8 rounded-full bg-gold-500 px-8 py-3 font-bold text-neutral-950 transition hover:bg-gold-400">
                                    Ver todos os produtos
                                </Link>
                            </div>
                        ) : (
                            productList.map((product) => (
                                <Link
                                    key={product.id}
                                    href={route('products.show', { product: product.slug })}
                                    className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 bg-white dark:bg-neutral-900/40 p-4 transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-white/5">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-slate-300 dark:text-slate-700">
                                                <ShoppingBag className="h-16 w-16" />
                                            </div>
                                        )}

                                        {/* Floating Badge */}
                                        <div className="absolute left-4 top-4 rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white backdrop-blur-md">
                                            {product.category?.name}
                                        </div>

                                        {product.reviews_count > 0 && (
                                            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                                                <Star className="h-2.5 w-2.5 fill-gold-500 text-gold-500" />
                                                {product.average_rating}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col p-4">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-xl font-bold text-black dark:text-white transition group-hover:text-gold-600 dark:group-hover:text-gold-400">
                                                {product.name}
                                            </h3>
                                        </div>

                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                            {product.description}
                                        </p>

                                        <div className="mt-auto pt-6 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Investimento</span>
                                                <span className="text-xl font-black text-black dark:text-white">
                                                    R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleFavorite(product.id);
                                                    }}
                                                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${userFavorites.includes(product.id) ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30' : 'border-slate-200 dark:border-white/10 text-slate-400 hover:border-red-500 hover:text-red-500'}`}
                                                >
                                                    <Heart className={`h-5 w-5 ${userFavorites.includes(product.id) ? 'fill-current' : ''}`} />
                                                </button>
                                                <AddToCartButton
                                                    product={product}
                                                    onShowOptions={setSelectedProductForOptions}
                                                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 transition-all duration-300 hover:bg-gold-400 hover:scale-110 active:scale-95"
                                                >
                                                    <ShoppingCart className="h-5 w-5" />
                                                </AddToCartButton>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {products.last_page > 1 && (
                        <div className="mt-20 flex flex-wrap items-center justify-center gap-4">
                            {products.prev_page_url ? (
                                <Link href={products.prev_page_url} className="flex h-12 items-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-8 text-sm font-bold text-black dark:text-white transition hover:border-gold-500">
                                    Anterior
                                </Link>
                            ) : (
                                <span className="flex h-12 items-center rounded-full border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 px-8 text-sm font-bold text-slate-400">Anterior</span>
                            )}

                            <div className="flex h-12 items-center rounded-full bg-slate-100 dark:bg-white/5 px-6 text-sm font-bold text-black dark:text-white">
                                {products.current_page} / {products.last_page}
                            </div>

                            {products.next_page_url ? (
                                <Link href={products.next_page_url} className="flex h-12 items-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-8 text-sm font-bold text-black dark:text-white transition hover:border-gold-500">
                                    Próxima
                                </Link>
                            ) : (
                                <span className="flex h-12 items-center rounded-full border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 px-8 text-sm font-bold text-slate-400">Próxima</span>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />

            <ProductOptionsModal
                product={selectedProductForOptions}
                isOpen={!!selectedProductForOptions}
                onClose={() => setSelectedProductForOptions(null)}
            />
        </div>
    );
}
