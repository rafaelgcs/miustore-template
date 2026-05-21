import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Save, ArrowLeft } from 'lucide-react';

export default function SeoSettings({ seoSetting }) {
    const { data, setData, put, processing, errors } = useForm({
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
        put(route('admin.seo.update'));
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
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configurações de SEO</h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Otimize seu site para os motores de busca e melhore seu ranking.
                        </p>
                    </div>
                    <Link
                        href={route('admin.dashboard')}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-gold-400 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao painel
                    </Link>
                </div>
            }
        >
            <Head title="SEO" />

            <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-8">
                    {/* SEO Básico */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">SEO Básico</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Título do Site</span>
                                <input
                                    type="text"
                                    value={data.site_title}
                                    onChange={(event) => setData('site_title', event.target.value)}
                                    placeholder="Antonelli Acessórios"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Robots</span>
                                <input
                                    type="text"
                                    value={data.robots}
                                    onChange={(event) => setData('robots', event.target.value)}
                                    placeholder="index, follow"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Meta Description</span>
                            <textarea
                                value={data.meta_description}
                                onChange={(event) => setData('meta_description', event.target.value)}
                                rows={3}
                                placeholder="Descrição resumida do site para buscadores (150-160 caracteres)"
                                className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                            />
                        </div>

                        <div className="mt-6 space-y-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Meta Keywords</span>
                            <input
                                type="text"
                                value={data.meta_keywords}
                                onChange={(event) => setData('meta_keywords', event.target.value)}
                                placeholder="joias, alianças, colares, ouro, artesanal, presente"
                                className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                            />
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Imagem de Preview (Open Graph)</span>
                                <input
                                    type="url"
                                    value={data.meta_image}
                                    onChange={(event) => setData('meta_image', event.target.value)}
                                    placeholder="https://example.com/preview.jpg"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">URL Canônica</span>
                                <input
                                    type="url"
                                    value={data.canonical_url}
                                    onChange={(event) => setData('canonical_url', event.target.value)}
                                    placeholder="https://miustore.com"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Google Services */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Google Services</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Google Site Verification</span>
                                <input
                                    type="text"
                                    value={data.google_site_verification}
                                    onChange={(event) => setData('google_site_verification', event.target.value)}
                                    placeholder="código-google-site-verification"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Google Analytics ID</span>
                                <input
                                    type="text"
                                    value={data.google_analytics_id}
                                    onChange={(event) => setData('google_analytics_id', event.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Google Tag Manager ID</span>
                                <input
                                    type="text"
                                    value={data.google_tag_manager_id}
                                    onChange={(event) => setData('google_tag_manager_id', event.target.value)}
                                    placeholder="GTM-XXXXXXX"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Google AdSense Client</span>
                                <input
                                    type="text"
                                    value={data.google_adsense_client}
                                    onChange={(event) => setData('google_adsense_client', event.target.value)}
                                    placeholder="ca-pub-XXXXXXXXXXXX"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Redes Sociais */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Redes Sociais</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Facebook App ID</span>
                                <input
                                    type="text"
                                    value={data.facebook_app_id}
                                    onChange={(event) => setData('facebook_app_id', event.target.value)}
                                    placeholder="123456789012345"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Twitter Site</span>
                                <input
                                    type="text"
                                    value={data.twitter_site}
                                    onChange={(event) => setData('twitter_site', event.target.value)}
                                    placeholder="@miustore"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Instagram URL</span>
                                <input
                                    type="url"
                                    value={data.instagram_url}
                                    onChange={(event) => setData('instagram_url', event.target.value)}
                                    placeholder="https://instagram.com/miustore"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Facebook URL</span>
                                <input
                                    type="url"
                                    value={data.facebook_url}
                                    onChange={(event) => setData('facebook_url', event.target.value)}
                                    placeholder="https://facebook.com/miustore"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn URL</span>
                                <input
                                    type="url"
                                    value={data.linkedin_url}
                                    onChange={(event) => setData('linkedin_url', event.target.value)}
                                    placeholder="https://linkedin.com/company/miustore"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">YouTube URL</span>
                                <input
                                    type="url"
                                    value={data.youtube_url}
                                    onChange={(event) => setData('youtube_url', event.target.value)}
                                    placeholder="https://youtube.com/@miustore"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2 lg:col-span-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">WhatsApp Number</span>
                                <input
                                    type="tel"
                                    value={data.whatsapp_number}
                                    onChange={(event) => setData('whatsapp_number', event.target.value)}
                                    placeholder="+55 11 99999-9999"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Informações da Empresa */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Informações da Empresa</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Nome da Empresa</span>
                                <input
                                    type="text"
                                    value={data.business_name}
                                    onChange={(event) => setData('business_name', event.target.value)}
                                    placeholder="Antonelli Acessórios"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</span>
                                <input
                                    type="email"
                                    value={data.business_email}
                                    onChange={(event) => setData('business_email', event.target.value)}
                                    placeholder="contato@miustore.com"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Telefone</span>
                                <input
                                    type="tel"
                                    value={data.business_phone}
                                    onChange={(event) => setData('business_phone', event.target.value)}
                                    placeholder="+55 11 99999-9999"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">País</span>
                                <input
                                    type="text"
                                    value={data.business_country}
                                    onChange={(event) => setData('business_country', event.target.value)}
                                    placeholder="BR"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Descrição da Empresa</span>
                            <textarea
                                value={data.business_description}
                                onChange={(event) => setData('business_description', event.target.value)}
                                rows={3}
                                placeholder="Descrição detalhada da empresa para Schema.org"
                                className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                            />
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Endereço</span>
                                <input
                                    type="text"
                                    value={data.business_address}
                                    onChange={(event) => setData('business_address', event.target.value)}
                                    placeholder="Rua das Joias, 123"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Cidade</span>
                                <input
                                    type="text"
                                    value={data.business_city}
                                    onChange={(event) => setData('business_city', event.target.value)}
                                    placeholder="São Paulo"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Estado</span>
                                <input
                                    type="text"
                                    value={data.business_state}
                                    onChange={(event) => setData('business_state', event.target.value)}
                                    placeholder="SP"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">CEP</span>
                                <input
                                    type="text"
                                    value={data.business_zip}
                                    onChange={(event) => setData('business_zip', event.target.value)}
                                    placeholder="01234-567"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Local */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">SEO Local</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Latitude</span>
                                <input
                                    type="number"
                                    step="any"
                                    value={data.latitude}
                                    onChange={(event) => setData('latitude', event.target.value)}
                                    placeholder="-23.550520"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Longitude</span>
                                <input
                                    type="number"
                                    step="any"
                                    value={data.longitude}
                                    onChange={(event) => setData('longitude', event.target.value)}
                                    placeholder="-46.633308"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Horário de Funcionamento</span>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Configure os horários de funcionamento para SEO local</p>
                            {daysOfWeek.map((day) => (
                                <div key={day.key} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{day.label}</span>
                                    <input
                                        type="time"
                                        value={data.opening_hours?.[day.key]?.open || ''}
                                        onChange={(event) => {
                                            const hours = { ...data.opening_hours };
                                            if (!hours[day.key]) hours[day.key] = {};
                                            hours[day.key].open = event.target.value;
                                            setData('opening_hours', hours);
                                        }}
                                        className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                    />
                                    <input
                                        type="time"
                                        value={data.opening_hours?.[day.key]?.close || ''}
                                        onChange={(event) => {
                                            const hours = { ...data.opening_hours };
                                            if (!hours[day.key]) hours[day.key] = {};
                                            hours[day.key].close = event.target.value;
                                            setData('opening_hours', hours);
                                        }}
                                        className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SEO Técnico */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">SEO Técnico</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                <input
                                    type="checkbox"
                                    checked={data.enable_sitemap}
                                    onChange={(event) => setData('enable_sitemap', event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Habilitar Sitemap XML</span>
                            </label>
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                <input
                                    type="checkbox"
                                    checked={data.enable_robots_txt}
                                    onChange={(event) => setData('enable_robots_txt', event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Habilitar Robots.txt</span>
                            </label>
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                <input
                                    type="checkbox"
                                    checked={data.enable_schema_markup}
                                    onChange={(event) => setData('enable_schema_markup', event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Habilitar Schema.org Markup</span>
                            </label>
                        </div>

                        <div className="mt-6 space-y-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Robots.txt Personalizado</span>
                            <textarea
                                value={data.custom_robots_txt}
                                onChange={(event) => setData('custom_robots_txt', event.target.value)}
                                rows={6}
                                placeholder={`User-agent: *
Allow: /

Sitemap: https://miustore.com/sitemap.xml`}
                                className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Segurança e Performance */}
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Segurança e Performance</h2>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                <input
                                    type="checkbox"
                                    checked={data.enable_hsts}
                                    onChange={(event) => setData('enable_hsts', event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Habilitar HSTS (HTTP Strict Transport Security)</span>
                            </label>
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-white/5">
                                <input
                                    type="checkbox"
                                    checked={data.enable_csp}
                                    onChange={(event) => setData('enable_csp', event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Habilitar Content Security Policy</span>
                            </label>
                        </div>

                        {data.enable_csp && (
                            <div className="mt-6 space-y-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Política CSP</span>
                                <textarea
                                    value={data.csp_policy}
                                    onChange={(event) => setData('csp_policy', event.target.value)}
                                    rows={4}
                                    placeholder={`default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'`}
                                    className="w-full rounded-[2rem] border-slate-200 bg-slate-50/50 px-6 py-4 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end border-t border-slate-100 pt-8 dark:border-slate-800">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-10 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                        >
                            <Save className="h-5 w-5" />
                            {processing ? 'Salvando...' : 'Salvar Configurações'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
