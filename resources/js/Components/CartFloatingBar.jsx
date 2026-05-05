import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function CartFloatingBar() {
    const { props, url } = usePage();
    const { cart } = props;

    // Hide on admin routes and cart page
    const isCartPage = url === '/carrinho' || url.startsWith('/carrinho');
    const isAdminPage = url.startsWith('/admin');
    
    const show = cart && cart.count > 0 && !isCartPage && !isAdminPage;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="cart-floating-bar"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 z-[90] w-full px-4 pb-6 pt-4 sm:bottom-10 sm:left-1/2 sm:w-[95%] sm:max-w-3xl sm:-translate-x-1/2 sm:p-0"
                >
                    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between p-4 sm:p-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/30">
                                        <ShoppingBag className="h-6 w-6" />
                                    </div>
                                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-950 text-[10px] font-bold text-white dark:border-neutral-900">
                                        {cart.count}
                                    </span>
                                </div>
                                <div>
                                    <p className="hidden text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 sm:block">Subtotal do Carrinho</p>
                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 sm:hidden">Total</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                                        R$ {parseFloat(cart.total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route('cart.index')}
                                className="inline-flex items-center gap-3 rounded-xl bg-gold-500 px-6 py-4 text-sm font-bold uppercase tracking-widest text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-95"
                            >
                                <span className="hidden sm:inline">Finalizar Pedido</span>
                                <span className="sm:hidden">Finalizar</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        
                        {/* Premium accent line */}
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
