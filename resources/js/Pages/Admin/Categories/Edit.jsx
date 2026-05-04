import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Folder } from 'lucide-react';
import { toast } from 'sonner';

export default function Edit({ auth, category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
    });

    const fullUrl = `${window.location.origin}/produtos?category=${data.slug}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl);
        toast.success('URL copiada para a área de transferência!');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.categories.index')}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Editar Categoria</h2>
                </div>
            }
        >
            <Head title={`Editar ${category.name}`} />

            <div className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-500">
                                <Folder className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Editar Categoria</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Atualize as informações da categoria.</p>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Nome da Categoria</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50 ${errors.name ? 'border-red-500' : ''}`}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">URL Slug</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50 ${errors.slug ? 'border-red-500' : ''}`}
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                    />
                                    {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
                                </div>
                            </div>

                            {category.slug && (
                                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500">URL da Categoria</label>
                                    <div className="flex items-center gap-3">
                                        <code className="flex-1 text-xs text-gold-600 dark:text-gold-400 break-all">{fullUrl}</code>
                                        <button
                                            type="button"
                                            onClick={copyToClipboard}
                                            className="rounded-lg bg-gold-500 px-3 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-gold-400"
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Descrição (Opcional)</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-2xl border-slate-200 bg-white/50 px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Descreva o propósito desta categoria..."
                                />
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href={route('admin.categories.index')}
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
