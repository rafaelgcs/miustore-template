import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Users, 
    ShieldCheck, 
    User, 
    Trash2, 
    Calendar, 
    ShoppingBag, 
    AlertCircle, 
    Check, 
    X,
    ShieldAlert
} from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function Index({ users, filters = {} }) {
    const { auth } = usePage().props;
    const currentUser = auth.user;

    // Safeguard filters from empty array serialization (e.g. [] instead of {})
    const safeFilters = filters && typeof filters === 'object' && !Array.isArray(filters) ? filters : {};

    const [search, setSearch] = useState(typeof safeFilters.search === 'string' ? safeFilters.search : '');
    const [roleFilter, setRoleFilter] = useState(typeof safeFilters.role === 'string' ? safeFilters.role : '');
    const [sortBy, setSortBy] = useState(typeof safeFilters.sort === 'string' ? safeFilters.sort : 'created_at');
    const [sortDirection, setSortDirection] = useState(typeof safeFilters.direction === 'string' ? safeFilters.direction : 'desc');

    // Modals state
    const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);
    const [confirmToggleRoleUser, setConfirmToggleRoleUser] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleRoleFilter = (role) => {
        setRoleFilter(role);
        applyFilters({ role });
    };

    const handlePerPageChange = (size) => {
        applyFilters({ per_page: size });
    };

    const handleSort = (field) => {
        const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortDirection(direction);
        applyFilters({ sort: field, direction });
    };

    const applyFilters = (newFilters) => {
        router.get(
            route('admin.users.index'),
            {
                search,
                role: roleFilter,
                sort: sortBy,
                direction: sortDirection,
                per_page: users.per_page,
                ...newFilters
            },
            { preserveState: true }
        );
    };

    const executeToggleRole = () => {
        if (!confirmToggleRoleUser) return;
        router.patch(
            route('admin.users.toggle-role', confirmToggleRoleUser.id),
            {},
            {
                onSuccess: () => setConfirmToggleRoleUser(null),
                onError: () => setConfirmToggleRoleUser(null),
                preserveScroll: true
            }
        );
    };

    const executeDeleteUser = () => {
        if (!confirmDeleteUser) return;
        router.delete(
            route('admin.users.destroy', confirmDeleteUser.id),
            {
                onSuccess: () => setConfirmDeleteUser(null),
                onError: () => setConfirmDeleteUser(null),
                preserveScroll: true
            }
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Usuários & Clientes</h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Gerencie os perfis de acesso, administradores e histórico de clientes da loja.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Usuários & Clientes" />

            <div className="space-y-6">
                {/* Search, Filter Pills & Per Page */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <form onSubmit={handleSearch} className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou e-mail..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-12 w-full rounded-full border-slate-200 bg-white pl-11 pr-4 text-sm transition-all focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                        />
                    </form>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Role Filters */}
                        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/50 p-1 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
                            {[
                                { label: 'Todos', value: '' },
                                { label: 'Administradores', value: 'admin' },
                                { label: 'Clientes', value: 'client' }
                            ].map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => handleRoleFilter(tab.value)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                        roleFilter === tab.value
                                            ? 'bg-gold-500 text-neutral-950 shadow-md shadow-gold-500/20'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Per Page */}
                        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/50 p-1 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">Itens:</span>
                            {[10, 20, 50, 100].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handlePerPageChange(size)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                        users.per_page === size
                                            ? 'bg-gold-500 text-neutral-950 shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <th 
                                            onClick={() => handleSort('name')}
                                            className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer hover:text-gold-500 transition-colors"
                                        >
                                            Nome {sortBy === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th 
                                            onClick={() => handleSort('email')}
                                            className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer hover:text-gold-500 transition-colors"
                                        >
                                            E-mail {sortBy === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th 
                                            onClick={() => handleSort('is_admin')}
                                            className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer hover:text-gold-500 transition-colors"
                                        >
                                            Perfil {sortBy === 'is_admin' && (sortDirection === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th 
                                            onClick={() => handleSort('orders_count')}
                                            className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer hover:text-gold-500 transition-colors"
                                        >
                                            Pedidos {sortBy === 'orders_count' && (sortDirection === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th 
                                            onClick={() => handleSort('created_at')}
                                            className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer hover:text-gold-500 transition-colors"
                                        >
                                            Cadastro {sortBy === 'created_at' && (sortDirection === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {users.data.map((user) => {
                                        const isSelf = user.id === currentUser.id;
                                        return (
                                            <tr key={user.id} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                                {user.name}
                                                                {isSelf && (
                                                                    <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal px-2 py-0.5 rounded-full">
                                                                        Você
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-5">
                                                    {user.is_admin ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-gold-400 bg-amber-50 dark:bg-gold-500/10 px-2.5 py-1 rounded-full">
                                                            <ShieldCheck className="h-3.5 w-3.5" />
                                                            Administrador
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                                                            <User className="h-3.5 w-3.5" />
                                                            Cliente
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                                                        <ShoppingBag className="h-4 w-4 text-slate-400" />
                                                        <span className="font-semibold">{user.orders_count}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-slate-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-4 w-4 text-slate-400" />
                                                        {formatDate(user.created_at)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {/* Toggle Role Button */}
                                                        <button
                                                            onClick={() => setConfirmToggleRoleUser(user)}
                                                            disabled={isSelf}
                                                            className={`p-2 rounded-full border transition-all ${
                                                                isSelf 
                                                                    ? 'opacity-40 cursor-not-allowed border-slate-100 dark:border-slate-800 text-slate-400'
                                                                    : user.is_admin
                                                                        ? 'border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                                        : 'border-gold-200 dark:border-gold-900/30 text-amber-600 dark:text-gold-400 hover:bg-amber-50 dark:hover:bg-gold-500/10'
                                                            }`}
                                                            title={isSelf ? 'Você não pode alterar seu próprio cargo' : user.is_admin ? 'Rebaixar para Cliente' : 'Promover a Administrador'}
                                                        >
                                                            <ShieldCheck className="h-4 w-4" />
                                                        </button>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => setConfirmDeleteUser(user)}
                                                            disabled={isSelf || user.orders_count > 0}
                                                            className={`p-2 rounded-full border transition-all ${
                                                                isSelf || user.orders_count > 0
                                                                    ? 'opacity-40 cursor-not-allowed border-slate-100 dark:border-slate-800 text-slate-400'
                                                                    : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400'
                                                            }`}
                                                            title={
                                                                isSelf 
                                                                    ? 'Você não pode excluir sua própria conta' 
                                                                    : user.orders_count > 0 
                                                                        ? 'Não é possível excluir usuários com histórico de pedidos' 
                                                                        : 'Excluir Usuário'
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {users.data.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                                Nenhum usuário ou cliente encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile View */}
                <div className="block md:hidden space-y-4">
                    {users.data.map((user) => {
                        const isSelf = user.id === currentUser.id;
                        return (
                            <motion.div
                                key={user.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl space-y-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-black">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                {user.name}
                                                {isSelf && (
                                                    <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal px-2 py-0.5 rounded-full">
                                                        Você
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {user.is_admin ? (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-gold-400 bg-amber-50 dark:bg-gold-500/10 px-2 py-0.5 rounded-full">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                                Cliente
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <ShoppingBag className="h-3.5 w-3.5 text-slate-400" />
                                        <span>Pedidos: <strong className="text-slate-900 dark:text-slate-200">{user.orders_count}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-1.5 justify-end">
                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                        <span>{new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        onClick={() => setConfirmToggleRoleUser(user)}
                                        disabled={isSelf}
                                        className={`flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                                            isSelf 
                                                ? 'opacity-40 cursor-not-allowed border-slate-100 dark:border-slate-800 text-slate-400'
                                                : user.is_admin
                                                    ? 'border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                    : 'border-gold-200 dark:border-gold-900/30 text-amber-600 dark:text-gold-400 hover:bg-amber-50 dark:hover:bg-gold-500/10'
                                        }`}
                                    >
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        {user.is_admin ? 'Rebaixar' : 'Tornar Admin'}
                                    </button>

                                    <button
                                        onClick={() => setConfirmDeleteUser(user)}
                                        disabled={isSelf || user.orders_count > 0}
                                        className={`flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                                            isSelf || user.orders_count > 0
                                                ? 'opacity-40 cursor-not-allowed border-slate-100 dark:border-slate-800 text-slate-400'
                                                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400'
                                        }`}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Excluir
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                    {users.data.length === 0 && (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
                            Nenhum usuário ou cliente encontrado.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="pt-4">
                        <Pagination links={users.links} />
                    </div>
                )}
            </div>

            {/* CONFIRM TOGGLE ROLE MODAL */}
            <AnimatePresence>
                {confirmToggleRoleUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmToggleRoleUser(null)}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 15 }}
                            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 dark:bg-gold-500/10 text-amber-600 dark:text-gold-400">
                                    <ShieldAlert className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Confirmar Alteração de Perfil
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Tem certeza de que deseja {confirmToggleRoleUser.is_admin ? 'rebaixar' : 'promover'} o usuário{' '}
                                    <strong className="text-slate-800 dark:text-slate-200">{confirmToggleRoleUser.name}</strong> para{' '}
                                    <strong className="text-slate-800 dark:text-slate-200">
                                        {confirmToggleRoleUser.is_admin ? 'Cliente' : 'Administrador'}
                                    </strong>
                                    ?
                                </p>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => setConfirmToggleRoleUser(null)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <X className="h-4 w-4" />
                                    Cancelar
                                </button>
                                <button
                                    onClick={executeToggleRole}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold-500 px-5 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                                >
                                    <Check className="h-4 w-4" />
                                    Confirmar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CONFIRM DELETE MODAL */}
            <AnimatePresence>
                {confirmDeleteUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmDeleteUser(null)}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 15 }}
                            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-red-200/50 dark:border-red-900/30 bg-white p-8 shadow-2xl dark:bg-slate-950"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                                    <AlertCircle className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Excluir Conta de Usuário
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Tem certeza de que deseja excluir permanentemente o usuário{' '}
                                    <strong className="text-slate-800 dark:text-slate-200">{confirmDeleteUser.name}</strong>? 
                                    Esta ação não poderá ser desfeita.
                                </p>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => setConfirmDeleteUser(null)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <X className="h-4 w-4" />
                                    Cancelar
                                </button>
                                <button
                                    onClick={executeDeleteUser}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-red-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Excluir
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
