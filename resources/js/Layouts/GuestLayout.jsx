import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 pt-6 sm:pt-0 dark:bg-neutral-950">
            {/* Background embellishments */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gold-500/5 opacity-50 blur-3xl dark:bg-gold-500/10" />
            </div>

            <div className="absolute right-4 top-4 sm:right-8 sm:top-8 z-50">
                <ThemeToggle />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center justify-center mb-8">
                    <Link href="/">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 text-3xl font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:scale-105">
                            R
                        </div>
                    </Link>
                    <h1 className="mt-6 text-2xl font-semibold tracking-wide text-slate-900 dark:text-white">
                        Joias & Bem-estar
                    </h1>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-black/40">
                    {children}
                </div>
            </div>
        </div>
    );
}
