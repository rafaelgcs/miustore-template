import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Search, Tag, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, promotions, filters = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const { delete: destroy } = useForm();

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        router.get(route('admin.promotions.index'), { search: searchTerm }, { preserveState: true });
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
        if (confirm('Tem certeza que deseja excluir esta promoção?')) {
            destroy(route('admin.promotions.destroy', id));
        }
    };

    const getBadgeColor = (type) => {
        switch (type) {
            case 'percentage': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
            case 'fixed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
            case 'buy_x_get_y': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400';
        }
    };

    const getTypeText = (type) => {
        switch (type) {
            case 'percentage': return 'Porcentagem';
            case 'fixed': return 'Valor Fixo';
            case 'buy_x_get_y': return 'Compre X, Leve Y';
            default: return type;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Promoções</h2>}
        >
            <Head title="Gerenciar Promoções" />

            <div className="space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Buscar promoções..."
                                className="w-full rounded-2xl border-slate-200 bg-white/50 pl-10 pr-4 py-2.5 text-sm backdrop-blur-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>
                    <Link
                        href={route('admin.promotions.create')}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                    >
                        <Plus className="h-4 w-4" />
                        Nova Promoção
                    </Link>
                </div>

                {/* Promotions Table */}
                <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200/50 bg-slate-50/50 dark:border-white/5 dark:bg-white/5">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Promoção</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tipo</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Valor/Regra</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Período</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                                {promotions.data.map((promotion) => (
                                    <tr key={promotion.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-500/10 dark:text-gold-500">
                                                    <Tag className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{promotion.name}</p>
                                                    <p className="text-xs text-slate-500 truncate max-w-[200px]">{promotion.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${getBadgeColor(promotion.type)}`}>
                                                {getTypeText(promotion.type)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                {promotion.type === 'percentage' && `${promotion.value}% OFF`}
                                                {promotion.type === 'fixed' && `R$ ${promotion.value} OFF`}
                                                {promotion.type === 'buy_x_get_y' && `Compre ${promotion.buy_quantity} leve ${promotion.get_quantity}`}
                                            </div>
                                            {promotion.min_order_amount > 0 && (
                                                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Mín: R$ {promotion.min_order_amount}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                                <Calendar className="h-3 w-3" />
                                                {promotion.start_date ? new Date(promotion.start_date).toLocaleDateString() : 'Imediato'}
                                                <span>-</span>
                                                {promotion.end_date ? new Date(promotion.end_date).toLocaleDateString() : 'Indeterminado'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {promotion.is_active ? (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-500">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    Ativa
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                                    <XCircle className="h-3.5 w-3.5" />
                                                    Inativa
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.promotions.edit', promotion.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-gold-500/50 dark:hover:bg-gold-500/10 dark:hover:text-gold-500"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(promotion.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {promotions.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                            Nenhuma promoção encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination links={promotions.links} />
            </div>
        </AuthenticatedLayout>
    );
}
