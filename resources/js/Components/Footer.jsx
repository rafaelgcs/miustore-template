import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Mail, 
    Phone, 
    MapPin, 
    CreditCard, 
    ShieldCheck, 
    Truck
} from 'lucide-react';

export default function Footer() {
    const { footer_settings } = usePage().props;
    
    // Safety fallback
    const footer = footer_settings || {};
    const brandName = footer.brand_name || 'Miu Store';
    const brandLetter = brandName.charAt(0).toUpperCase();

    return (
        <footer className="bg-slate-50 dark:bg-neutral-900 border-t border-slate-200 dark:border-white/5 pt-20 pb-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-500 text-neutral-950 font-black text-xl">
                                {brandLetter}
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">{brandName}</span>
                        </Link>
                        {footer.brand_description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                {footer.brand_description}
                            </p>
                        )}
                        <div className="flex items-center gap-4">
                            {footer.social_instagram && footer.social_instagram !== '#' && (
                                <a href={footer.social_instagram} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-gold-500 hover:text-white transition-all">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                            )}
                            {footer.social_facebook && footer.social_facebook !== '#' && (
                                <a href={footer.social_facebook} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-gold-500 hover:text-white transition-all">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                            )}
                            {footer.social_twitter && footer.social_twitter !== '#' && (
                                <a href={footer.social_twitter} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-gold-500 hover:text-white transition-all">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links Column 1 */}
                    {footer.columns && footer.columns[0] && (
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-8">
                                {footer.columns[0].title}
                            </h4>
                            <ul className="space-y-4">
                                {footer.columns[0].links?.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Institutional Column 2 */}
                    {footer.columns && footer.columns[1] && (
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-8">
                                {footer.columns[1].title}
                            </h4>
                            <ul className="space-y-4">
                                {footer.columns[1].links?.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-8">Atendimento</h4>
                        <ul className="space-y-6">
                            {footer.contact_phone && (
                                <li className="flex items-start gap-4">
                                    <Phone className="h-5 w-5 text-gold-500 shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{footer.contact_phone}</p>
                                        {footer.contact_hours && (
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{footer.contact_hours}</p>
                                        )}
                                    </div>
                                </li>
                            )}
                            {footer.contact_email && (
                                <li className="flex items-start gap-4">
                                    <Mail className="h-5 w-5 text-gold-500 shrink-0" />
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{footer.contact_email}</p>
                                </li>
                            )}
                            {footer.contact_address && (
                                <li className="flex items-start gap-4">
                                    <MapPin className="h-5 w-5 text-gold-500 shrink-0" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400 whitespace-pre-line">{footer.contact_address}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-wrap justify-center gap-6">
                        {footer.payment_methods?.includes('credit_card') && <CreditCard className="h-6 w-6 text-slate-400" />}
                        {footer.payment_methods?.includes('shield') && <ShieldCheck className="h-6 w-6 text-slate-400" />}
                        {footer.payment_methods?.includes('truck') && <Truck className="h-6 w-6 text-slate-400" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-right">
                        © {new Date().getFullYear()} {brandName}. Todos os direitos reservados. {footer.cnpj}
                    </p>
                </div>
            </div>
        </footer>
    );
}
