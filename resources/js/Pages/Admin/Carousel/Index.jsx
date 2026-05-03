import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Image as ImageIcon, Eye, EyeOff, ArrowUpDown } from 'lucide-react';

export default function Index({ auth, carouselItems }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este item do carrossel?')) {
            destroy(route('admin.carousel.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                            Banner Principal
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Gerencie os banners de destaque da página inicial (estilo Havaianas).
                        </p>
                    </div>
                    <Link
                        href={route('admin.carousel.create')}
                        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Banner
                    </Link>
                </div>
            }
        >
            <Head title="Gerenciar Carrossel" />

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {carouselItems.length === 0 ? (
                        <div className="col-span-full rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-slate-100">Nenhum banner cadastrado</h3>
                            <p className="mt-2 text-sm text-slate-500">Comece criando um novo banner para sua loja.</p>
                            <Link
                                href={route('admin.carousel.create')}
                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500 px-6 py-2 text-sm font-semibold text-gold-600 hover:bg-gold-50 transition"
                            >
                                Criar Banner
                            </Link>
                        </div>
                    ) : (
                        carouselItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950/95"
                            >
                                <div className="aspect-[21/9] overflow-hidden bg-slate-100 dark:bg-slate-900">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <ImageIcon className="h-12 w-12 text-slate-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${item.active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                            {item.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                            {item.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-black/60 text-slate-600 dark:text-slate-200 backdrop-blur-md border border-white/20">
                                            #{item.order}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100 line-clamp-1">{item.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{item.subtitle || 'Sem descrição'}</p>
                                    
                                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route('admin.carousel.edit', item.id)}
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 transition"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            Ordem: {item.order}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
                
                {carouselItems.length > 0 && (
                    <div className="rounded-[2rem] border border-gold-200 bg-gold-50/30 p-6 dark:border-gold-500/10 dark:bg-gold-500/5">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400">
                                <ArrowUpDown className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-950 dark:text-slate-100 text-sm">Dica de Layout</h4>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Os banners aparecem na ordem definida. Se não houver nenhum banner ativo, o sistema mostrará automaticamente o "Fallback Hero" configurado nas configurações da home.
                                </p>
                                <Link href={route('admin.home-settings.edit')} className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-gold-600 hover:text-gold-700 underline underline-offset-4">
                                    Configurar Fallback
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
