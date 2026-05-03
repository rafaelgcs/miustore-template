import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Tag, Calendar, Target, Check, X, Search, Info } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ auth, promotion, currentTargets, products, categories, collections }) {
    const { data, setData, put, processing, errors } = useForm({
        name: promotion.name || '',
        description: promotion.description || '',
        type: promotion.type || 'percentage',
        value: promotion.value || '',
        min_order_amount: promotion.min_order_amount || '',
        min_quantity: promotion.min_quantity || '',
        buy_quantity: promotion.buy_quantity || '',
        get_quantity: promotion.get_quantity || '',
        start_date: promotion.start_date ? promotion.start_date.substring(0, 16) : '',
        end_date: promotion.end_date ? promotion.end_date.substring(0, 16) : '',
        is_active: promotion.is_active,
        targets: currentTargets.map(t => ({ ...t, name: getTargetName(t.type, t.id) })),
    });

    const [targetSearch, setTargetSearch] = useState('');
    const [targetType, setTargetType] = useState('product');

    function getTargetName(type, id) {
        if (type === 'product') return products.find(p => p.id === id)?.name;
        if (type === 'category') return categories.find(c => c.id === id)?.name;
        if (type === 'collection') return collections.find(c => c.id === id)?.name;
        return '';
    };

    const getFilteredTargets = () => {
        let items = [];
        if (targetType === 'product') items = products;
        else if (targetType === 'category') items = categories;
        else if (targetType === 'collection') items = collections;

        return items.filter(item =>
            item.name.toLowerCase().includes(targetSearch.toLowerCase())
        );
    };

    const toggleTarget = (type, id) => {
        const exists = data.targets.some(t => t.type === type && t.id === id);
        if (exists) {
            setData('targets', data.targets.filter(t => !(t.type === type && t.id === id)));
        } else {
            setData('targets', [...data.targets, { type, id, name: getTargetName(type, id) }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.promotions.update', promotion.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.promotions.index')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Editar Promoção</h2>
                </div>
            }
        >
            <Head title={`Editar ${promotion.name}`} />

            <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                    <Tag className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Regras da Promoção</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Ajuste as configurações desta oferta.</p>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Nome da Promoção</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ex: Oferta de Natal, Black Friday..."
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo de Desconto</label>
                                    <select
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                    >
                                        <option value="percentage">Porcentagem (%)</option>
                                        <option value="fixed">Valor Fixo (R$)</option>
                                        <option value="buy_x_get_y">Compre X, Leve Y</option>
                                    </select>
                                </div>

                                {data.type !== 'buy_x_get_y' ? (
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {data.type === 'percentage' ? 'Porcentagem de Desconto' : 'Valor de Desconto'}
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                            value={data.value}
                                            onChange={(e) => setData('value', e.target.value)}
                                            placeholder={data.type === 'percentage' ? '15' : '50.00'}
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Comprou (X)</label>
                                            <input
                                                type="number"
                                                className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                                value={data.buy_quantity}
                                                onChange={(e) => setData('buy_quantity', e.target.value)}
                                                placeholder="2"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Levou (Y)</label>
                                            <input
                                                type="number"
                                                className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                                value={data.get_quantity}
                                                onChange={(e) => setData('get_quantity', e.target.value)}
                                                placeholder="3"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="md:col-span-2 border-t border-slate-100 pt-6 dark:border-white/5">
                                    <div className="mb-4 flex items-center gap-2 text-gold-600 dark:text-gold-500">
                                        <Info className="h-4 w-4" />
                                        <span className="text-sm font-bold uppercase tracking-wider">Restrições Adicionais</span>
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Valor Mínimo do Pedido (R$)</label>
                                            <input
                                                type="number"
                                                className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                                value={data.min_order_amount}
                                                onChange={(e) => setData('min_order_amount', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Qtd Mínima de Itens</label>
                                            <input
                                                type="number"
                                                className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                                value={data.min_quantity}
                                                onChange={(e) => setData('min_quantity', e.target.value)}
                                                placeholder="1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Targets Selection */}
                        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                    <Target className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Onde Aplicar?</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Modifique os produtos, categorias ou coleções afetadas.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-white/5">
                                    {['product', 'category', 'collection'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setTargetType(type)}
                                            className={`flex-1 rounded-xl py-2 text-xs font-bold uppercase tracking-wider transition ${targetType === type
                                                ? 'bg-white text-gold-600 shadow-sm dark:bg-slate-900 dark:text-gold-500'
                                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            {type === 'product' ? 'Produtos' : type === 'category' ? 'Categorias' : 'Coleções'}
                                        </button>
                                    ))}
                                </div>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder={`Buscar ${targetType === 'product' ? 'produtos' : targetType === 'category' ? 'categorias' : 'coleções'}...`}
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 pl-10 pr-4 py-2.5 text-sm backdrop-blur-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={targetSearch}
                                        onChange={(e) => setTargetSearch(e.target.value)}
                                    />
                                </div>

                                <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar md:grid-cols-2">
                                    {getFilteredTargets().map(item => {
                                        const isSelected = data.targets.some(t => t.type === targetType && t.id === item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => toggleTarget(targetType, item.id)}
                                                className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${isSelected
                                                    ? 'border-gold-500 bg-gold-500/10 text-gold-700 dark:text-gold-500'
                                                    : 'border-slate-100 bg-white/50 text-slate-600 hover:border-gold-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400'
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{item.name}</span>
                                                {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4 opacity-30" />}
                                            </button>
                                        );
                                    })}
                                </div>

                                {data.targets.length > 0 && (
                                    <div className="border-t border-slate-100 pt-6 dark:border-white/5">
                                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Selecionados ({data.targets.length})</p>
                                        <div className="flex flex-wrap gap-2">
                                            {data.targets.map((t, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-2 rounded-xl bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-gold-700 dark:text-gold-500">
                                                    <span className="opacity-50 uppercase text-[10px]">{t.type}:</span> {t.name}
                                                    <button type="button" onClick={() => toggleTarget(t.type, t.id)} className="hover:text-red-500">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Config */}
                    <div className="space-y-8">
                        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100">Agendamento</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Data de Início</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Data de Término</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
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
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Promoção Ativa</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                            <h3 className="mb-4 font-bold text-slate-900 dark:text-slate-100">Resumo</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Tipo:</span>
                                    <span className="font-semibold text-gold-600">{data.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Valor:</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                                        {data.type === 'buy_x_get_y' ? `Leva ${data.get_quantity || 0}` : data.value || '0'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Alvos:</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-100">{data.targets.length} selecionados</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-8 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-50"
                            >
                                <Save className="h-5 w-5" />
                                {processing ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
