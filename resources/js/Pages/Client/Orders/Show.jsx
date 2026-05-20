import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    Package, 
    Truck, 
    CheckCircle2, 
    AlertCircle, 
    Calendar, 
    CreditCard,
    ShoppingBag,
    History,
    MapPin,
    MessageSquare
} from 'lucide-react';

export default function OrderShow({ order, customShippingMethods = [] }) {
    const getStatusStyles = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20',
            processing: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20',
            shipped: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200/50 dark:border-purple-500/20',
            delivered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20',
            cancelled: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200/50 dark:border-rose-500/20',
        };
        return styles[status] || 'bg-slate-50 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200/50 dark:border-slate-500/20';
    };

    const getStatusLabel = (status) => {
        const labels = {
            pending: 'Aguardando Aprovação',
            processing: 'Em Processamento',
            shipped: 'Despachado',
            delivered: 'Entregue',
            cancelled: 'Cancelado',
        };
        return labels[status] || status;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(date));
    };

    const formatTime = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    const getShippingMethodDisplay = () => {
        if (order.shipping_mode === 'individual') {
            return "Envio Individual (Vários Métodos)";
        }

        if (order.shipping_method === 'retirada') {
            return "Retirada no Local";
        }

        const customMethod = (customShippingMethods || []).find(m => m.id === order.shipping_method);
        if (customMethod) {
            return customMethod.name;
        }

        if (order.shipping_method) {
            const names = {
                melhor_envio_pac: 'PAC (Melhor Envio)',
                melhor_envio_sedex: 'SEDEX (Melhor Envio)',
                correios_pac: 'PAC (Correios)',
                correios_sedex: 'SEDEX (Correios)',
                frenet_expresso: 'Expresso (Frenet)'
            };
            return names[order.shipping_method] || order.shipping_method;
        }

        return "Não selecionado";
    };

    const isShippingCombine = () => {
        if (order.shipping_mode === 'individual') {
            return Object.values(order.individual_shipping || {}).some(s => {
                const customMethod = (customShippingMethods || []).find(m => m.id === s.method);
                return customMethod?.price_mode === 'combine';
            });
        }
        const customMethod = (customShippingMethods || []).find(m => m.id === order.shipping_method);
        return customMethod?.price_mode === 'combine';
    };

    // Construct support message link
    const supportMessage = `Olá! Preciso de ajuda com o Pedido #${order.id}.`;
    const whatsappLink = `https://wa.me/5500000000000?text=${encodeURIComponent(supportMessage)}`;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('client.orders')}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-gold-500 hover:text-gold-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pedido #{order.id}</h1>
                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{formatDate(order.created_at)} às {formatTime(order.created_at)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${getStatusStyles(order.status)}`}>
                        <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                        {getStatusLabel(order.status)}
                    </div>
                </div>
            }
        >
            <Head title={`Pedido #${order.id}`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Products List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                    >
                        <div className="border-b border-slate-100 p-6 dark:border-slate-800">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                                <ShoppingBag className="h-5 w-5 text-gold-500" />
                                Itens do Pedido
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {order.items.map((item) => (
                                <div key={item.id} className="group flex items-center gap-6 p-6 transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-slate-300">
                                                <Package className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{item.product.name}</h4>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            {item.quantity} x {formatCurrency(item.price)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Order Timeline/History */}
                    {order.notifications && order.notifications.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                        >
                            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-6">
                                <History className="h-5 w-5 text-gold-500" />
                                Atualizações do Pedido
                            </h3>
                            <div className="space-y-6">
                                {order.notifications.map((notification, index) => (
                                    <div key={notification.id} className="relative flex gap-4 pl-6">
                                        {index !== order.notifications.length - 1 && (
                                            <div className="absolute left-[7px] top-6 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-slate-800" />
                                        )}
                                        <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-white bg-gold-500 shadow-sm dark:border-slate-950" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{notification.title}</p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{notification.message}</p>
                                            <p className="mt-1 text-xs text-slate-400">{formatDate(notification.created_at)} às {formatTime(notification.created_at)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Order Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                    >
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Resumo da Compra</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(order.subtotal || (parseFloat(order.total_amount) - parseFloat(order.shipping_amount || 0) + parseFloat(order.discount_amount || 0)))}
                                </span>
                            </div>
                            {parseFloat(order.discount_amount || 0) > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Desconto</span>
                                    <span className="font-bold text-rose-600 dark:text-rose-400">
                                        -{formatCurrency(order.discount_amount)}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400 flex flex-col">
                                    <span>Frete</span>
                                    <span className="text-[10px] text-slate-400">Método: {getShippingMethodDisplay()}</span>
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {isShippingCombine() ? (
                                        <span className="text-gold-600 dark:text-gold-400 uppercase tracking-wider text-xs">A combinar</span>
                                    ) : (
                                        parseFloat(order.shipping_amount || 0) > 0 
                                            ? formatCurrency(order.shipping_amount) 
                                            : <span className="text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-xs">Grátis</span>
                                    )}
                                </span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                        <CreditCard className="h-5 w-5 text-gold-500" />
                                        <span className="font-bold text-lg">Total</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-gold-600 dark:text-gold-500">
                                            {formatCurrency(order.total_amount)}
                                        </span>
                                        {isShippingCombine() && (
                                            <p className="text-[10px] font-bold text-gold-600 dark:text-gold-400 mt-1 uppercase tracking-wider">
                                                + Frete a combinar
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Delivery Details Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                    >
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gold-500" />
                            Informações de Entrega
                        </h3>
                        {order.shipping_method === 'retirada' ? (
                            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <div className="rounded-2xl bg-gold-500/5 border border-gold-500/10 p-4">
                                    <p className="font-bold text-gold-600 dark:text-gold-400">Retirada no Local</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        Você optou por retirar seu pedido no endereço de origem da loja.
                                    </p>
                                </div>
                            </div>
                        ) : order.address ? (
                            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Destinatário</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{order.address.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Logradouro / Número</p>
                                    <p className="font-bold text-slate-900 dark:text-white">
                                        {order.address.logradouro}, {order.address.numero}
                                    </p>
                                    {order.address.complemento && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Complemento: {order.address.complemento}
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Bairro</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{order.address.bairro}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Cidade / UF</p>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            {order.address.cidade} - {order.address.uf}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">CEP</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{order.address.cep}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                                Endereço de entrega não disponível.
                            </p>
                        )}
                    </motion.div>

                    {/* Support Call-to-action */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gold-500/5 dark:bg-gold-500/10 p-6 shadow-sm dark:border-gold-500/20"
                    >
                        <h4 className="font-bold text-slate-900 dark:text-white">Precisa de ajuda com este pedido?</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Se houver dúvidas sobre o prazo, entrega customizada ou pagamento, entre em contato via Whatsapp.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold px-4 py-2.5 text-xs transition"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Falar com Suporte
                        </a>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
