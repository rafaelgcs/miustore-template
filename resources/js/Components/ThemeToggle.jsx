import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-gold-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold-300 dark:border-slate-700 dark:bg-slate-900/70"
            aria-label={`Ativar tema ${nextTheme}`}
            title={`Ativar tema ${nextTheme}`}
        >
            {theme === 'dark' ? (
                <SunMedium className="h-5 w-5 text-gold-200" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700" />
            )}
        </button>
    );
}
