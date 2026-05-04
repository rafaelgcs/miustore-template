import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Ruler } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

export default function ProductOptionsModal({ product, isOpen, onClose }) {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        if (product) {
            setSelectedSize('');
            setSelectedColor(product.available_colors?.[0] || '');
        }
    }, [product]);

    if (!product) return null;

    const activeVariant = product.variants?.find(v => {
        const sizeMatch = !product.available_sizes?.length || v.attributes.size == selectedSize;
        const colorMatch = !product.available_colors?.length || v.attributes.color == selectedColor;
        return sizeMatch && colorMatch;
    });

    const displayPrice = activeVariant?.price || product.price;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Bottom Drawer */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 z-[101] max-h-[90vh] overflow-y-auto rounded-t-[3rem] bg-white p-8 pb-12 shadow-2xl dark:bg-slate-900 sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2"
                    >
                        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-200 dark:bg-white/10 sm:hidden" />
                        
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex gap-4">
                                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/5">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{product.name}</h3>
                                    <p className="text-lg font-black text-gold-600">
                                        R$ {parseFloat(displayPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full bg-slate-100 p-2 text-slate-400 transition hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {product.available_sizes?.length > 0 && (
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Selecione o Tamanho</label>
                                    <div className="flex flex-wrap gap-3">
                                        {product.available_sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`min-w-[54px] rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                                                    selectedSize === size 
                                                        ? 'border-gold-500 bg-gold-500/5 text-slate-900 dark:text-white shadow-lg shadow-gold-500/10' 
                                                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.available_colors?.length > 0 && (
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Cor</label>
                                    <div className="flex flex-wrap gap-3">
                                        {product.available_colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition-all ${
                                                    selectedColor === color 
                                                        ? 'border-gold-500 bg-gold-500/5 text-slate-900 dark:text-white' 
                                                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400'
                                                }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <AddToCartButton 
                                product={product} 
                                options={{ size: selectedSize, color: selectedColor }}
                                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gold-500 py-5 text-sm font-bold uppercase tracking-widest text-neutral-950 shadow-xl shadow-gold-500/20 transition-all hover:bg-gold-400"
                                onSuccess={onClose}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Adicionar à sacola
                            </AddToCartButton>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
