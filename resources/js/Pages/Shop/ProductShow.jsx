import React, { useState, useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
    Heart, 
    ShoppingCart, 
    ZoomIn, 
    ChevronRight, 
    ChevronLeft, 
    Truck, 
    ShieldCheck, 
    RotateCcw,
    Plus,
    Minus,
    Info,
    ChevronDown,
    MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShopNavbar from '@/Components/ShopNavbar';
import AddToCartButton from '@/Components/AddToCartButton';

const Accordion = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-slate-200 dark:border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-6 text-left"
            >
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">{title}</span>
                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ProductShow({ product, isFavorited }) {
    const { post } = useForm();
    const { auth } = usePage().props;
    const isLoggedIn = !!auth?.user;
    
    const [selectedSize, setSelectedSize] = useState(product.available_sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.available_colors?.[0] || '');
    const [activeImage, setActiveImage] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [cep, setCep] = useState('');

    const images = product.images?.length > 0 ? product.images : [{ url: product.image }];
    
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setZoomPos({ x, y });
    };

    const toggleFavorite = () => {
        if (!isLoggedIn) {
            window.location.href = route('login');
            return;
        }
        post(route('client.favorites.toggle', product.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans selection:bg-gold-500/30">
            <Head title={`${product.meta_title || product.name} | Podóloga Rodrigues`}>
                {!!product.meta_description && <meta name="description" content={product.meta_description} />}
                {!!product.meta_keywords && <meta name="keywords" content={product.meta_keywords} />}
            </Head>

            <ShopNavbar />

            <main className="pt-28 pb-20">
                {/* Breadcrumbs */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-xs uppercase tracking-widest text-slate-400">
                        <Link href="/" className="hover:text-gold-500 transition-colors">Início</Link>
                        <span className="mx-2">/</span>
                        <Link href={route('products.index')} className="hover:text-gold-500 transition-colors">Produtos</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900 dark:text-slate-200">{product.name}</span>
                    </nav>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        
                        {/* Left Column: Gallery */}
                        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-6">
                            {/* Thumbnails */}
                            <div className="flex flex-row gap-3 lg:flex-col lg:w-20 lg:shrink-0">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                                            activeImage === idx 
                                                ? 'border-gold-500 scale-105 shadow-lg shadow-gold-500/10' 
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img.url} alt={product.name} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image with Zoom */}
                            <div 
                                className="relative flex-1 overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 group cursor-crosshair"
                                onMouseEnter={() => setIsZooming(true)}
                                onMouseLeave={() => setIsZooming(false)}
                                onMouseMove={handleMouseMove}
                            >
                                <img
                                    src={images[activeImage]?.url}
                                    alt={product.name}
                                    className={`h-auto w-full transition-transform duration-500 ${isZooming ? 'scale-150' : 'scale-100'}`}
                                    style={isZooming ? {
                                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                                    } : {}}
                                />
                                
                                <AnimatePresence>
                                    {!isZooming && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-black/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white backdrop-blur-md shadow-xl border border-white/20 dark:border-white/5"
                                        >
                                            <ZoomIn className="h-3 w-3" />
                                            Passe o mouse para zoom
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Badge */}
                                {product.type && (
                                    <div className="absolute top-6 left-6 rounded-full bg-gold-500 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-950 shadow-lg shadow-gold-500/20">
                                        {product.type}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Info */}
                        <aside className="space-y-10">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600 dark:text-gold-400 mb-2">
                                    {product.category?.name || 'Exclusivo'}
                                </p>
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                                    {product.name}
                                </h1>
                                <div className="mt-6 flex items-baseline gap-4">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                        R$ {parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        ou 10x de R$ {(product.price / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros
                                    </span>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-8">
                                {product.available_sizes?.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Tamanho</label>
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-gold-600 hover:text-gold-500 transition-colors">Guia de Tamanhos</button>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {product.available_sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`min-w-[54px] rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                                                        selectedSize === size 
                                                            ? 'border-gold-500 bg-gold-500/5 text-slate-900 dark:text-white shadow-lg shadow-gold-500/10' 
                                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.available_colors?.length > 0 && (
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Cor</label>
                                        <div className="flex flex-wrap gap-3">
                                            {product.available_colors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition-all ${
                                                        selectedColor === color 
                                                            ? 'border-gold-500 bg-gold-500/5 text-slate-900 dark:text-white' 
                                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Delivery Check */}
                                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-white/5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <Truck className="h-4 w-4" />
                                        Frete e Prazo de entrega
                                    </label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="text"
                                                value={cep}
                                                onChange={(e) => setCep(e.target.value)}
                                                placeholder="Digite seu CEP"
                                                className="w-full rounded-full border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm focus:border-gold-500 focus:ring-gold-500 dark:border-white/5 dark:bg-white/5 dark:text-white"
                                            />
                                        </div>
                                        <button className="rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition hover:opacity-90 active:scale-95">
                                            OK
                                        </button>
                                    </div>
                                    <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gold-600 hover:underline">Não sei meu CEP</a>
                                </div>

                                {/* Actions */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <AddToCartButton 
                                        product={product} 
                                        options={{ size: selectedSize, color: selectedColor }}
                                        className="flex w-full items-center justify-center gap-3 rounded-full bg-gold-500 py-5 text-sm font-bold uppercase tracking-widest text-neutral-950 shadow-xl shadow-gold-500/20 transition-all hover:bg-gold-400 hover:scale-[1.02] active:scale-95"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        Adicionar à sacola
                                    </AddToCartButton>
                                    <button 
                                        onClick={toggleFavorite}
                                        className={`flex w-full items-center justify-center gap-3 rounded-full border-2 py-5 text-sm font-bold uppercase tracking-widest transition-all ${
                                            isFavorited 
                                                ? 'border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/20' 
                                                : 'border-slate-200 bg-transparent text-slate-900 hover:border-red-400 hover:text-red-500 dark:border-white/10 dark:text-white'
                                        }`}
                                    >
                                        <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                                        {isFavorited ? 'Remover' : 'Favoritar'}
                                    </button>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-slate-100 dark:border-white/5">
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="rounded-full bg-slate-50 dark:bg-white/5 p-4">
                                        <ShieldCheck className="h-6 w-6 text-gold-500" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">Garantia <br/>Vitalícia</p>
                                </div>
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="rounded-full bg-slate-50 dark:bg-white/5 p-4">
                                        <RotateCcw className="h-6 w-6 text-gold-500" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">Troca Grátis <br/>em 30 dias</p>
                                </div>
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="rounded-full bg-slate-50 dark:bg-white/5 p-4">
                                        <Info className="h-6 w-6 text-gold-500" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">Consultoria <br/>Especializada</p>
                                </div>
                            </div>

                            {/* Accordions */}
                            <div className="space-y-2">
                                <Accordion title="Detalhes do Produto" defaultOpen={true}>
                                    <p className="mb-4">{product.description}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {product.material && (
                                            <div>
                                                <span className="block text-[10px] font-bold uppercase text-slate-400">Material</span>
                                                <span className="text-slate-900 dark:text-white">{product.material}</span>
                                            </div>
                                        )}
                                        {product.sku && (
                                            <div>
                                                <span className="block text-[10px] font-bold uppercase text-slate-400">Código</span>
                                                <span className="text-slate-900 dark:text-white">{product.sku}</span>
                                            </div>
                                        )}
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase text-slate-400">Estoque</span>
                                            <span className="text-slate-900 dark:text-white">{product.stock} unidades disponíveis</span>
                                        </div>
                                    </div>
                                </Accordion>
                                
                                {product.customization_options?.length > 0 && (
                                    <Accordion title="Personalização">
                                        <ul className="space-y-2">
                                            {product.customization_options.map(opt => (
                                                <li key={opt} className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                                                    {opt}
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion>
                                )}

                                <Accordion title="Composição e Cuidados">
                                    <p>Para manter a beleza de sua peça, evite contato com produtos químicos, perfumes e água do mar. Limpe apenas com uma flanela seca e macia.</p>
                                </Accordion>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* You Might Also Like Section */}
                <section className="mt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                            Você também pode gostar
                        </h2>
                        <div className="mt-4 mx-auto h-1 w-12 bg-gold-500" />
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <div className="h-full w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                                        <span className="rounded-full bg-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-black">Ver Produto</span>
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Coleção Premium</p>
                                    <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-gold-600 transition-colors">Produto Recomendado {i}</h3>
                                    <p className="mt-2 font-bold text-slate-900 dark:text-white">R$ 1.290,00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
