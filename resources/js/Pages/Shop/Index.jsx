import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';

export default function Index({ products }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Head title="Podologia & Massoterapia Rodrigues" />

            {/* Navbar Premium */}
            <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl">
                                R
                            </div>
                            <span className="font-semibold text-xl tracking-tight text-brand-900">
                                Clínica Rodrigues
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href={route('login')} className="text-sm font-medium text-slate-600 hover:text-brand-600 transition">
                                Entrar
                            </Link>
                            <Link href={route('register')} className="text-sm font-medium bg-brand-600 text-white px-5 py-2.5 rounded-full hover:bg-brand-700 transition shadow-lg shadow-brand-500/30">
                                Agendar / Comprar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-accent-50 -z-10" />
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-200/40 rounded-full blur-3xl -z-10" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Cuidado e bem-estar <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">
                            para o seu corpo
                        </span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10"
                    >
                        Produtos exclusivos de podologia e sessões de massoterapia relaxante para transformar o seu dia.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition group">
                            Ver Produtos
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Products Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Produtos em Destaque</h2>
                        <p className="text-slate-600 mt-2">Os melhores cremes, óleos e tratamentos.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-100">
                            Nenhum produto cadastrado no momento.
                        </div>
                    ) : (
                        products.map((product, index) => (
                            <motion.div 
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300"
                            >
                                <div className="aspect-[4/5] bg-slate-50 rounded-2xl mb-4 overflow-hidden relative">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <ShoppingBag className="w-12 h-12" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-slate-700 shadow-sm">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 5.0
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">{product.name}</h3>
                                <p className="text-slate-500 text-sm line-clamp-2 mt-1 mb-3">{product.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xl font-bold text-slate-900">R$ {product.price}</span>
                                    <button className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                                        <ShoppingBag className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
