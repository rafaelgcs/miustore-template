import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SeoSettings({ seoSetting }) {
    const form = useForm({
        // Basic SEO
        site_title: seoSetting?.site_title ?? '',
        meta_description: seoSetting?.meta_description ?? '',
        meta_keywords: seoSetting?.meta_keywords ?? '',
        meta_image: seoSetting?.meta_image ?? '',
        canonical_url: seoSetting?.canonical_url ?? '',
        robots: seoSetting?.robots ?? 'index, follow',

        // Google Services
        google_site_verification: seoSetting?.google_site_verification ?? '',
        google_analytics_id: seoSetting?.google_analytics_id ?? '',
        google_tag_manager_id: seoSetting?.google_tag_manager_id ?? '',
        google_adsense_client: seoSetting?.google_adsense_client ?? '',

        // Social Media
        facebook_app_id: seoSetting?.facebook_app_id ?? '',
        twitter_site: seoSetting?.twitter_site ?? '',
        instagram_url: seoSetting?.instagram_url ?? '',
        facebook_url: seoSetting?.facebook_url ?? '',
        linkedin_url: seoSetting?.linkedin_url ?? '',
        youtube_url: seoSetting?.youtube_url ?? '',
        whatsapp_number: seoSetting?.whatsapp_number ?? '',

        // Business Information
        business_name: seoSetting?.business_name ?? '',
        business_description: seoSetting?.business_description ?? '',
        business_email: seoSetting?.business_email ?? '',
        business_phone: seoSetting?.business_phone ?? '',
        business_address: seoSetting?.business_address ?? '',
        business_city: seoSetting?.business_city ?? '',
        business_state: seoSetting?.business_state ?? '',
        business_zip: seoSetting?.business_zip ?? '',
        business_country: seoSetting?.business_country ?? 'BR',

        // Local SEO
        latitude: seoSetting?.latitude ?? '',
        longitude: seoSetting?.longitude ?? '',
        opening_hours: seoSetting?.opening_hours ?? {},

        // Technical SEO
        enable_sitemap: seoSetting?.enable_sitemap ?? true,
        enable_robots_txt: seoSetting?.enable_robots_txt ?? true,
        custom_robots_txt: seoSetting?.custom_robots_txt ?? '',
        enable_schema_markup: seoSetting?.enable_schema_markup ?? true,

        // Performance & Security
        enable_hsts: seoSetting?.enable_hsts ?? false,
        enable_csp: seoSetting?.enable_csp ?? false,
        csp_policy: seoSetting?.csp_policy ?? '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(route('admin.seo.update'));
    };

    const daysOfWeek = [
        { key: 'monday', label: 'Segunda-feira' },
        { key: 'tuesday', label: 'Terça-feira' },
        { key: 'wednesday', label: 'Quarta-feira' },
        { key: 'thursday', label: 'Quinta-feira' },
        { key: 'friday', label: 'Sexta-feira' },
        { key: 'saturday', label: 'Sábado' },
        { key: 'sunday', label: 'Domingo' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">Configurações de SEO</h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Otimize seu site para os motores de busca e melhore seu ranking.
                        </p>
                    </div>
                    <Link
                        href={route('admin.dashboard')}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-gold-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                        Voltar ao painel
                    </Link>
                </div>
            }
        >
            <Head title="SEO" />

            <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-8">
                    {/* SEO Básico */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">SEO Básico</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Título do Site</span>
                                <input
                                    type="text"
                                    value={form.site_title}
                                    onChange={(event) => form.setData('site_title', event.target.value)}
                                    placeholder="Miu Store - Joias Artesanais"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Robots</span>
                                <input
                                    type="text"
                                    value={form.robots}
                                    onChange={(event) => form.setData('robots', event.target.value)}
                                    placeholder="index, follow"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>

                        <div className="mt-6">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Meta Description</span>
                                <textarea
                                    value={form.meta_description}
                                    onChange={(event) => form.setData('meta_description', event.target.value)}
                                    rows={3}
                                    placeholder="Descrição resumida do site para buscadores (150-160 caracteres)"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>

                        <div className="mt-6">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Meta Keywords</span>
                                <input
                                    type="text"
                                    value={form.meta_keywords}
                                    onChange={(event) => form.setData('meta_keywords', event.target.value)}
                                    placeholder="joias, alianças, colares, ouro, artesanal, presente"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Imagem de Preview (Open Graph)</span>
                                <input
                                    type="url"
                                    value={form.meta_image}
                                    onChange={(event) => form.setData('meta_image', event.target.value)}
                                    placeholder="https://example.com/preview.jpg"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">URL Canônica</span>
                                <input
                                    type="url"
                                    value={form.canonical_url}
                                    onChange={(event) => form.setData('canonical_url', event.target.value)}
                                    placeholder="https://miustore.com"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Google Services */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">Google Services</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Google Site Verification</span>
                                <input
                                    type="text"
                                    value={form.google_site_verification}
                                    onChange={(event) => form.setData('google_site_verification', event.target.value)}
                                    placeholder="código-google-site-verification"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Google Analytics ID</span>
                                <input
                                    type="text"
                                    value={form.google_analytics_id}
                                    onChange={(event) => form.setData('google_analytics_id', event.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Google Tag Manager ID</span>
                                <input
                                    type="text"
                                    value={form.google_tag_manager_id}
                                    onChange={(event) => form.setData('google_tag_manager_id', event.target.value)}
                                    placeholder="GTM-XXXXXXX"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Google AdSense Client</span>
                                <input
                                    type="text"
                                    value={form.google_adsense_client}
                                    onChange={(event) => form.setData('google_adsense_client', event.target.value)}
                                    placeholder="ca-pub-XXXXXXXXXXXX"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Redes Sociais */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">Redes Sociais</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Facebook App ID</span>
                                <input
                                    type="text"
                                    value={form.facebook_app_id}
                                    onChange={(event) => form.setData('facebook_app_id', event.target.value)}
                                    placeholder="123456789012345"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Twitter Site</span>
                                <input
                                    type="text"
                                    value={form.twitter_site}
                                    onChange={(event) => form.setData('twitter_site', event.target.value)}
                                    placeholder="@miustore"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Instagram URL</span>
                                <input
                                    type="url"
                                    value={form.instagram_url}
                                    onChange={(event) => form.setData('instagram_url', event.target.value)}
                                    placeholder="https://instagram.com/miustore"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Facebook URL</span>
                                <input
                                    type="url"
                                    value={form.facebook_url}
                                    onChange={(event) => form.setData('facebook_url', event.target.value)}
                                    placeholder="https://facebook.com/miustore"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">LinkedIn URL</span>
                                <input
                                    type="url"
                                    value={form.linkedin_url}
                                    onChange={(event) => form.setData('linkedin_url', event.target.value)}
                                    placeholder="https://linkedin.com/company/miustore"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">YouTube URL</span>
                                <input
                                    type="url"
                                    value={form.youtube_url}
                                    onChange={(event) => form.setData('youtube_url', event.target.value)}
                                    placeholder="https://youtube.com/@miustore"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block lg:col-span-2">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">WhatsApp Number</span>
                                <input
                                    type="tel"
                                    value={form.whatsapp_number}
                                    onChange={(event) => form.setData('whatsapp_number', event.target.value)}
                                    placeholder="+55 11 99999-9999"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Informações da Empresa */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">Informações da Empresa</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Nome da Empresa</span>
                                <input
                                    type="text"
                                    value={form.business_name}
                                    onChange={(event) => form.setData('business_name', event.target.value)}
                                    placeholder="Miu Store Ltda"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email</span>
                                <input
                                    type="email"
                                    value={form.business_email}
                                    onChange={(event) => form.setData('business_email', event.target.value)}
                                    placeholder="contato@miustore.com"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Telefone</span>
                                <input
                                    type="tel"
                                    value={form.business_phone}
                                    onChange={(event) => form.setData('business_phone', event.target.value)}
                                    placeholder="+55 11 99999-9999"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">País</span>
                                <input
                                    type="text"
                                    value={form.business_country}
                                    onChange={(event) => form.setData('business_country', event.target.value)}
                                    placeholder="BR"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>

                        <div className="mt-6">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Descrição da Empresa</span>
                                <textarea
                                    value={form.business_description}
                                    onChange={(event) => form.setData('business_description', event.target.value)}
                                    rows={3}
                                    placeholder="Descrição detalhada da empresa para Schema.org"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Endereço</span>
                                <input
                                    type="text"
                                    value={form.business_address}
                                    onChange={(event) => form.setData('business_address', event.target.value)}
                                    placeholder="Rua das Joias, 123"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Cidade</span>
                                <input
                                    type="text"
                                    value={form.business_city}
                                    onChange={(event) => form.setData('business_city', event.target.value)}
                                    placeholder="São Paulo"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Estado</span>
                                <input
                                    type="text"
                                    value={form.business_state}
                                    onChange={(event) => form.setData('business_state', event.target.value)}
                                    placeholder="SP"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">CEP</span>
                                <input
                                    type="text"
                                    value={form.business_zip}
                                    onChange={(event) => form.setData('business_zip', event.target.value)}
                                    placeholder="01234-567"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>
                    </div>

                    {/* SEO Local */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">SEO Local</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Latitude</span>
                                <input
                                    type="number"
                                    step="any"
                                    value={form.latitude}
                                    onChange={(event) => form.setData('latitude', event.target.value)}
                                    placeholder="-23.550520"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Longitude</span>
                                <input
                                    type="number"
                                    step="any"
                                    value={form.longitude}
                                    onChange={(event) => form.setData('longitude', event.target.value)}
                                    placeholder="-46.633308"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>

                        <div className="mt-6">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Horário de Funcionamento</span>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Configure os horários de funcionamento para SEO local</p>
                            {daysOfWeek.map((day) => (
                                <div key={day.key} className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                                    <span className="text-sm text-slate-700 dark:text-slate-300">{day.label}</span>
                                    <input
                                        type="time"
                                        value={form.opening_hours?.[day.key]?.open || ''}
                                        onChange={(event) => {
                                            const hours = { ...form.opening_hours };
                                            if (!hours[day.key]) hours[day.key] = {};
                                            hours[day.key].open = event.target.value;
                                            form.setData('opening_hours', hours);
                                        }}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                    />
                                    <input
                                        type="time"
                                        value={form.opening_hours?.[day.key]?.close || ''}
                                        onChange={(event) => {
                                            const hours = { ...form.opening_hours };
                                            if (!hours[day.key]) hours[day.key] = {};
                                            hours[day.key].close = event.target.value;
                                            form.setData('opening_hours', hours);
                                        }}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SEO Técnico */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">SEO Técnico</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={form.enable_sitemap}
                                    onChange={(event) => form.setData('enable_sitemap', event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-400"
                                />
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Habilitar Sitemap XML</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={form.enable_robots_txt}
                                    onChange={(event) => form.setData('enable_robots_txt', event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-400"
                                />
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Habilitar Robots.txt</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={form.enable_schema_markup}
                                    onChange={(event) => form.setData('enable_schema_markup', event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-400"
                                />
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Habilitar Schema.org Markup</span>
                            </label>
                        </div>

                        <div className="mt-6">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Robots.txt Personalizado</span>
                                <textarea
                                    value={form.custom_robots_txt}
                                    onChange={(event) => form.setData('custom_robots_txt', event.target.value)}
                                    rows={6}
                                    placeholder={`User-agent: *
Allow: /

Sitemap: https://miustore.com/sitemap.xml`}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Segurança e Performance */}
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
                        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">Segurança e Performance</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={form.enable_hsts}
                                    onChange={(event) => form.setData('enable_hsts', event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-400"
                                />
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Habilitar HSTS (HTTP Strict Transport Security)</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={form.enable_csp}
                                    onChange={(event) => form.setData('enable_csp', event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-400"
                                />
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Habilitar Content Security Policy</span>
                            </label>
                        </div>

                        {form.enable_csp && (
                            <div className="mt-6">
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Política CSP</span>
                                    <textarea
                                        value={form.csp_policy}
                                        onChange={(event) => form.setData('csp_policy', event.target.value)}
                                        rows={4}
                                        placeholder={`default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'`}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-400 disabled:opacity-60"
                        >
                            {form.processing ? 'Salvando...' : 'Salvar configurações'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
