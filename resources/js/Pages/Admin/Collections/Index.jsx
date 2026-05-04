import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Search, Layers, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, collections, filters = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const { delete: destroy } = useForm();

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        router.get(route('admin.collections.index'), { search: searchTerm }, { preserveState: true });
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters.search || '')) {
                handleSearch();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta coleção?')) {
            destroy(route('admin.collections.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Coleções</h2>}
        >
            <Head title="Gerenciar Coleções" />

            <div className="space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Buscar coleções..."
                                className="w-full rounded-2xl border-slate-200 bg-white/50 pl-10 pr-4 py-2.5 text-sm backdrop-blur-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>
                    <Link
                        href={route('admin.collections.create')}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
                    >
                        <Plus className="h-4 w-4" />
                        Nova Coleção
                    </Link>
                </div>

                {/* Collections Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.data.map((collection) => (
                        <div key={collection.id} className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition hover:border-gold-300 dark:border-white/10 dark:bg-slate-950/80 dark:hover:border-gold-500/50">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={route('admin.collections.edit', collection.id)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-gold-500/50 dark:hover:bg-gold-500/10 dark:hover:text-gold-500"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(collection.id)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{collection.name}</h3>
                            <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                                {collection.description || 'Nenhuma descrição fornecida.'}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <Package className="h-4 w-4 text-gold-500" />
                                <span>{collection.products_count} Produtos</span>
                            </div>

                            {collection.image && (
                                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5">
                                    <img src={`/storage/${collection.image}`} alt={collection.name} className="h-32 w-full object-cover transition duration-500 group-hover:scale-110" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {collections.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
                        <Layers className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-700" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Nenhuma coleção encontrada</h3>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">Comece criando sua primeira coleção de produtos.</p>
                        <Link
                            href={route('admin.collections.create')}
                            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-6 py-2.5 text-sm font-bold text-neutral-950 transition hover:bg-gold-400"
                        >
                            <Plus className="h-4 w-4" />
                            Nova Coleção
                        </Link>
                    </div>
                )}

                <Pagination links={collections.links} />
            </div>
        </AuthenticatedLayout>
    );
}
