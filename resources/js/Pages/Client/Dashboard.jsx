import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, User, LogOut } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <Head title="Meu Painel" />

            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 px-4 py-6 flex flex-col">
                <div className="flex items-center gap-2 px-2 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center text-white font-bold">R</div>
                    <span className="font-semibold text-lg text-slate-900">Meu Painel</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-accent-50 text-accent-600 rounded-xl font-medium">
                        <Calendar className="w-5 h-5" />
                        Agendamentos
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
                        <ShoppingBag className="w-5 h-5" />
                        Meus Pedidos
                    </a>
                    <a href={route('profile.edit')} className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
                        <User className="w-5 h-5" />
                        Perfil
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
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Bem-vindo, {auth.user.name}</h1>
                    <p className="text-slate-500">Acompanhe seus tratamentos e compras.</p>
                </header>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-2xl text-center">
                    <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-10 h-10 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Nenhum agendamento futuro</h3>
                    <p className="text-slate-500 mt-2 mb-6">Que tal marcar sua próxima sessão de podologia ou massagem relaxante?</p>
                    <button className="bg-brand-600 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-700 transition">
                        Agendar Agora
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
