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
    Globe,
    MapPin,
    Home
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
            case 'general': return 'Configurações Gerais';
            case 'melhor_envio': return 'Melhor Envio';
            case 'correios': return 'Correios (Direto)';
            case 'frenet': return 'Frenet';
            default: return provider;
        }
    };

    const getProviderIcon = (provider) => {
        switch (provider) {
            case 'general': return <Home className="h-6 w-6 text-gold-500" />;
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
                    {setting.provider === 'general' && (
                        <div className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">CEP de Origem Padrão</label>
                                    <input
                                        type="text"
                                        value={data.config.origin_address?.zip || ''}
                                        onChange={(e) => setData('config', { 
                                            ...data.config, 
                                            origin_address: { ...(data.config.origin_address || {}), zip: e.target.value } 
                                        })}
                                        placeholder="00000-000"
                                        className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                    <input
                                        type="checkbox"
                                        id="global_allow_pickup"
                                        checked={data.config.allow_pickup || false}
                                        onChange={(e) => setData('config', { ...data.config, allow_pickup: e.target.checked })}
                                        className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                    />
                                    <label htmlFor="global_allow_pickup" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                        Habilitar Retirada Globalmente
                                    </label>
                                </div>
                            </div>

                            {data.config.allow_pickup && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="grid gap-6 sm:grid-cols-2 p-6 rounded-2xl bg-gold-500/5 border border-gold-500/10"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                            <Globe className="h-3 w-3" /> Estados Autorizados (Ex: SP, RJ)
                                        </label>
                                        <textarea
                                            value={data.config.pickup_states || ''}
                                            onChange={(e) => setData('config', { ...data.config, pickup_states: e.target.value })}
                                            placeholder="Ex: SP, RJ (deixe em branco para todos)"
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                            rows={2}
                                        />
                                        <p className="text-[8px] text-slate-400">Separe por vírgula. Se vazio, todos os estados são permitidos.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                            <MapPin className="h-3 w-3" /> Cidades Autorizadas
                                        </label>
                                        <textarea
                                            value={data.config.pickup_cities || ''}
                                            onChange={(e) => setData('config', { ...data.config, pickup_cities: e.target.value })}
                                            placeholder="Ex: São Paulo, Campinas (deixe em branco para todas)"
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                            rows={2}
                                        />
                                        <p className="text-[8px] text-slate-400">Separe por vírgula. Se vazio, todas as cidades são permitidas.</p>
                                    </div>
                                </motion.div>
                            )}

                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                    <MapPin className="h-4 w-4 text-gold-500" />
                                    Endereço de Origem Completo
                                </h4>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Rua / Logradouro</label>
                                        <input
                                            type="text"
                                            value={data.config.origin_address?.street || ''}
                                            onChange={(e) => setData('config', { 
                                                ...data.config, 
                                                origin_address: { ...(data.config.origin_address || {}), street: e.target.value } 
                                            })}
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Número</label>
                                        <input
                                            type="text"
                                            value={data.config.origin_address?.number || ''}
                                            onChange={(e) => setData('config', { 
                                                ...data.config, 
                                                origin_address: { ...(data.config.origin_address || {}), number: e.target.value } 
                                            })}
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Bairro</label>
                                        <input
                                            type="text"
                                            value={data.config.origin_address?.neighborhood || ''}
                                            onChange={(e) => setData('config', { 
                                                ...data.config, 
                                                origin_address: { ...(data.config.origin_address || {}), neighborhood: e.target.value } 
                                            })}
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Cidade</label>
                                        <input
                                            type="text"
                                            value={data.config.origin_address?.city || ''}
                                            onChange={(e) => setData('config', { 
                                                ...data.config, 
                                                origin_address: { ...(data.config.origin_address || {}), city: e.target.value } 
                                            })}
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Estado (UF)</label>
                                        <input
                                            type="text"
                                            maxLength="2"
                                            value={data.config.origin_address?.state || ''}
                                            onChange={(e) => setData('config', { 
                                                ...data.config, 
                                                origin_address: { ...(data.config.origin_address || {}), state: e.target.value.toUpperCase() } 
                                            })}
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
