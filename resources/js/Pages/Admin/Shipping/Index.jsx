import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import {
    Truck,
    Settings,
    Save,
    CheckCircle2,
    XCircle,
    Info,
    ShieldCheck,
    Zap,
    Globe
} from 'lucide-react';

export default function Index({ settings }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configurações de Entrega</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gerencie APIs de frete e chaves de acesso.</p>
                    </div>
                </div>
            }
        >
            <Head title="Configurações de Entrega" />

            <div className="mx-auto max-w-5xl pb-20">
                <div className="grid gap-8">
                    {settings.map((setting) => (
                        <ShippingProviderCard key={setting.id} setting={setting} />
                    ))}
                </div>

                <div className="mt-12 p-8 rounded-[2.5rem] bg-gold-50 dark:bg-gold-500/5 border border-gold-100 dark:border-gold-500/10">
                    <div className="flex gap-6">
                        <div className="h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-neutral-950">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Segurança das APIs</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                Suas chaves de API são armazenadas de forma segura e utilizadas apenas para comunicação direta com os provedores de frete. 
                                Certifique-se de utilizar tokens com as permissões mínimas necessárias.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ShippingProviderCard({ setting }) {
    const { data, setData, put, processing } = useForm({
        is_enabled: setting.is_enabled,
        config: setting.config || {},
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.shipping.settings.update', setting.id));
    };

    const getProviderName = (provider) => {
        switch (provider) {
            case 'melhor_envio': return 'Melhor Envio';
            case 'correios': return 'Correios (Direto)';
            case 'frenet': return 'Frenet';
            default: return provider;
        }
    };

    const getProviderIcon = (provider) => {
        switch (provider) {
            case 'melhor_envio': return <Zap className="h-6 w-6 text-gold-500" />;
            case 'correios': return <Truck className="h-6 w-6 text-gold-500" />;
            case 'frenet': return <Globe className="h-6 w-6 text-gold-500" />;
            default: return <Settings className="h-6 w-6 text-gold-500" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[2.5rem] border bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:bg-slate-950/90 transition-all ${
                data.is_enabled ? 'border-gold-500/30 ring-1 ring-gold-500/10' : 'border-slate-200 dark:border-slate-800'
            }`}
        >
            <form onSubmit={submit}>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                            {getProviderIcon(setting.provider)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{getProviderName(setting.provider)}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                {data.is_enabled ? (
                                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-green-500">
                                        <CheckCircle2 className="h-3 w-3" /> Habilitado
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <XCircle className="h-3 w-3" /> Desabilitado
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div 
                        onClick={() => setData('is_enabled', !data.is_enabled)}
                        className={`cursor-pointer h-8 w-14 rounded-full p-1 transition-colors ${
                            data.is_enabled ? 'bg-gold-500' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                    >
                        <div className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                            data.is_enabled ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                    </div>
                </div>

                <div className="mt-8 grid gap-6 border-t border-slate-100 pt-8 dark:border-white/5">
                    {setting.provider === 'melhor_envio' && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">API Token (OAuth2)</label>
                            <input
                                type="password"
                                value={data.config.token || ''}
                                onChange={(e) => setData('config', { ...data.config, token: e.target.value })}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                placeholder="Insira seu token do Melhor Envio"
                            />
                        </div>
                    )}

                    {setting.provider === 'correios' && (
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Usuário</label>
                                <input
                                    type="text"
                                    value={data.config.user || ''}
                                    onChange={(e) => setData('config', { ...data.config, user: e.target.value })}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Senha</label>
                                <input
                                    type="password"
                                    value={data.config.password || ''}
                                    onChange={(e) => setData('config', { ...data.config, password: e.target.value })}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>
                    )}

                    {setting.provider === 'frenet' && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">API Key</label>
                            <input
                                type="password"
                                value={data.config.key || ''}
                                onChange={(e) => setData('config', { ...data.config, key: e.target.value })}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-neutral-950 dark:hover:bg-slate-200"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Salvando...' : 'Salvar Configuração'}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}
