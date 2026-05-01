import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-gold-500 text-slate-900 focus:border-gold-700 dark:border-gold-500 dark:text-slate-100'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 focus:border-slate-300 focus:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-300 dark:focus:border-slate-700 dark:focus:text-slate-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
