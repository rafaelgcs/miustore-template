import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Ticket, Calendar, Info, RefreshCw } from 'lucide-react';

export default function Edit({ auth, coupon, promotions }) {
    const { data, setData, put, processing, errors } = useForm({
        promotion_id: coupon.promotion_id || '',
        code: coupon.code || '',
        usage_limit: coupon.usage_limit || '',
        usage_limit_per_user: coupon.usage_limit_per_user || '1',
        expiry_date: coupon.expiry_date ? coupon.expiry_date.substring(0, 16) : '',
        is_active: coupon.is_active,
    });

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setData('code', result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.coupons.update', coupon.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.coupons.index')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Editar Cupom</h2>
                </div>
            }
        >
            <Head title={`Editar ${coupon.code}`} />

            <div className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                <Ticket className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Editar Cupom</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Atualize as configurações deste cupom.</p>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Regra de Promoção (Backend)</label>
                                <select
                                    className={`w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50 ${errors.promotion_id ? 'border-red-500' : ''}`}
                                    value={data.promotion_id}
                                    onChange={(e) => setData('promotion_id', e.target.value)}
                                >
                                    <option value="">Selecione uma promoção...</option>
                                    {promotions.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                                {errors.promotion_id && <p className="mt-1 text-xs text-red-500">{errors.promotion_id}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Código do Cupom</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className={`flex-1 rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm font-mono font-bold uppercase tracking-widest transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50 ${errors.code ? 'border-red-500' : ''}`}
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="EX: VERÃO2024"
                                    />
                                    <button
                                        type="button"
                                        onClick={generateCode}
                                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10"
                                        title="Gerar código aleatório"
                                    >
                                        <RefreshCw className="h-5 w-5" />
                                    </button>
                                </div>
                                {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Limite de Uso Total</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.usage_limit}
                                        onChange={(e) => setData('usage_limit', e.target.value)}
                                        placeholder="Ilimitado"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Limite por Usuário</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.usage_limit_per_user}
                                        onChange={(e) => setData('usage_limit_per_user', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Data de Expiração</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 pl-10 pr-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.expiry_date}
                                        onChange={(e) => setData('expiry_date', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <div className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-gold-500 dark:bg-slate-800"></div>
                                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></div>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cupom Ativo</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href={route('admin.coupons.index')}
                            className="rounded-2xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-8 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
