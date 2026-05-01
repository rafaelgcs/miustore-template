import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-slate-100">
            <nav className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20">
                                R
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                                    Admin
                                </p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    Miu Store
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </NavLink>
                        <ThemeToggle />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-gold-300 hover:bg-gold-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-gold-500/50 dark:hover:bg-gold-500/10"
                                    >
                                        {user.name}

                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={route('profile.edit')}
                                >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <div className="-me-2 flex items-center md:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition duration-150 ease-in-out hover:bg-gold-50 hover:text-gold-700 focus:bg-gold-50 focus:text-gold-700 focus:outline-none dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100 dark:focus:bg-white/10"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' md:hidden'
                    }
                >
                    <div className="space-y-1 border-t border-slate-200/80 bg-white/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/95">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('profile.edit')}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/95">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-transparent">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
