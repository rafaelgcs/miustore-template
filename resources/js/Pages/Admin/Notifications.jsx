import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Bell, CheckCheck, Eye, Package, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notifications({ notifications = { data: [], links: [] } }) {
    const { post } = useForm();

    const handleMarkAsRead = (notificationId) => {
        post(route('admin.notifications.markAsRead', notificationId), {
            preserveScroll: true,
        });
    };

    const handleMarkAllAsRead = () => {
        post(route('admin.notifications.markAllAsRead'), {
            preserveScroll: true,
        });
    };

    const getNotificationIcon = (type) => {
        const icons = {
            order_pending: '📋',
            order_processing: '⚙️',
            order_shipped: '📦',
            order_delivered: '✅',
            order_cancelled: '❌',
        };
        return icons[type] || '🔔';
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(date));
    };

    const formatTime = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    const unreadCount = notifications?.data?.filter(n => !n.read).length || 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notificações</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            {unreadCount > 0 
                                ? `Você tem ${unreadCount} notificação${unreadCount > 1 ? 's' : ''} não lida${unreadCount > 1 ? 's' : ''}` 
                                : 'Você está em dia com suas notificações'}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="inline-flex items-center gap-2 bg-gold-500 text-neutral-950 px-6 py-3 rounded-full hover:bg-gold-400 transition shadow-lg shadow-gold-500/20 font-bold text-sm"
                        >
                            <CheckCheck className="w-4 h-4" />
                            <span>Marcar Todas como Lidas</span>
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Notificações" />

            <div className="max-w-4xl mx-auto py-8">
                <div className="space-y-4">
                    <AnimatePresence mode='popLayout'>
                        {notifications?.data?.length > 0 ? (
                            notifications.data.map((notification, index) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative group overflow-hidden rounded-[2rem] border transition-all duration-300 ${
                                        notification.read
                                            ? 'bg-white/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                                            : 'bg-gold-50/50 dark:bg-gold-500/5 border-gold-200 dark:border-gold-500/20 shadow-sm'
                                    } hover:border-gold-300 dark:hover:border-gold-500/40 p-6`}
                                >
                                    {!notification.read && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-500" />
                                    )}

                                    <div className="flex items-start gap-5">
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                                            notification.read 
                                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' 
                                                : 'bg-gold-100 dark:bg-gold-500/20 text-gold-600'
                                        }`}>
                                            {getNotificationIcon(notification.type)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className={`font-bold text-slate-900 dark:text-white truncate ${!notification.read ? 'text-lg' : ''}`}>
                                                        {notification.title}
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex flex-col items-end gap-2 shrink-0">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(notification.id)}
                                                            className="text-xs font-bold text-gold-600 hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300 uppercase tracking-wider"
                                                        >
                                                            Marcar lida
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-medium text-slate-500 dark:text-slate-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(notification.created_at)}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {formatTime(notification.created_at)}
                                                </div>
                                                {notification.order && (
                                                    <Link
                                                        href={route('admin.orders.show', notification.order.id)}
                                                        className="flex items-center gap-1.5 text-gold-600 dark:text-gold-400 hover:underline"
                                                    >
                                                        <Package className="w-3.5 h-3.5" />
                                                        Ver Pedido #{notification.order.id}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white/80 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-16 text-center backdrop-blur-xl"
                            >
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-400">
                                    <Bell className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nenhuma notificação</h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
                                    Você está em dia! Quando houver novos pedidos ou atualizações, elas aparecerão aqui.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {notifications?.links?.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/50 p-2 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
                            {notifications.links.map((link, index) => (
                                <React.Fragment key={index}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 font-bold text-sm ${
                                                link.active
                                                    ? 'bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 scale-110'
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 dark:text-slate-600 font-bold text-sm cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
