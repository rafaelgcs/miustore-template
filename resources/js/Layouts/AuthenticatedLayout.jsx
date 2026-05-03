import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Heart,
    User,
    Package,
    Bell,
    CheckCircle,
    ShoppingCart,
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, cart, notifications: rawNotifications } = usePage().props;
    const notifications = (rawNotifications && !Array.isArray(rawNotifications)) 
        ? rawNotifications 
        : { unread_count: 0 };
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const adminLinks = [
        { name: 'Visão Geral', href: route('admin.dashboard'), icon: LayoutDashboard, active: route().current('admin.dashboard') },
        { name: 'Pedidos', href: route('admin.orders.index'), icon: ShoppingBag, active: route().current('admin.orders.*') },
        { name: 'Produtos', href: route('admin.products.index'), icon: ShoppingBag, active: route().current('admin.products.*') },
        { name: 'Notificações', href: route('admin.notifications'), icon: Bell, active: route().current('admin.notifications'), badge: notifications.unread_count },
        { name: 'SEO', href: route('admin.seo.index'), icon: Settings, active: route().current('admin.seo.*') },
    ];

    const clientLinks = [
        { name: 'Ir para a Loja', href: route('home'), icon: ShoppingBag, active: route().current('home') },
        { name: 'Meu Painel', href: route('client.dashboard'), icon: Package, active: route().current('client.dashboard') },
        { name: 'Meus Pedidos', href: route('client.orders'), icon: ShoppingBag, active: route().current('client.orders') },
        { name: 'Favoritos', href: route('client.favorites'), icon: Heart, active: route().current('client.favorites') },
        { name: 'Perfil', href: route('profile.edit'), icon: User, active: route().current('profile.edit') },
    ];

    const links = user.is_admin ? adminLinks : clientLinks;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-slate-100">
            <nav className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                                {user.is_admin ? 'R' : user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                                    {user.is_admin ? 'Admin' : 'Cliente'}
                                </p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {user.is_admin ? 'Miu Store' : user.name}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <ThemeToggle />
                        <Link
                            href={route('cart.index')}
                            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-gold-300 hover:bg-gold-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-gold-500/50 dark:hover:bg-gold-500/10"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cart.count > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-neutral-950 shadow-lg shadow-gold-500/20">
                                    {cart.count}
                                </span>
                            )}
                        </Link>
                        {user.is_admin && (
                            <Link
                                href={route('admin.notifications')}
                                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-gold-300 hover:bg-gold-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-gold-500/50 dark:hover:bg-gold-500/10"
                            >
                                <Bell className="h-5 w-5" />
                                {notifications.unread_count > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-neutral-950 shadow-lg shadow-gold-500/20">
                                        {notifications.unread_count}
                                    </span>
                                )}
                            </Link>
                        )}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-gold-300 hover:bg-gold-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-gold-500/50 dark:hover:bg-gold-500/10"
                                    >
                                        {user.name}

                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <div className="-me-2 flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition duration-150 ease-in-out hover:bg-gold-50 hover:text-gold-700 focus:bg-gold-50 focus:text-gold-700 focus:outline-none dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100 dark:focus:bg-white/10"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                    <div className="space-y-1 border-t border-slate-200/80 bg-white/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/95">
                        {links.map((link) => (
                            <ResponsiveNavLink key={link.name} href={link.href} active={link.active}>
                                {link.name}
                            </ResponsiveNavLink>
                        ))}
                        <ResponsiveNavLink href={route('cart.index')} active={route().current('cart.index')}>
                            Carrinho ({usePage().props.cart.count})
                        </ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/95">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-transparent">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none xl:block xl:sticky xl:top-24 xl:h-fit">
                        <div className="flex items-center gap-3 pb-6 border-b border-slate-200/70 dark:border-slate-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                                {user.is_admin ? 'R' : user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                                    {user.is_admin ? 'Administrador' : 'Cliente'}
                                </p>
                                <p className="text-lg font-semibold text-slate-950 dark:text-slate-100">
                                    {user.name}
                                </p>
                            </div>
                        </div>

                        <nav className="mt-6 space-y-2">
                            {links.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
                                            link.active
                                                ? 'border-gold-100 bg-gold-50 text-gold-700 shadow-sm shadow-gold-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'
                                                : 'border-slate-200 bg-white text-slate-700 hover:border-gold-200 hover:bg-gold-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="flex-1">{link.name}</span>
                                        {link.badge > 0 && (
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-neutral-950 shadow-lg shadow-gold-500/20">
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-8 border-t border-slate-200/70 pt-5 dark:border-slate-800">
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-red-900/50"
                            >
                                <LogOut className="h-5 w-5" />
                                Sair
                            </Link>
                        </div>
                    </aside>
                    
                    <div className="min-w-0 flex-1">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
