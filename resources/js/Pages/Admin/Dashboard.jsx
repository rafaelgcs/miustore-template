import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <Head title="Admin Dashboard" />

            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 px-4 py-6 flex flex-col">
                <div className="flex items-center gap-2 px-2 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">R</div>
                    <span className="font-semibold text-lg text-slate-900">Admin Panel</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-brand-50 text-brand-600 rounded-xl font-medium">
                        <LayoutDashboard className="w-5 h-5" />
                        Visão Geral
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
                        <ShoppingBag className="w-5 h-5" />
                        Produtos
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
                        <Users className="w-5 h-5" />
                        Clientes
                    </a>
                </nav>

                <div className="pt-4 border-t border-slate-100">
                    <Link method="post" href={route('logout')} as="button" className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition">
                        <LogOut className="w-5 h-5" />
                        Sair
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Olá, Administrador</h1>
                        <p className="text-slate-500">Resumo das atividades de hoje.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-4">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <p className="text-slate-500 font-medium">Vendas no Mês</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">R$ 12.450</h3>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
