import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Key,
    Plus,
    Trash2,
    Star,
    Image as ImageIcon,
    Layers,
    Info,
    Package,
    Palette,
    Globe,
    Type,
    Search,
    Hash,
    Truck,
    Maximize,
    Settings,
    FileText,
    Save,
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    GripVertical,
    Scissors,
    Tag
} from 'lucide-react';

export default function Edit({ product, categories, availableShippingMethods }) {
    const [activeTab, setActiveTab] = useState('general');

    const { data, setData, put, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        slug: product.slug || '',
        type: product.type || '',
        material: product.material || '',
        sku: product.sku || '',
        description: product.description || '',
        price: product.price || 0,
        stock: product.stock || 0,
        image: product.image || '',
        is_active: product.is_active === 1 || product.is_active === true,
        available_sizes: (product.available_sizes || []).join('\n'),
        available_colors: (product.available_colors || []).join('\n'),
        customization_options: (product.customization_options || []).join('\n'),
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
        meta_keywords: product.meta_keywords || '',
        images: product.images || [],
        size_guide: product.size_guide || '',
        shipping_methods: product.shipping_methods || [],
        origin_zip: product.origin_zip || '',
        allow_pickup: product.allow_pickup === 1 || product.allow_pickup === true,
        variants: product.variants || [],
    });

    const addVariant = () => {
        setData('variants', [...data.variants, {
            attributes: { size: '', color: '' },
            price: null,
            stock: 0,
            sku: ''
        }]);
    };

    const removeVariant = (index) => {
        setData('variants', data.variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index, field, value) => {
        const newVariants = [...data.variants];
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            newVariants[index][parent][child] = value;
        } else {
            newVariants[index][field] = value;
        }
        setData('variants', newVariants);
    };

    const addImage = () => {
        setData('images', [...data.images, { url: '', is_main: data.images.length === 0, sort_order: data.images.length }]);
    };

    const removeImage = (index) => {
        const newImages = data.images.filter((_, i) => i !== index);
        // If we removed the main image, set the first one as main
        if (data.images[index].is_main && newImages.length > 0) {
            newImages[0].is_main = true;
        }
        setData('images', newImages);
    };

    const setMainImage = (index) => {
        const newImages = data.images.map((img, i) => ({
            ...img,
            is_main: i === index
        }));
        setData('images', newImages);
    };

    const updateImageUrl = (index, url) => {
        const newImages = [...data.images];
        newImages[index].url = url;
        setData('images', newImages);
    };

    const submit = (event) => {
        event.preventDefault();
        put(route('admin.products.update', product));
    };

    const tabs = [
        { id: 'general', label: 'Informações Gerais', icon: Info },
        { id: 'images', label: 'Imagens', icon: ImageIcon },
        { id: 'inventory', label: 'Estoque & Preço', icon: Package },
        { id: 'variants', label: 'Variações de Preço', icon: Layers },
        { id: 'customization', label: 'Customização', icon: Palette },
        { id: 'shipping', label: 'Entregas', icon: Truck },
        { id: 'seo', label: 'SEO & Meta', icon: Globe },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                            <Link href={route('admin.products.index')} className="hover:text-gold-500 transition-colors">Produtos</Link>
                            <span>/</span>
                            <span>Editar</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Editar Produto</h1>
                    </div>
                    <Link
                        href={route('admin.products.index')}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-gold-400 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar à lista
                    </Link>
                </div>
            }
        >
            <Head title={`Editar ${product.name}`} />

            <div className="mx-auto max-w-6xl pb-20">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                    {/* Navigation Sidebar */}
                    <div className="space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all ${activeTab === tab.id
                                        ? 'bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 scale-[1.02]'
                                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5'
                                    }`}
                            >
                                <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-neutral-950' : 'text-slate-400'}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Form Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
                    >
                        <form onSubmit={submit} className="space-y-8">
                            <AnimatePresence mode="wait">
                                {activeTab === 'general' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Type className="h-4 w-4 text-gold-500" />
                                                    Nome do Produto
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                    required
                                                />
                                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Search className="h-4 w-4 text-gold-500" />
                                                    Slug (URL)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.slug}
                                                    onChange={(e) => setData('slug', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                    required
                                                />
                                                {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                                            </div>
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Tag className="h-4 w-4 text-gold-500" />
                                                    Categoria
                                                </label>
                                                <select
                                                    value={data.category_id}
                                                    onChange={(e) => setData('category_id', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                    required
                                                >
                                                    <option value="">Selecione uma categoria</option>
                                                    {categories.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Layers className="h-4 w-4 text-gold-500" />
                                                    Tipo de Produto
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.type}
                                                    onChange={(e) => setData('type', e.target.value)}
                                                    placeholder="Ex: Calçado, Acessório"
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                <FileText className="h-4 w-4 text-gold-500" />
                                                Descrição Completa
                                            </label>
                                            <textarea
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows={6}
                                                className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                <Globe className="h-4 w-4 text-gold-500" />
                                                URL da Imagem
                                            </label>
                                            <input
                                                type="text"
                                                value={data.image}
                                                onChange={(e) => setData('image', e.target.value)}
                                                placeholder="/images/products/example.jpg"
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                            />
                                            <label htmlFor="is_active" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                Produto Ativo (visível na loja)
                                            </label>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'images' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Galeria de Imagens</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Adicione múltiplas imagens e selecione a principal.</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addImage}
                                                className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-2 text-sm font-bold text-gold-600 transition hover:bg-gold-500/20 dark:text-gold-400"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Adicionar Imagem
                                            </button>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            {data.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={`group relative rounded-[2rem] border p-4 transition-all ${image.is_main
                                                            ? 'border-gold-500 bg-gold-500/5 ring-1 ring-gold-500'
                                                            : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50'
                                                        }`}
                                                >
                                                    <div className="aspect-square mb-4 overflow-hidden rounded-2xl bg-white dark:bg-slate-800">
                                                        {image.url ? (
                                                            <img src={image.url} alt={`Preview ${index}`} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                                <ImageIcon className="h-10 w-10 opacity-20" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                value={image.url}
                                                                onChange={(e) => updateImageUrl(index, e.target.value)}
                                                                placeholder="URL da imagem..."
                                                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-2 text-xs transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                            />
                                                        </div>

                                                        <div className="flex items-center justify-between gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setMainImage(index)}
                                                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${image.is_main
                                                                        ? 'bg-gold-500 text-neutral-950'
                                                                        : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                                                    }`}
                                                            >
                                                                <Star className={`h-3.5 w-3.5 ${image.is_main ? 'fill-current' : ''}`} />
                                                                {image.is_main ? 'Principal' : 'Tornar Principal'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {image.is_main && (
                                                        <div className="absolute -right-2 -top-2 rounded-full bg-gold-500 p-1.5 text-neutral-950 shadow-lg">
                                                            <Star className="h-4 w-4 fill-current" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {data.images.length === 0 && (
                                                <div className="col-span-full py-20 text-center">
                                                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
                                                        <ImageIcon className="h-10 w-10 text-slate-400" />
                                                    </div>
                                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Nenhuma imagem</h4>
                                                    <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Adicione imagens para mostrar seu produto na loja.</p>
                                                    <button
                                                        type="button"
                                                        onClick={addImage}
                                                        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-gold-400"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        Adicionar Primeira Imagem
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'inventory' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    Preço de Venda (R$)
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">R$</span>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={data.price}
                                                        onChange={(e) => setData('price', e.target.value)}
                                                        className="w-full rounded-2xl border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    Quantidade em Estoque
                                                </label>
                                                <input
                                                    type="number"
                                                    value={data.stock}
                                                    onChange={(e) => setData('stock', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Hash className="h-4 w-4 text-gold-500" />
                                                    SKU / Código do Produto
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.sku}
                                                    onChange={(e) => setData('sku', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Truck className="h-4 w-4 text-gold-500" />
                                                    Material Principal
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.material}
                                                    onChange={(e) => setData('material', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'variants' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Variações de Produto</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Defina preços e estoques específicos para combinações de tamanho e cor.</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addVariant}
                                                className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-2 text-sm font-bold text-gold-600 transition hover:bg-gold-500/20 dark:text-gold-400"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Adicionar Variação
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {data.variants.map((variant, index) => (
                                                <div
                                                    key={index}
                                                    className="relative space-y-4 rounded-3xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-white/5 pt-10"
                                                >
                                                    {/* Identificador da Variação */}
                                                    <div className="absolute left-6 top-4 flex items-center gap-2">
                                                        <span className="flex h-5 w-8 items-center justify-center rounded-lg bg-gold-500 text-[10px] font-black text-neutral-950 shadow-sm shadow-gold-500/20">
                                                            #{index + 1}
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                                            Variação
                                                        </span>
                                                    </div>
                                                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tamanho</label>
                                                            <select
                                                                value={variant.attributes.size || ''}
                                                                onChange={(e) => updateVariant(index, 'attributes.size', e.target.value)}
                                                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white transition focus:border-gold-500 focus:ring-gold-500"
                                                            >
                                                                <option value="">Nenhum</option>
                                                                {data.available_sizes.split('\n').filter(Boolean).map(s => (
                                                                    <option key={s} value={s}>{s}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Cor</label>
                                                            <select
                                                                value={variant.attributes.color || ''}
                                                                onChange={(e) => updateVariant(index, 'attributes.color', e.target.value)}
                                                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white transition focus:border-gold-500 focus:ring-gold-500"
                                                            >
                                                                <option value="">Nenhuma</option>
                                                                {data.available_colors.split('\n').filter(Boolean).map(c => (
                                                                    <option key={c} value={c}>{c}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Preço Diferenciado (R$)</label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">R$</span>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={variant.price || ''}
                                                                    onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                                                    placeholder={data.price}
                                                                    className="w-full rounded-xl border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white transition focus:border-gold-500 focus:ring-gold-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Segunda Linha: Estoque, SKU e Ações */}
                                                    <div className="grid gap-4 grid-cols-1 md:grid-cols-[1fr_2fr_auto] items-end pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estoque</label>
                                                            <input
                                                                type="number"
                                                                value={variant.stock}
                                                                onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white transition focus:border-gold-500 focus:ring-gold-500"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">SKU da Variação</label>
                                                            <input
                                                                type="text"
                                                                value={variant.sku || ''}
                                                                onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                                                placeholder="Opcional"
                                                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white transition focus:border-gold-500 focus:ring-gold-500"
                                                            />
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => removeVariant(index)}
                                                            className="flex h-[42px] items-center gap-2 rounded-xl bg-red-500/10 px-4 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
                                                            title="Remover Variação"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="md:hidden lg:inline">Remover</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            {data.variants.length === 0 && (
                                                <div className="rounded-[2rem] border-2 border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
                                                    <Layers className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-700" />
                                                    <p className="mt-4 text-sm text-slate-500">Nenhuma variação de preço definida. O preço base será usado para todas as combinações.</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'customization' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Maximize className="h-4 w-4 text-gold-500" />
                                                    Tamanhos (um por linha)
                                                </label>
                                                <textarea
                                                    value={data.available_sizes}
                                                    onChange={(e) => setData('available_sizes', e.target.value)}
                                                    rows={5}
                                                    placeholder="35&#10;36&#10;37"
                                                    className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Palette className="h-4 w-4 text-gold-500" />
                                                    Cores (uma por linha)
                                                </label>
                                                <textarea
                                                    value={data.available_colors}
                                                    onChange={(e) => setData('available_colors', e.target.value)}
                                                    rows={5}
                                                    placeholder="Preto&#10;Branco&#10;Dourado"
                                                    className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                <Scissors className="h-4 w-4 text-gold-500" />
                                                Guia de Tamanhos (Markdown ou HTML permitido)
                                            </label>
                                            <textarea
                                                value={data.size_guide}
                                                onChange={(e) => setData('size_guide', e.target.value)}
                                                rows={10}
                                                placeholder="Tabela de medidas ou instruções detalhadas..."
                                                className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'shipping' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-gold-50 dark:bg-gold-500/5 rounded-[2rem] p-6 border border-gold-100 dark:border-gold-500/10 mb-6">
                                            <div className="flex gap-4">
                                                <div className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-neutral-950">
                                                    <Truck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-white">Configurações de Entrega</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                        Habilite ou desabilite métodos de entrega específicos para este produto.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-2 mb-8">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    <Hash className="h-4 w-4 text-gold-500" />
                                                    CEP de Origem Específico (Opcional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.origin_zip}
                                                    onChange={(e) => setData('origin_zip', e.target.value)}
                                                    placeholder="00000-000"
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                                />
                                                <p className="text-[10px] text-slate-400">Se deixado em branco, será usado o CEP padrão da loja.</p>
                                            </div>

                                            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                                <input
                                                    type="checkbox"
                                                    id="allow_pickup"
                                                    checked={data.allow_pickup}
                                                    onChange={(e) => setData('allow_pickup', e.target.checked)}
                                                    className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                                />
                                                <label htmlFor="allow_pickup" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    Permitir Retirada no Local
                                                </label>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {availableShippingMethods.map((method) => (
                                                <div 
                                                    key={method.id}
                                                    onClick={() => {
                                                        const current = data.shipping_methods;
                                                        if (current.includes(method.id)) {
                                                            setData('shipping_methods', current.filter(id => id !== method.id));
                                                        } else {
                                                            setData('shipping_methods', [...current, method.id]);
                                                        }
                                                    }}
                                                    className={`cursor-pointer flex items-center justify-between rounded-2xl border p-5 transition-all ${
                                                        data.shipping_methods.includes(method.id)
                                                            ? 'border-gold-500 bg-gold-500/5 shadow-lg shadow-gold-500/10'
                                                            : 'border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-white/5'
                                                    }`}
                                                >
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{method.name}</p>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{method.provider}</p>
                                                    </div>
                                                    <div className={`h-6 w-11 rounded-full p-1 transition-colors ${
                                                        data.shipping_methods.includes(method.id) ? 'bg-gold-500' : 'bg-slate-300 dark:bg-slate-700'
                                                    }`}>
                                                        <div className={`h-4 w-4 rounded-full bg-white transition-transform ${
                                                            data.shipping_methods.includes(method.id) ? 'translate-x-5' : 'translate-x-0'
                                                        }`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                                            <div className="flex gap-4">
                                                <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                                <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                                                    <strong>Nota:</strong> Se nenhum método for selecionado, todos os métodos habilitados globalmente serão permitidos para este produto. Caso selecione um ou mais, apenas os selecionados serão mostrados se este produto estiver no carrinho.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'seo' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-gold-50 dark:bg-gold-500/5 rounded-[2rem] p-6 border border-gold-100 dark:border-gold-500/10 mb-6">
                                            <div className="flex gap-4">
                                                <div className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-neutral-950">
                                                    <Globe className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-white">Otimização para Motores de Busca</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                        Melhore a visibilidade deste produto no Google e outros buscadores.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                <Type className="h-4 w-4 text-gold-500" />
                                                Meta Title
                                            </label>
                                            <input
                                                type="text"
                                                value={data.meta_title}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                placeholder="Título que aparece nos buscadores"
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                            />
                                            <p className="text-[10px] text-slate-400">Recomendado: 50-60 caracteres.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                <FileText className="h-4 w-4 text-gold-500" />
                                                Meta Description
                                            </label>
                                            <textarea
                                                value={data.meta_description}
                                                onChange={(e) => setData('meta_description', e.target.value)}
                                                rows={4}
                                                placeholder="Breve resumo que aparece abaixo do título nos resultados de busca"
                                                className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                            />
                                            <p className="text-[10px] text-slate-400">Recomendado: 150-160 caracteres.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                                <Key className="h-4 w-4 text-gold-500" />
                                                Meta Keywords
                                            </label>
                                            <input
                                                type="text"
                                                value={data.meta_keywords}
                                                onChange={(e) => setData('meta_keywords', e.target.value)}
                                                placeholder="palavra1, palavra2, frase chave"
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex items-center justify-end border-t border-slate-100 pt-8 dark:border-slate-800">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-10 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                                >
                                    <Save className="h-5 w-5" />
                                    {processing ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
