import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Search, User, MapPin, ChevronDown, Menu, X, ChevronUp, Headphones, Accessibility, Truck, CreditCard, Smartphone, Info, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/Components/ThemeToggle';

const ICON_MAP = {
    Headphones, Accessibility, Truck, CreditCard, Smartphone, Info, Mail, Phone, MapPin, User, Search, ShoppingCart
};

export default function ShopNavbar() {
    const { auth, cart, navigation_menus = [] } = usePage().props;
    const [activeMenu, setActiveMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileMenus, setExpandedMobileMenus] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    const [forceShowMenu, setForceShowMenu] = useState(false);
    const isLoggedIn = !!auth?.user;

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100;
            setIsScrolled(scrolled);
            if (!scrolled) setForceShowMenu(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileSubmenu = (id) => {
        setExpandedMobileMenus(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getUrl = (url) => {
        if (!url) return '#';
        if (url.startsWith('http') || url.startsWith('#') || url.startsWith('/')) return url;
        try {
            return route(url);
        } catch (e) {
            return '#';
        }
    };

    const topBarMenu = navigation_menus.find(m => m.type === 'top_bar' && m.is_active);
    const [currentAvisoIndex, setCurrentAvisoIndex] = useState(0);

    useEffect(() => {
        if (topBarMenu?.content?.carousel?.length > 1) {
            const timer = setInterval(() => {
                setCurrentAvisoIndex(prev => (prev + 1) % topBarMenu.content.carousel.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [topBarMenu]);

    const renderIcon = (iconName, className = "h-3.5 w-3.5") => {
        if (!iconName) return null;
        const IconComponent = ICON_MAP[iconName];
        return IconComponent ? <IconComponent className={className} /> : null;
    };

    return (
        <>
            {/* Top Bar (Relative) */}
            {topBarMenu && (
                <div className="bg-neutral-950 dark:bg-black border-b border-white/5 py-2 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="mx-auto max-w-7xl grid grid-cols-3 items-center">
                        {/* Left Link */}
                        <div className="flex justify-start">
                            {topBarMenu.content.left?.text && (
                                <Link 
                                    href={getUrl(topBarMenu.content.left.url)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-gold-400 transition"
                                >
                                    {renderIcon(topBarMenu.content.left.icon)}
                                    <span className="hidden sm:inline">{topBarMenu.content.left.text}</span>
                                </Link>
                            )}
                        </div>

                        {/* Center Carousel */}
                        <div className="flex justify-center relative h-4">
                            <AnimatePresence mode="wait">
                                {topBarMenu.content.carousel?.map((aviso, idx) => (
                                    idx === currentAvisoIndex && (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 flex justify-center items-center"
                                        >
                                            <Link 
                                                href={getUrl(aviso.url)}
                                                className="text-[10px] font-bold uppercase tracking-[0.1em] text-white hover:text-gold-400 transition text-center whitespace-nowrap"
                                            >
                                                {aviso.text}
                                            </Link>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Right Link */}
                        <div className="flex justify-end">
                            {topBarMenu.content.right?.text && (
                                <Link 
                                    href={getUrl(topBarMenu.content.right.url)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-gold-400 transition"
                                >
                                    <span className="hidden sm:inline">{topBarMenu.content.right.text}</span>
                                    {renderIcon(topBarMenu.content.right.icon)}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-[100] w-full">
                {/* Main Header with Glassmorphism */}
                <div className="relative z-[110] bg-white dark:bg-black/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 py-4 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    {/* Left: Logo */}
                    <Link href={route('home')} className="flex items-center gap-3 group">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 group-hover:scale-105 transition duration-300 font-bold text-xl">
                            M
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400 dark:text-slate-400">Miu Store</p>
                            <h1 className="text-lg font-semibold tracking-wide text-black dark:text-white">Joias & Bem-estar</h1>
                        </div>
                    </Link>

                    {/* Right: Icons & Utility */}
                    <div className="flex items-center gap-3">
                        {isScrolled && (
                            <button 
                                onClick={() => setForceShowMenu(!forceShowMenu)}
                                className="hidden lg:flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-500/10 rounded-full border border-gold-200 dark:border-gold-500/20 hover:bg-gold-100 dark:hover:bg-gold-500/20 transition-all duration-300"
                            >
                                Categorias
                                {forceShowMenu ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>
                        )}

                        <ThemeToggle />
                        
                        <Link
                            href={route('products.index')}
                            className="hidden lg:inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition group"
                        >
                            <Search className="h-5 w-5 group-hover:scale-110 transition" />
                        </Link>

                        <Link 
                            href={route('cart.index')}
                            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition group"
                        >
                            <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition" />
                            {cart?.count > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-neutral-950 shadow-lg shadow-gold-500/20 animate-in zoom-in duration-300">
                                    {cart.count}
                                </span>
                            )}
                        </Link>

                        {isLoggedIn ? (
                            <Link href={route('client.dashboard')} className="hidden rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-sm text-slate-600 dark:text-slate-200 transition hover:bg-slate-200 dark:hover:bg-white/10 md:inline-flex font-medium">
                                Minha Conta
                            </Link>
                        ) : (
                            <Link href={route('login')} className="hidden rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-sm text-slate-600 dark:text-slate-200 transition hover:bg-slate-200 dark:hover:bg-white/10 md:inline-flex font-medium">
                                Entrar
                            </Link>
                        )}
                        
                        <button 
                            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar - Premium Pattern */}
                <div className="mt-4 lg:hidden">
                    <form action={route('products.index')} method="GET" className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-gold-500 transition-colors duration-300" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            autoComplete="off"
                            placeholder="O que você está procurando?"
                            className="block w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 transition-all duration-300"
                        />
                    </form>
                </div>
            </div>

            {/* Categories Bar */}
            <motion.nav 
                initial={false}
                animate={{ 
                    y: (isScrolled && !forceShowMenu) ? -60 : 0,
                    opacity: (isScrolled && !forceShowMenu) ? 0 : 1,
                    pointerEvents: (isScrolled && !forceShowMenu) ? 'none' : 'auto'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hidden lg:block bg-white dark:bg-neutral-950 border-b border-slate-100 dark:border-white/5"
            >
                <div className="mx-auto flex max-w-7xl items-center justify-center">
                    <ul className="flex items-center gap-10 h-14">
                        {navigation_menus.filter(m => m.type !== 'top_bar').map((cat) => (
                            <li 
                                key={cat.id} 
                                className="h-full flex items-center"
                                onMouseEnter={() => cat.type === 'mega' && setActiveMenu(cat.id)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <Link 
                                    href={cat.type === 'link' ? getUrl(cat.url) : '#'}
                                    className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-1.5 h-full ${activeMenu === cat.id ? 'text-gold-600 dark:text-gold-400' : 'text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400'}`}
                                >
                                    {cat.name}
                                    {cat.type === 'mega' && <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMenu === cat.id ? 'rotate-180 text-gold-500' : 'text-slate-400'}`} />}
                                </Link>

                                {/* Mega Menu (Solid Background, No top border) */}
                                <AnimatePresence>
                                    {cat.type === 'mega' && activeMenu === cat.id && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-0 top-full w-full bg-white dark:bg-neutral-900 shadow-2xl py-12 px-8 z-50 border-b border-slate-200 dark:border-white/10"
                                        >
                                            <div className="mx-auto max-w-7xl grid grid-cols-[1.5fr_1fr] gap-16">
                                                <div className="grid grid-cols-4 gap-8">
                                                    {cat.content?.columns?.map((col, idx) => (
                                                        <div key={idx} className="space-y-6">
                                                            <h3 className="text-[10px] font-bold tracking-[0.2em] text-gold-600 dark:text-gold-500 uppercase">
                                                                {col.title}
                                                            </h3>
                                                            <ul className="space-y-4">
                                                                {col.links?.map((link, lIdx) => (
                                                                    <li key={lIdx}>
                                                                        <a href={link.href} className="text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 transition">
                                                                            {link.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            {col.footer && (
                                                                <a href={col.footer.href} className="block pt-2 text-[11px] font-bold text-slate-400 hover:text-gold-600 dark:hover:text-gold-400 underline underline-offset-4 transition uppercase tracking-wider">
                                                                    {col.footer.name}
                                                                </a>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                {cat.content?.featured && (
                                                    <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-100 dark:border-white/5">
                                                        <img 
                                                            src={cat.content.featured.image} 
                                                            alt={cat.content.featured.title}
                                                            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                        <div className="absolute bottom-8 left-8 pr-8">
                                                            <h4 className="text-base font-bold tracking-tight text-white uppercase">
                                                                {cat.content.featured.title}
                                                            </h4>
                                                            <p className="mt-2 text-xs text-white/90 leading-relaxed font-medium">
                                                                {cat.content.featured.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[150] bg-white dark:bg-neutral-950 flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg">
                                    M
                                </div>
                                <span className="text-lg font-bold tracking-wide">Miu Store</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-600 dark:text-slate-300">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <ul className="space-y-4">
                                {navigation_menus.filter(m => m.type !== 'top_bar').map((cat) => (
                                    <li key={cat.id} className="border-b border-slate-50 dark:border-white/5 pb-4 last:border-0">
                                        <div className="flex items-center justify-between">
                                            <Link 
                                                href={cat.type === 'link' ? getUrl(cat.url) : '#'}
                                                className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider flex-1"
                                                onClick={() => cat.type === 'link' && setIsMobileMenuOpen(false)}
                                            >
                                                {cat.name}
                                            </Link>
                                            {cat.type === 'mega' && (
                                                <button 
                                                    onClick={() => toggleMobileSubmenu(cat.id)}
                                                    className="p-2 text-gold-500"
                                                >
                                                    <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${expandedMobileMenus[cat.id] ? 'rotate-180' : ''}`} />
                                                </button>
                                            )}
                                        </div>
                                        
                                        <AnimatePresence>
                                            {cat.type === 'mega' && expandedMobileMenus[cat.id] && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden mt-4 ml-4 space-y-6"
                                                >
                                                    {cat.content?.columns?.map((col, idx) => (
                                                        <div key={idx} className="space-y-3">
                                                            <h5 className="text-[10px] font-bold text-gold-600 dark:text-gold-500 uppercase tracking-[0.2em]">{col.title}</h5>
                                                            <ul className="space-y-3 ml-2 border-l border-slate-100 dark:border-white/10 pl-4">
                                                                {col.links?.map((link, lIdx) => (
                                                                    <li key={lIdx}>
                                                                        <a href={link.href} className="text-sm text-slate-600 dark:text-slate-400" onClick={() => setIsMobileMenuOpen(false)}>
                                                                            {link.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 space-y-4">
                            <Link 
                                href={isLoggedIn ? route('client.dashboard') : route('login')}
                                className="block w-full py-4 bg-neutral-900 dark:bg-gold-500 text-white dark:text-neutral-950 text-center font-bold tracking-widest text-sm rounded-xl shadow-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {isLoggedIn ? 'MINHA CONTA' : 'LOGIN / CADASTRO'}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </header>
        </>
    );
}
