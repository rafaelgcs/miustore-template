import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-gold-500 bg-gold-50 text-gold-700 focus:border-gold-700 focus:bg-gold-100 focus:text-gold-800 dark:border-gold-500 dark:bg-gold-900/20 dark:text-gold-400 dark:focus:border-gold-400 dark:focus:bg-gold-900/40 dark:focus:text-gold-300'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 focus:border-slate-300 focus:bg-slate-50 focus:text-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus:border-slate-600 dark:focus:bg-slate-800 dark:focus:text-slate-200'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
