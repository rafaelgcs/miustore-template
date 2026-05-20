import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    const renderLabel = (label) => {
        if (label.includes('Previous') || label.includes('laquo') || label.includes('«')) {
            return <ChevronLeft className="h-4 w-4" />;
        }
        if (label.includes('Next') || label.includes('raquo') || label.includes('»')) {
            return <ChevronRight className="h-4 w-4" />;
        }
        return label;
    };

    return (
        <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/50 p-2 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-sm">
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 font-bold text-sm ${
                                    link.active
                                        ? 'bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 scale-110'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                {renderLabel(link.label)}
                            </Link>
                        ) : (
                            <span
                                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 dark:text-slate-600 font-bold text-sm cursor-not-allowed"
                            >
                                {renderLabel(link.label)}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
