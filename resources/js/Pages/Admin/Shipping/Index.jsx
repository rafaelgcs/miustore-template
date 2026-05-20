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
    Home,
    Plus,
    Trash2,
    Edit2
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

    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [modalData, setModalData] = useState({
        id: '',
        name: '',
        price_mode: 'fixed',
        fixed_price: 0,
        deadline: 1,
        description: '',
        is_enabled: true
    });

    const openAddModal = () => {
        setEditingIndex(null);
        setModalData({
            id: 'custom_' + Math.random().toString(36).substring(2, 11),
            name: '',
            price_mode: 'fixed',
            fixed_price: 0,
            deadline: 1,
            description: '',
            is_enabled: true
        });
        setShowModal(true);
    };

    const openEditModal = (method, idx) => {
        setEditingIndex(idx);
        setModalData({ ...method });
        setShowModal(true);
    };

    const saveModalData = () => {
        if (!modalData.name.trim()) return;

        const currentMethods = data.config.custom_methods || [];
        if (editingIndex === null) {
            setData('config', {
                ...data.config,
                custom_methods: [...currentMethods, modalData]
            });
        } else {
            const updated = [...currentMethods];
            updated[editingIndex] = modalData;
            setData('config', {
                ...data.config,
                custom_methods: updated
            });
        }
        setShowModal(false);
    };

    const deleteCustomMethod = (idx) => {
        if (confirm('Tem certeza que deseja excluir esta opção de entrega?')) {
            const currentMethods = data.config.custom_methods || [];
            setData('config', {
                ...data.config,
                custom_methods: currentMethods.filter((_, i) => i !== idx)
            });
        }
    };

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

                        {/* Opções de Entrega Customizadas */}
                        <div className="border-t border-slate-100 pt-8 dark:border-white/5 space-y-6">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                            <Truck className="h-4 w-4 text-gold-500" />
                                            Opções de Entrega Customizadas (Ex: Uber Flash, Motoboy)
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Crie opções de entrega específicas com preço fixo ou a combinar.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={openAddModal}
                                        className="inline-flex items-center gap-2 rounded-xl bg-gold-500/10 px-4 py-2 text-xs font-bold text-gold-600 transition hover:bg-gold-500/20 dark:text-gold-400"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        Criar Opção de Entrega
                                    </button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {(data.config.custom_methods || []).map((method, idx) => (
                                        <div
                                            key={method.id}
                                            className={`group relative rounded-2xl border p-4 bg-slate-50/50 dark:bg-white/5 ${
                                                method.is_enabled ? 'border-gold-500/20' : 'border-slate-200 dark:border-slate-800'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className={`text-[9px] uppercase tracking-wider font-bold ${
                                                        method.is_enabled ? 'text-green-500' : 'text-slate-400'
                                                    }`}>
                                                        {method.is_enabled ? 'Habilitado' : 'Desabilitado'}
                                                    </span>
                                                    <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                                                        {method.name}
                                                    </h5>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                        {method.price_mode === 'combine' ? (
                                                            <span className="font-semibold text-gold-600">A combinar / Calculado na hora</span>
                                                        ) : (
                                                            <span className="font-semibold text-slate-900 dark:text-slate-300">
                                                                R$ {parseFloat(method.fixed_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                            </span>
                                                        )}
                                                        {` • Prazo: ${method.deadline} dia(s)`}
                                                    </p>
                                                    {method.description && (
                                                        <p className="text-[10px] text-slate-400 mt-2 italic line-clamp-2">
                                                            {method.description}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(method, idx)}
                                                        className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-gold-500 transition-colors"
                                                    >
                                                        <Edit2 className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteCustomMethod(idx)}
                                                        className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {(data.config.custom_methods || []).length === 0 && (
                                        <div className="col-span-full py-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                                            Nenhuma opção de entrega customizada configurada.
                                        </div>
                                    )}
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

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-[2.5rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 text-left">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                            {editingIndex === null ? 'Nova Opção de Entrega' : 'Editar Opção de Entrega'}
                        </h4>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Nome da Entrega</label>
                                <input
                                    type="text"
                                    value={modalData.name}
                                    onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                                    placeholder="Ex: Uber Flash, Motoboy Expresso"
                                    className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Tipo de Preço</label>
                                    <select
                                        value={modalData.price_mode}
                                        onChange={(e) => setModalData({ ...modalData, price_mode: e.target.value })}
                                        className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    >
                                        <option value="fixed">Preço Fixo</option>
                                        <option value="combine">A combinar / Calculado na hora</option>
                                    </select>
                                </div>

                                {modalData.price_mode === 'fixed' && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Valor do Frete (R$)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={modalData.fixed_price}
                                            onChange={(e) => setModalData({ ...modalData, fixed_price: parseFloat(e.target.value) || 0 })}
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Prazo Estimado (Dias Úteis)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={modalData.deadline}
                                        onChange={(e) => setModalData({ ...modalData, deadline: parseInt(e.target.value) || 0 })}
                                        className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4">
                                    <input
                                        type="checkbox"
                                        id="modal_is_enabled"
                                        checked={modalData.is_enabled}
                                        onChange={(e) => setModalData({ ...modalData, is_enabled: e.target.checked })}
                                        className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500 animate-pulse"
                                    />
                                    <label htmlFor="modal_is_enabled" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                                        Habilitado
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Descrição / Instruções</label>
                                <textarea
                                    value={modalData.description}
                                    onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                                    placeholder="Ex: O valor do envio será calculado no app e cobrado via Pix ou WhatsApp."
                                    rows={2}
                                    className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={saveModalData}
                                className="px-5 py-2.5 rounded-full bg-gold-500 text-neutral-950 text-sm font-bold shadow-lg transition hover:bg-gold-400"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
