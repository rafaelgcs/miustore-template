import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Search, Ticket, CheckCircle2, XCircle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, coupons, filters = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const { delete: destroy } = useForm();

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        router.get(route('admin.coupons.index'), { search: searchTerm }, { preserveState: true });
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
        if (confirm('Tem certeza que deseja excluir este cupom?')) {
            destroy(route('admin.coupons.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Cupons de Desconto</h2>}
        >
            <Head title="Gerenciar Cupons" />

            <div className="space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Buscar cupons por código..."
                                className="w-full rounded-2xl border-slate-200 bg-white/50 pl-10 pr-4 py-2.5 text-sm backdrop-blur-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>
                    <Link
                        href={route('admin.coupons.create')}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Cupom
                    </Link>
                </div>

                {/* Coupons Table */}
                <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200/50 bg-slate-50/50 dark:border-white/5 dark:bg-white/5">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Código</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Promoção Vinculada</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Uso</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Expiração</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                                {coupons.data.map((coupon) => (
                                    <tr key={coupon.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-500/10 dark:text-gold-500">
                                                    <Ticket className="h-5 w-5" />
                                                </div>
                                                <span className="font-mono font-bold tracking-wider text-slate-900 dark:text-slate-100 uppercase bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-lg">
                                                    {coupon.code}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{coupon.promotion?.name}</span>
                                                <span className="text-[10px] uppercase tracking-wider text-gold-600 font-bold">{coupon.promotion?.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                                                    <span>{coupon.used_count} USADOS</span>
                                                    <span>{coupon.usage_limit || '∞'} TOTAL</span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                                                    <div
                                                        className="h-full bg-gold-500 transition-all"
                                                        style={{ width: coupon.usage_limit ? `${(coupon.used_count / coupon.usage_limit) * 100}%` : '0%' }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-slate-600 dark:text-slate-400">
                                                {coupon.expiry_date ? new Date(coupon.expiry_date).toLocaleDateString() : 'Nunca expira'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {coupon.is_active ? (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-500">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    Ativo
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                                    <XCircle className="h-3.5 w-3.5" />
                                                    Inativo
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.coupons.edit', coupon.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-gold-500/50 dark:hover:bg-gold-500/10 dark:hover:text-gold-500"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(coupon.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {coupons.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                            Nenhum cupom encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination links={coupons.links} />
            </div>
        </AuthenticatedLayout>
    );
}
