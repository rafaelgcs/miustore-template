import { Head, usePage } from '@inertiajs/react';

export default function SeoHead() {
    const { seo = {}, url } = usePage().props;

    const title = seo.site_title || import.meta.env.VITE_APP_NAME || 'Miu Store';
    const description = seo.meta_description || 'Loja online de joias e bem-estar com peças artesanais, atendimento personalizado e entrega rápida.';
    const keywords = seo.meta_keywords || 'joias, alianças, brincos, colares, anéis, joias artisanais, ouro 18k, presente de luxo';
    const image = seo.meta_image || null;
    const canonicalUrl = seo.canonical_url || url || (typeof window !== 'undefined' ? window.location.href : null);
    const analyticsId = seo.google_analytics_id;
    const tagManagerId = seo.google_tag_manager_id;
    const adsenseClient = seo.google_adsense_client;
    const verification = seo.google_site_verification;
    const robots = seo.robots || 'index, follow';

    // Business/Local SEO data
    const businessData = {
        name: seo.business_name || title,
        description: seo.business_description || description,
        email: seo.business_email,
        telephone: seo.business_phone,
        address: seo.business_address ? {
            streetAddress: seo.business_address,
            addressLocality: seo.business_city,
            addressRegion: seo.business_state,
            postalCode: seo.business_zip,
            addressCountry: seo.business_country || 'BR',
        } : undefined,
        geo: seo.latitude && seo.longitude ? {
            latitude: seo.latitude,
            longitude: seo.longitude,
        } : undefined,
        openingHours: seo.opening_hours,
    };

    // Schema.org structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'url': canonicalUrl,
        'name': title,
        'description': description,
        'publisher': {
            '@type': 'Organization',
            'name': businessData.name,
            'description': businessData.description,
            ...(businessData.email && { 'email': businessData.email }),
            ...(businessData.telephone && { 'telephone': businessData.telephone }),
            ...(businessData.address && { 'address': businessData.address }),
            ...(businessData.geo && { 'geo': businessData.geo }),
            ...(businessData.openingHours && { 'openingHours': businessData.openingHours }),
        },
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={robots} />
            {verification ? <meta name="google-site-verification" content={verification} /> : null}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image ? <meta property="og:image" content={image} /> : null}
            <meta property="og:url" content={canonicalUrl} />
            {seo.facebook_app_id ? <meta property="fb:app_id" content={seo.facebook_app_id} /> : null}

            {/* Twitter Cards */}
            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image ? <meta name="twitter:image" content={image} /> : null}
            {seo.twitter_site ? <meta name="twitter:site" content={seo.twitter_site} /> : null}

            {/* Canonical URL */}
            {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

            {/* Schema.org JSON-LD */}
            {seo.enable_schema_markup !== false ? (
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            ) : null}

            {/* Google Analytics */}
            {analyticsId ? (
                <>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} />
                    <script>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analyticsId}');`}</script>
                </>
            ) : null}

            {/* Google Tag Manager */}
            {tagManagerId ? (
                <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tagManagerId}');`}</script>
            ) : null}

            {/* Google AdSense */}
            {adsenseClient ? (
                <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" />
            ) : null}

            {/* Security Headers */}
            {seo.enable_hsts ? <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" /> : null}
            {seo.enable_csp && seo.csp_policy ? <meta httpEquiv="Content-Security-Policy" content={seo.csp_policy} /> : null}
        </Head>
    );
}
