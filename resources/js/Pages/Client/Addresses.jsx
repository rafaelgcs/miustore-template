import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Home, 
    MapPin, 
    Trash2, 
    CheckCircle2, 
    MoreHorizontal,
    Navigation,
    Building2,
    Briefcase,
    PlusCircle,
    X,
    Loader2
} from 'lucide-react';
import axios from 'axios';

export default function Addresses({ auth, addresses }) {
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    
    const { data, setData, post, put, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        name: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        is_default: false,
    });

    const [isSearchingCep, setIsSearchingCep] = useState(false);

    const fetchAddressFromCep = async (cep) => {
        const cleaned = cep.replace(/\D/g, '');
        if (cleaned.length === 8) {
            setIsSearchingCep(true);
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cleaned}/json/`);
                if (!response.data.erro) {
                    setData(prev => ({
                        ...prev,
                        logradouro: response.data.logradouro,
                        bairro: response.data.bairro,
                        cidade: response.data.localidade,
                        uf: response.data.uf,
                        cep: cleaned
                    }));
                }
            } catch (error) {
                console.error('Erro ao buscar CEP', error);
            } finally {
                setIsSearchingCep(false);
            }
        }
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setData({
            name: address.name,
            cep: address.cep,
            logradouro: address.logradouro,
            numero: address.numero,
            complemento: address.complemento || '',
            bairro: address.bairro,
            cidade: address.cidade,
            uf: address.uf,
            is_default: address.is_default,
        });
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingAddress(null);
        reset();
        clearErrors();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingAddress) {
            put(route('client.addresses.update', editingAddress.id), {
                onSuccess: () => handleCloseForm(),
            });
        } else {
            post(route('client.addresses.store'), {
                onSuccess: () => handleCloseForm(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este endereço?')) {
            destroy(route('client.addresses.destroy', id));
        }
    };

    const handleSetDefault = (id) => {
        post(route('client.addresses.set-default', id));
    };

    const getIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('casa')) return Home;
        if (lowerName.includes('trabalho') || lowerName.includes('escritório')) return Briefcase;
        return MapPin;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Meus Endereços</h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Gerencie seus locais de entrega para um checkout mais rápido.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-95"
                    >
                        <Plus className="h-5 w-5" />
                        Novo Endereço
                    </button>
                </div>
            }
        >
            <Head title="Meus Endereços" />

            <div className="space-y-8">
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 dark:border-slate-800">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {editingAddress ? 'Editar Endereço' : 'Cadastrar Novo Endereço'}
                                </h2>
                                <button
                                    onClick={handleCloseForm}
                                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={submit} className="p-8">
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="md:col-span-2 lg:col-span-1">
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Nome do Local (Ex: Casa, Trabalho)</label>
                                        <input
                                            required
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                            placeholder="Minha Casa"
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">CEP</label>
                                        <div className="relative">
                                            <input
                                                required
                                                value={data.cep}
                                                onChange={e => {
                                                    setData('cep', e.target.value);
                                                    fetchAddressFromCep(e.target.value);
                                                }}
                                                className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                                placeholder="00000-000"
                                            />
                                            {isSearchingCep && (
                                                <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gold-500" />
                                            )}
                                        </div>
                                        {errors.cep && <p className="mt-1 text-xs text-red-500">{errors.cep}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Logradouro / Rua</label>
                                        <input
                                            required
                                            value={data.logradouro}
                                            onChange={e => setData('logradouro', e.target.value)}
                                            className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Número</label>
                                        <input
                                            required
                                            value={data.numero}
                                            onChange={e => setData('numero', e.target.value)}
                                            className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Complemento (Opcional)</label>
                                        <input
                                            value={data.complemento}
                                            onChange={e => setData('complemento', e.target.value)}
                                            className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Bairro</label>
                                        <input
                                            required
                                            value={data.bairro}
                                            onChange={e => setData('bairro', e.target.value)}
                                            className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div className="md:col-span-2 lg:col-span-1">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Cidade</label>
                                                <input
                                                    required
                                                    value={data.cidade}
                                                    onChange={e => setData('cidade', e.target.value)}
                                                    className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                                />
                                            </div>
                                            <div className="w-24">
                                                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">UF</label>
                                                <input
                                                    required
                                                    value={data.uf}
                                                    onChange={e => setData('uf', e.target.value)}
                                                    className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white uppercase"
                                                    maxLength={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_default"
                                        checked={data.is_default}
                                        onChange={e => setData('is_default', e.target.checked)}
                                        className="h-5 w-5 rounded border-slate-200 text-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    <label htmlFor="is_default" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Definir como endereço padrão de entrega
                                    </label>
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-neutral-950 dark:hover:bg-slate-100"
                                    >
                                        {processing ? 'Salvando...' : (editingAddress ? 'Salvar Alterações' : 'Cadastrar Endereço')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseForm}
                                        className="rounded-full border border-slate-200 px-8 py-4 text-sm font-bold transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-white/5"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {addresses.map((addr) => {
                        const Icon = getIcon(addr.name);
                        return (
                            <motion.div
                                key={addr.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 p-8 transition-all duration-300 ${
                                    addr.is_default 
                                        ? 'border-gold-500 bg-gold-500/5 shadow-xl shadow-gold-500/10' 
                                        : 'border-slate-200/80 bg-white/80 backdrop-blur-xl hover:border-gold-300/50 dark:border-slate-800 dark:bg-slate-950/90 dark:hover:border-gold-500/30'
                                }`}
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 transition-colors group-hover:bg-gold-500 group-hover:text-neutral-950 dark:group-hover:bg-gold-500">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        {addr.is_default && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-neutral-950 shadow-lg shadow-gold-500/20">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Padrão
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                        {addr.name}
                                    </h3>

                                    <div className="space-y-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                        <p className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-400" />
                                            <span>
                                                {addr.logradouro}, {addr.numero}
                                                {addr.complemento && <><br />{addr.complemento}</>}
                                            </span>
                                        </p>
                                        <p className="pl-6">{addr.bairro}</p>
                                        <p className="pl-6">{addr.cidade} - {addr.uf}</p>
                                        <p className="pl-6 font-mono text-xs">{addr.cep}</p>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex gap-4">
                                        {!addr.is_default && (
                                            <button 
                                                onClick={() => handleSetDefault(addr.id)}
                                                className="text-[10px] font-black uppercase tracking-widest text-gold-600 transition hover:text-gold-500 dark:text-gold-400"
                                            >
                                                Tornar Padrão
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleEdit(addr)}
                                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition hover:text-slate-900 dark:hover:text-white"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(addr.id)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:bg-white/5 dark:hover:bg-red-900/20"
                                        title="Excluir Endereço"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}

                    {addresses.length === 0 && !showForm && (
                        <div className="col-span-full rounded-[3rem] border border-dashed border-slate-300 p-16 text-center dark:border-slate-800">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
                                <Navigation className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Nenhum endereço cadastrado</h3>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Adicione seu primeiro endereço para agilizar suas compras.
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-neutral-950"
                            >
                                <Plus className="h-5 w-5" />
                                Adicionar Endereço
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
