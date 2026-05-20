import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Save, 
    Layout, 
    Sparkles, 
    Heart, 
    Truck, 
    Info,
    Share2,
    Phone,
    Plus,
    Trash2,
    Settings2,
    ShieldCheck,
    CreditCard
} from 'lucide-react';

export default function Edit({ settings }) {
    const [activeTab, setActiveTab] = React.useState('general');

    const defaultFooter = {
        brand_name: 'Miu Store',
        brand_description: 'Joias exclusivas e produtos de bem-estar selecionados para elevar sua autoestima e proporcionar momentos de puro luxo.',
        social_instagram: '#',
        social_facebook: '#',
        social_twitter: '#',
        cnpj: 'CNPJ: 00.000.000/0001-00',
        payment_methods: ['credit_card', 'shield', 'truck'],
        contact_phone: '(11) 99999-9999',
        contact_hours: 'Seg. a Sex. das 09h às 18h',
        contact_email: 'contato@miustore.com.br',
        contact_address: "Rua das Joias, 123 - Jardins\nSão Paulo, SP",
        columns: [
            {
                title: 'Categorias',
                links: [
                    { name: 'Joias em Ouro', href: '/produtos' },
                    { name: 'Prata 925', href: '/produtos' },
                    { name: 'Bem-estar', href: '/produtos' },
                    { name: 'Coleções Especiais', href: '/produtos' }
                ]
            },
            {
                title: 'Institucional',
                links: [
                    { name: 'Sobre a Miu Store', href: '#' },
                    { name: 'Política de Trocas', href: '#' },
                    { name: 'Envio e Entrega', href: '#' },
                    { name: 'Contato', href: '#' }
                ]
            }
        ]
    };

    const { data, setData, put, processing, errors } = useForm({
        primary_color: settings.primary_color || 'gold',
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_cta_text: settings.hero_cta_text || '',
        hero_cta_url: settings.hero_cta_url || '',
        hero_secondary_cta_text: settings.hero_secondary_cta_text || '',
        hero_secondary_cta_url: settings.hero_secondary_cta_url || '',
        features: settings.features || [
            { title: '', subtitle: '', icon: 'Sparkles' },
            { title: '', subtitle: '', icon: 'Heart' },
            { title: '', subtitle: '', icon: 'Truck' },
        ],
        footer: settings.footer || defaultFooter
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.home-settings.update'));
    };

    const updateFeature = (index, field, value) => {
        const newFeatures = [...data.features];
        newFeatures[index][field] = value;
        setData('features', newFeatures);
    };

    const handleFooterChange = (field, value) => {
        setData('footer', {
            ...data.footer,
            [field]: value
        });
    };

    const handleFooterColumnTitleChange = (colIdx, title) => {
        const columns = [...data.footer.columns];
        columns[colIdx] = { ...columns[colIdx], title };
        handleFooterChange('columns', columns);
    };

    const handleAddLink = (colIdx) => {
        const columns = [...data.footer.columns];
        const links = [...(columns[colIdx].links || [])];
        links.push({ name: '', href: '' });
        columns[colIdx] = { ...columns[colIdx], links };
        handleFooterChange('columns', columns);
    };

    const handleRemoveLink = (colIdx, linkIdx) => {
        const columns = [...data.footer.columns];
        const links = [...(columns[colIdx].links || [])];
        links.splice(linkIdx, 1);
        columns[colIdx] = { ...columns[colIdx], links };
        handleFooterChange('columns', columns);
    };

    const handleLinkChange = (colIdx, linkIdx, key, val) => {
        const columns = [...data.footer.columns];
        const links = [...(columns[colIdx].links || [])];
        links[linkIdx] = { ...links[linkIdx], [key]: val };
        columns[colIdx] = { ...columns[colIdx], links };
        handleFooterChange('columns', columns);
    };

    const togglePaymentMethod = (method) => {
        const currentMethods = data.footer.payment_methods || [];
        let newMethods;
        if (currentMethods.includes(method)) {
            newMethods = currentMethods.filter(m => m !== method);
        } else {
            newMethods = [...currentMethods, method];
        }
        handleFooterChange('payment_methods', newMethods);
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">
                        Configurações da Loja
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Gerencie a paleta de cores, visual da homepage e informações do rodapé.
                    </p>
                </div>
            }
        >
            <Head title="Configurações da Loja" />

            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 max-w-5xl mx-auto">
                <button
                    type="button"
                    onClick={() => setActiveTab('general')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${
                        activeTab === 'general'
                            ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                >
                    <Layout className="h-4 w-4" />
                    Design da Home
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('footer')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${
                        activeTab === 'footer'
                            ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                >
                    <Settings2 className="h-4 w-4" />
                    Configuração do Rodapé (Footer)
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-8 pb-12">
                {activeTab === 'general' ? (
                    <>
                        {/* Theme Color Selection */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Paleta de Cores do Site</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                                {[
                                    { id: 'gold', name: 'Dourado Miú', color: '#d99712', class: 'bg-[#d99712]' },
                                    { id: 'rose', name: 'Rose Premium', color: '#e11d48', class: 'bg-[#e11d48]' },
                                    { id: 'emerald', name: 'Esmeralda Luxo', color: '#059669', class: 'bg-[#059669]' },
                                    { id: 'blue', name: 'Azul Safira', color: '#2563eb', class: 'bg-[#2563eb]' },
                                    { id: 'slate', name: 'Slate Moderno', color: '#475569', class: 'bg-[#475569]' },
                                ].map((palette) => (
                                    <button
                                        key={palette.id}
                                        type="button"
                                        onClick={() => setData('primary_color', palette.id)}
                                        className={`group relative flex flex-col items-center gap-3 rounded-[1.5rem] border-2 p-4 transition ${
                                            data.primary_color === palette.id
                                                ? 'border-gold-500 bg-gold-50/50 dark:border-gold-500 dark:bg-gold-500/10'
                                                : 'border-slate-100 hover:border-slate-200 dark:border-slate-800'
                                        }`}
                                    >
                                        <div className={`h-12 w-12 rounded-full shadow-inner ${palette.class}`} />
                                        <span className={`text-xs font-bold uppercase tracking-wider ${
                                            data.primary_color === palette.id ? 'text-gold-700 dark:text-gold-400' : 'text-slate-500'
                                        }`}>
                                            {palette.name}
                                        </span>
                                        {data.primary_color === palette.id && (
                                            <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg">
                                                <Save className="h-3 w-3" />
                                            </div>
                                        )}
                                    </button>
                                ))}

                                {/* Custom Color Picker */}
                                <div className={`group relative flex flex-col items-center gap-3 rounded-[1.5rem] border-2 p-4 transition ${
                                    data.primary_color.startsWith('#')
                                        ? 'border-gold-500 bg-gold-50/50 dark:border-gold-500 dark:bg-gold-500/10'
                                        : 'border-slate-100 hover:border-slate-200 dark:border-slate-800'
                                }`}>
                                    <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-inner border border-slate-200 dark:border-white/10">
                                        <input
                                            type="color"
                                            value={data.primary_color.startsWith('#') ? data.primary_color : '#d99712'}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            className="absolute inset-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${
                                        data.primary_color.startsWith('#') ? 'text-gold-700 dark:text-gold-400' : 'text-slate-500'
                                    }`}>
                                        Personalizada
                                    </span>
                                    {data.primary_color.startsWith('#') && (
                                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg">
                                            <Save className="h-3 w-3" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 italic">
                                * A alteração da paleta afetará botões, links, badges e elementos de destaque em todo o site.
                            </p>
                        </div>

                        {/* Hero Fallback Section */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                    <Layout className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Hero Fallback (Design Atual)</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Título de Impacto</label>
                                    <input
                                        type="text"
                                        value={data.hero_title}
                                        onChange={e => setData('hero_title', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.hero_title && <p className="mt-1 text-xs text-red-500">{errors.hero_title}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subtítulo / Descrição</label>
                                    <textarea
                                        value={data.hero_subtitle}
                                        onChange={e => setData('hero_subtitle', e.target.value)}
                                        rows={3}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.hero_subtitle && <p className="mt-1 text-xs text-red-500">{errors.hero_subtitle}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Texto CTA Principal</label>
                                    <input
                                        type="text"
                                        value={data.hero_cta_text}
                                        onChange={e => setData('hero_cta_text', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.hero_cta_text && <p className="mt-1 text-xs text-red-500">{errors.hero_cta_text}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL CTA Principal</label>
                                    <input
                                        type="text"
                                        value={data.hero_cta_url}
                                        onChange={e => setData('hero_cta_url', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.hero_cta_url && <p className="mt-1 text-xs text-red-500">{errors.hero_cta_url}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Texto CTA Secundário</label>
                                    <input
                                        type="text"
                                        value={data.hero_secondary_cta_text}
                                        onChange={e => setData('hero_secondary_cta_text', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.hero_secondary_cta_text && <p className="mt-1 text-xs text-red-500">{errors.hero_secondary_cta_text}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL CTA Secundário</label>
                                    <input
                                        type="text"
                                        value={data.hero_secondary_cta_url}
                                        onChange={e => setData('hero_secondary_cta_url', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.hero_secondary_cta_url && <p className="mt-1 text-xs text-red-500">{errors.hero_secondary_cta_url}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Feature Cards Section */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Cards de Destaque</h2>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="space-y-4 rounded-2xl border border-slate-100 p-6 dark:border-slate-800">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Card {index + 1}</span>
                                            <select
                                                value={feature.icon}
                                                onChange={e => updateFeature(index, 'icon', e.target.value)}
                                                className="text-xs rounded-lg border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                                            >
                                                <option value="Sparkles">Brilho</option>
                                                <option value="Heart">Coração</option>
                                                <option value="Truck">Caminhão</option>
                                                <option value="Info">Informação</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Título</label>
                                            <input
                                                type="text"
                                                value={feature.title}
                                                onChange={e => updateFeature(index, 'title', e.target.value)}
                                                className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 text-sm focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Subtítulo</label>
                                            <textarea
                                                value={feature.subtitle}
                                                onChange={e => updateFeature(index, 'subtitle', e.target.value)}
                                                rows={2}
                                                className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 text-sm focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Footer Settings Section 1: Brand & Social */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                    <Share2 className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Informações da Marca & Redes Sociais</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome da Marca</label>
                                    <input
                                        type="text"
                                        value={data.footer.brand_name}
                                        onChange={e => handleFooterChange('brand_name', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                        required
                                    />
                                    {errors['footer.brand_name'] && <p className="mt-1 text-xs text-red-500">{errors['footer.brand_name']}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Descrição institucional no rodapé</label>
                                    <textarea
                                        value={data.footer.brand_description}
                                        onChange={e => handleFooterChange('brand_description', e.target.value)}
                                        rows={3}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                        required
                                    />
                                    {errors['footer.brand_description'] && <p className="mt-1 text-xs text-red-500">{errors['footer.brand_description']}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Link do Instagram</label>
                                    <input
                                        type="text"
                                        value={data.footer.social_instagram || ''}
                                        placeholder="Ex: https://instagram.com/miustore"
                                        onChange={e => handleFooterChange('social_instagram', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.social_instagram'] && <p className="mt-1 text-xs text-red-500">{errors['footer.social_instagram']}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Link do Facebook</label>
                                    <input
                                        type="text"
                                        value={data.footer.social_facebook || ''}
                                        placeholder="Ex: https://facebook.com/miustore"
                                        onChange={e => handleFooterChange('social_facebook', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.social_facebook'] && <p className="mt-1 text-xs text-red-500">{errors['footer.social_facebook']}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Link do Twitter / X</label>
                                    <input
                                        type="text"
                                        value={data.footer.social_twitter || ''}
                                        placeholder="Ex: https://x.com/miustore"
                                        onChange={e => handleFooterChange('social_twitter', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.social_twitter'] && <p className="mt-1 text-xs text-red-500">{errors['footer.social_twitter']}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Footer Settings Section 2: Contact Details */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Atendimento / Contatos</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Telefone</label>
                                    <input
                                        type="text"
                                        value={data.footer.contact_phone || ''}
                                        placeholder="Ex: (11) 99999-9999"
                                        onChange={e => handleFooterChange('contact_phone', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.contact_phone'] && <p className="mt-1 text-xs text-red-500">{errors['footer.contact_phone']}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Horário de Funcionamento</label>
                                    <input
                                        type="text"
                                        value={data.footer.contact_hours || ''}
                                        placeholder="Ex: Seg. a Sex. das 09h às 18h"
                                        onChange={e => handleFooterChange('contact_hours', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.contact_hours'] && <p className="mt-1 text-xs text-red-500">{errors['footer.contact_hours']}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">E-mail de Atendimento</label>
                                    <input
                                        type="email"
                                        value={data.footer.contact_email || ''}
                                        placeholder="Ex: contato@miustore.com.br"
                                        onChange={e => handleFooterChange('contact_email', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.contact_email'] && <p className="mt-1 text-xs text-red-500">{errors['footer.contact_email']}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Endereço Completo</label>
                                    <textarea
                                        value={data.footer.contact_address || ''}
                                        placeholder="Ex: Rua das Joias, 123 - Jardins&#10;São Paulo, SP"
                                        onChange={e => handleFooterChange('contact_address', e.target.value)}
                                        rows={3}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.contact_address'] && <p className="mt-1 text-xs text-red-500">{errors['footer.contact_address']}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Footer Settings Section 3: Link Columns */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                    <Layout className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Colunas de Links</h2>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                {data.footer.columns.map((column, colIdx) => (
                                    <div key={colIdx} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-6">
                                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Coluna {colIdx + 1}</h3>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Título da Coluna</label>
                                            <input
                                                type="text"
                                                value={column.title}
                                                onChange={e => handleFooterColumnTitleChange(colIdx, e.target.value)}
                                                className="block w-full rounded-xl border-slate-200 bg-white focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950"
                                                required
                                            />
                                            {errors[`footer.columns.${colIdx}.title`] && (
                                                <p className="mt-1 text-xs text-red-500">{errors[`footer.columns.${colIdx}.title`]}</p>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">Links da Coluna</label>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddLink(colIdx)}
                                                    className="flex items-center gap-1 text-[11px] font-bold text-gold-600 hover:text-gold-500 transition"
                                                >
                                                    <Plus className="h-3.5 w-3.5" /> Adicionar
                                                </button>
                                            </div>

                                            {(!column.links || column.links.length === 0) ? (
                                                <p className="text-xs italic text-slate-400">Nenhum link adicionado.</p>
                                            ) : (
                                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                                                    {column.links.map((link, linkIdx) => (
                                                        <div key={linkIdx} className="flex gap-2 items-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
                                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Nome"
                                                                    value={link.name}
                                                                    onChange={e => handleLinkChange(colIdx, linkIdx, 'name', e.target.value)}
                                                                    className="text-xs rounded-lg border-slate-200 focus:ring-gold-500 focus:border-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                                                    required
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="URL (Ex: /produtos)"
                                                                    value={link.href}
                                                                    onChange={e => handleLinkChange(colIdx, linkIdx, 'href', e.target.value)}
                                                                    className="text-xs rounded-lg border-slate-200 focus:ring-gold-500 focus:border-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                                                    required
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveLink(colIdx, linkIdx)}
                                                                className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Settings Section 4: Final Options & Badges */}
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Badges de Confiança & Rodapé Inferior</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Selos / Ícones de Rodapé Ativos</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {[
                                            { id: 'credit_card', label: 'Cartões de Crédito', icon: CreditCard },
                                            { id: 'shield', label: 'Compra Segura', icon: ShieldCheck },
                                            { id: 'truck', label: 'Entrega Rápida', icon: Truck },
                                        ].map((badge) => {
                                            const isActive = data.footer.payment_methods?.includes(badge.id);
                                            const Icon = badge.icon;
                                            return (
                                                <button
                                                    key={badge.id}
                                                    type="button"
                                                    onClick={() => togglePaymentMethod(badge.id)}
                                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition text-left ${
                                                        isActive 
                                                            ? 'border-gold-500 bg-gold-50/50 dark:bg-gold-500/10 text-gold-700 dark:text-gold-400' 
                                                            : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                                                    }`}
                                                >
                                                    <Icon className={`h-5 w-5 ${isActive ? 'text-gold-500' : 'text-slate-400'}`} />
                                                    <span className="text-xs font-bold uppercase tracking-wider">{badge.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">CNPJ / Informações Adicionais de Direitos Autorais</label>
                                    <input
                                        type="text"
                                        value={data.footer.cnpj || ''}
                                        placeholder="Ex: CNPJ: 00.000.000/0001-00"
                                        onChange={e => handleFooterChange('cnpj', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors['footer.cnpj'] && <p className="mt-1 text-xs text-red-500">{errors['footer.cnpj']}</p>}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-full bg-gold-500 px-12 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Salvando...' : 'Salvar Todas as Configurações'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
