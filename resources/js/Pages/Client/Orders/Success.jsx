import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, Package, Calendar } from 'lucide-react';

export default function Success({ auth, order }) {
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-200">
                    Pedido Confirmado
                </h2>
            }
        >
            <Head title="Pedido Confirmado" />

            <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 mb-6"
                    >
                        <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4"
                    >
                        Obrigado pelo seu pedido!
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Seu pedido <span className="font-bold text-gold-600 dark:text-gold-400">#{order.id}</span> foi agendado. Aguarde mensagem no Whatsapp para confirmação e finalizar o pedido.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 inline-flex items-start gap-3 rounded-3xl border border-green-200 bg-green-50/90 p-5 text-left text-sm text-slate-700 dark:border-green-500/30 dark:bg-green-950/40 dark:text-slate-100"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-200 text-green-800 dark:bg-green-500/20 dark:text-green-200">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Atenção</p>
                            <p>O pedido foi agendado. Em breve você receberá uma mensagem no WhatsApp para confirmar e finalizar o pedido.</p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden"
                >
                    <div className="p-8 border-b border-slate-100 dark:border-white/5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-bold">Data do Pedido</p>
                                    <p className="font-semibold text-slate-900 dark:text-white">{formatDate(order.created_at)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-bold">Status Atual</p>
                                    <p className="font-semibold text-gold-600 dark:text-gold-400 capitalize">Pendente</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Resumo dos Itens</h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-white/5 overflow-hidden flex-shrink-0">
                                        {item.product.image ? (
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <ShoppingBag className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{item.product.name}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Quantidade: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span className="text-slate-900 dark:text-white">Total do Pedido</span>
                                <span className="text-gold-600 dark:text-gold-400">
                                    R$ {parseFloat(order.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={route('client.orders')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition"
                    >
                        <Package className="w-5 h-5" />
                        Ver Meus Pedidos
                    </Link>
                    <Link
                        href={route('products.index')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-neutral-950 font-bold hover:bg-gold-400 shadow-lg shadow-gold-500/20 transition"
                    >
                        Continuar Comprando
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        Um e-mail de confirmação foi enviado para <span className="font-semibold text-slate-700 dark:text-slate-300">{auth.user.email}</span>
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
