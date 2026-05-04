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
    MapPin,
    Star,
    Zap,
    MessageSquare,
    Ruler,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShopNavbar from '@/Components/ShopNavbar';
import AddToCartButton from '@/Components/AddToCartButton';
import Footer from '@/Components/Footer';
import axios from 'axios';

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

export default function ProductShow({ product, isFavorited, relatedProducts = [] }) {
    const { post } = useForm();
    const { auth } = usePage().props;
    const isLoggedIn = !!auth?.user;
    
    const [selectedSize, setSelectedSize] = useState(product.available_sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.available_colors?.[0] || '');
    const [activeImage, setActiveImage] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [cep, setCep] = useState('');
    const [shippingData, setShippingData] = useState(null);
    const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    
    const { data: reviewData, setData: setReviewData, post: postReview, processing: processingReview, reset: resetReview } = useForm({
        rating: 5,
        comment: '',
    });

    const activeVariant = product.variants?.find(v => 
        (v.attributes.size === selectedSize || (!v.attributes.size && !selectedSize)) && 
        (v.attributes.color === selectedColor || (!v.attributes.color && !selectedColor))
    );

    const displayPrice = activeVariant?.price || product.price;
    const displayStock = activeVariant ? activeVariant.stock : product.stock;
    const displaySku = activeVariant?.sku || product.sku;

    const handleShipping = async () => {
        if (!cep) return;
        setIsCalculatingShipping(true);
        try {
            const response = await axios.post(route('shipping.calculate'), {
                cep,
                product_id: product.id
            });
            setShippingData(response.data);
        } catch (error) {
            console.error('Erro ao calcular frete:', error);
        } finally {
            setIsCalculatingShipping(false);
        }
    };

    const submitReview = (e) => {
        e.preventDefault();
        postReview(route('products.reviews.store', product.id), {
            onSuccess: () => {
                setShowReviewForm(false);
                resetReview();
            }
        });
    };

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
                                
                                {/* Rating Summary */}
                                <div className="mt-4 flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star}
                                                className={`h-4 w-4 ${
                                                    star <= product.average_rating 
                                                        ? 'fill-gold-500 text-gold-500' 
                                                        : 'text-slate-200 dark:text-slate-800'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{product.average_rating}</span>
                                    <span className="text-xs text-slate-400">({product.reviews_count} avaliações)</span>
                                </div>

                                <div className="mt-6 flex items-baseline gap-4">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                        R$ {parseFloat(displayPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        ou 10x de R$ {(displayPrice / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros
                                    </span>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-8">
                                {product.available_sizes?.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Tamanho</label>
                                            {product.size_guide && (
                                                <button 
                                                    onClick={() => setShowSizeGuide(true)}
                                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold-600 hover:text-gold-500 transition-colors"
                                                >
                                                    <Ruler className="h-3 w-3" />
                                                    Guia de Tamanhos
                                                </button>
                                            )}
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
                                        <button 
                                            onClick={handleShipping}
                                            disabled={isCalculatingShipping}
                                            className="rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition hover:opacity-90 active:scale-95 disabled:opacity-50"
                                        >
                                            {isCalculatingShipping ? '...' : 'OK'}
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {shippingData && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="space-y-3 pt-2"
                                            >
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                                    Entrega para: {shippingData.address.logradouro}, {shippingData.address.bairro}
                                                </p>
                                                <div className="grid gap-2">
                                                    {shippingData.methods.map((method, idx) => (
                                                        <div key={idx} className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-white/5 p-4 border border-slate-100 dark:border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="rounded-full bg-white dark:bg-slate-900 p-2 shadow-sm">
                                                                    {method.icon === 'zap' ? <Zap className="h-4 w-4 text-gold-500" /> : <Truck className="h-4 w-4 text-gold-500" />}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{method.name}</p>
                                                                    <p className="text-xs text-slate-400">Até {method.deadline} dias úteis</p>
                                                                </div>
                                                            </div>
                                                            <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {method.price.toFixed(2).replace('.', ',')}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
                        </aside>
                    </div>

                    {/* Full Width Details Section */}
                    <div className="mt-20 space-y-20">
                        {/* Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 rounded-[3rem] px-8">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm">
                                    <ShieldCheck className="h-8 w-8 text-gold-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-1">Garantia Vitalícia</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Qualidade certificada em cada detalhe.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm">
                                    <RotateCcw className="h-8 w-8 text-gold-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-1">Troca Grátis</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Até 30 dias para trocar sua peça.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm">
                                    <Info className="h-8 w-8 text-gold-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-1">Consultoria Especializada</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Atendimento personalizado via WhatsApp.</p>
                                </div>
                            </div>
                        </div>

                        {/* Accordions */}
                        <div className="max-w-4xl mx-auto space-y-2">
                            <Accordion title="Detalhes do Produto" defaultOpen={true}>
                                <p className="mb-8 text-base leading-relaxed">{product.description}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    {product.material && (
                                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Material</span>
                                            <span className="text-slate-900 dark:text-white font-medium">{product.material}</span>
                                        </div>
                                    )}
                                    {displaySku && (
                                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Código</span>
                                            <span className="text-slate-900 dark:text-white font-medium">{displaySku}</span>
                                        </div>
                                    )}
                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Estoque</span>
                                        <span className="text-slate-900 dark:text-white font-medium">{displayStock} unidades disponíveis</span>
                                    </div>
                                </div>
                            </Accordion>
                            
                            {product.customization_options?.length > 0 && (
                                <Accordion title="Personalização">
                                    <ul className="space-y-3">
                                        {product.customization_options.map(opt => (
                                            <li key={opt} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                                                {opt}
                                            </li>
                                        ))}
                                    </ul>
                                </Accordion>
                            )}

                            <Accordion title="Composição e Cuidados">
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Para manter a beleza e o brilho de sua peça por muito tempo, recomendamos alguns cuidados essenciais:
                                    <br /><br />
                                    • Evite contato com produtos químicos, perfumes, cremes e spray de cabelo.
                                    <br />
                                    • Retire as joias antes de tomar banho, entrar na piscina ou no mar.
                                    <br />
                                    • Guarde cada peça individualmente em local seco e arejado para evitar riscos.
                                    <br />
                                    • Limpe apenas com uma flanela seca e macia após o uso.
                                </p>
                            </Accordion>

                            <Accordion title={`Avaliações (${product.reviews_count})`}>
                                <div className="space-y-10">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <div className="text-center sm:text-left">
                                            <p className="text-5xl font-black text-slate-900 dark:text-white">{product.average_rating}</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star 
                                                        key={star}
                                                        className={`h-5 w-5 ${
                                                            star <= product.average_rating 
                                                                ? 'fill-gold-500 text-gold-500' 
                                                                : 'text-slate-200 dark:text-slate-800'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest font-bold">{product.reviews_count} avaliações confirmadas</p>
                                        </div>
                                        <button 
                                            onClick={() => setShowReviewForm(!showReviewForm)}
                                            className="rounded-full bg-slate-900 dark:bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition hover:opacity-90 shadow-xl"
                                        >
                                            Deixar minha Avaliação
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {showReviewForm && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <form onSubmit={submitReview} className="space-y-6 rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 border-2 border-gold-500/20 shadow-2xl">
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Qual sua nota para o produto?</label>
                                                        <div className="flex gap-3">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <button
                                                                    key={star}
                                                                    type="button"
                                                                    onClick={() => setReviewData('rating', star)}
                                                                    className="transition-transform hover:scale-110 active:scale-125"
                                                                >
                                                                    <Star className={`h-8 w-8 ${star <= reviewData.rating ? 'fill-gold-500 text-gold-500' : 'text-slate-200 dark:text-slate-800'}`} />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Seu Comentário</label>
                                                        <textarea
                                                            value={reviewData.comment}
                                                            onChange={(e) => setReviewData('comment', e.target.value)}
                                                            className="w-full rounded-[2rem] border-slate-200 bg-slate-50 p-6 text-sm dark:border-white/5 dark:bg-slate-950 dark:text-white focus:ring-gold-500 focus:border-gold-500 transition-all"
                                                            placeholder="Conte-nos o que achou da peça, acabamento, entrega..."
                                                            rows={4}
                                                            required
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={processingReview}
                                                        className="w-full rounded-full bg-gold-500 py-5 text-sm font-bold uppercase tracking-widest text-neutral-950 shadow-xl shadow-gold-500/20 disabled:opacity-50 hover:bg-gold-400 transition-all"
                                                    >
                                                        {processingReview ? 'Publicando...' : 'Enviar Avaliação'}
                                                    </button>
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="grid gap-8">
                                        {product.reviews?.map((review) => (
                                            <div key={review.id} className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:shadow-xl">
                                                <div className="flex items-center justify-between gap-4 mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 font-black text-lg">
                                                            {review.user?.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{review.user?.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star 
                                                                key={star}
                                                                className={`h-3 w-3 ${star <= review.rating ? 'fill-gold-500 text-gold-500' : 'text-slate-200 dark:text-slate-800'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic text-lg">"{review.comment}"</p>
                                            </div>
                                        ))}
                                        {product.reviews_count === 0 && (
                                            <div className="text-center py-16 px-8 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                                                <MessageSquare className="h-12 w-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                                                <p className="text-sm text-slate-400 font-medium">Nenhuma avaliação ainda. Seja o primeiro a avaliar esta peça!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showSizeGuide && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowSizeGuide(false)}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl overflow-hidden rounded-[3rem] bg-white dark:bg-slate-900 shadow-2xl"
                            >
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 p-8">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-2xl bg-gold-500 p-2.5">
                                            <Ruler className="h-5 w-5 text-neutral-950" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Guia de Tamanhos</h2>
                                    </div>
                                    <button 
                                        onClick={() => setShowSizeGuide(false)}
                                        className="rounded-full bg-slate-100 p-2 text-slate-400 transition hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="max-h-[60vh] overflow-y-auto p-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                                        {product.size_guide}
                                    </div>
                                </div>
                                <div className="bg-slate-50 dark:bg-white/5 p-8 flex justify-center">
                                    <button 
                                        onClick={() => setShowSizeGuide(false)}
                                        className="rounded-full bg-slate-900 dark:bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition hover:opacity-90"
                                    >
                                        Entendi, obrigado!
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* You Might Also Like Section */}
                <section className="mt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="mb-16 text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-gold-600 dark:text-gold-400 mb-4">Combinações Ideais</p>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            Você também pode gostar
                        </h2>
                        <div className="mt-6 mx-auto h-1 w-12 bg-gold-500 rounded-full" />
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((related) => (
                            <Link
                                key={related.id}
                                href={route('products.show', { product: related.slug })}
                                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 bg-white dark:bg-neutral-900/40 p-4 transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-white/5">
                                    <img
                                        src={related.image}
                                        alt={related.name}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute left-4 top-4 rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white backdrop-blur-md">
                                        {related.category?.name}
                                    </div>
                                    {related.reviews_count > 0 && (
                                        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                                            <Star className="h-2.5 w-2.5 fill-gold-500 text-gold-500" />
                                            {related.average_rating}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="text-lg font-bold text-black dark:text-white transition group-hover:text-gold-600 dark:group-hover:text-gold-400">
                                        {related.name}
                                    </h3>
                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <span className="text-lg font-black text-black dark:text-white">
                                            R$ {parseFloat(related.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 transition-all duration-300 group-hover:scale-110">
                                            <ShoppingCart className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
