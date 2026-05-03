import { createContext, useContext, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
});

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function mix(color1, color2, weight) {
    return {
        r: Math.round(color1.r * weight + color2.r * (1 - weight)),
        g: Math.round(color1.g * weight + color2.g * (1 - weight)),
        b: Math.round(color1.b * weight + color2.b * (1 - weight))
    };
}

export function ThemeProvider({ children }) {
    const { props } = usePage();
    const primaryColor = props.primaryColor || 'gold';
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        setTheme(storedTheme ?? 'light');
    }, []);

    useEffect(() => {
        if (!theme) return;

        const doc = document.documentElement;
        doc.classList.toggle('dark', theme === 'dark');
        
        const themeClasses = ['theme-gold', 'theme-rose', 'theme-emerald', 'theme-blue', 'theme-slate'];
        doc.classList.remove(...themeClasses);

        if (primaryColor.startsWith('#')) {
            const rgb = hexToRgb(primaryColor);
            if (rgb) {
                const white = { r: 255, g: 255, b: 255 };
                const black = { r: 0, g: 0, b: 0 };
                
                const shades = {
                    50: mix(rgb, white, 0.1),
                    100: mix(rgb, white, 0.2),
                    200: mix(rgb, white, 0.4),
                    300: mix(rgb, white, 0.6),
                    400: mix(rgb, white, 0.8),
                    500: rgb,
                    600: mix(rgb, black, 0.9),
                    700: mix(rgb, black, 0.75),
                    800: mix(rgb, black, 0.6),
                    900: mix(rgb, black, 0.45),
                };

                Object.entries(shades).forEach(([shade, color]) => {
                    doc.style.setProperty(`--primary-${shade}`, `${color.r} ${color.g} ${color.b}`);
                });
            }
        } else {
            // Remove custom style properties if switching back to preset
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach(shade => {
                doc.style.removeProperty(`--primary-${shade}`);
            });
            if (primaryColor !== 'gold') {
                doc.classList.add(`theme-${primaryColor}`);
            }
        }

        localStorage.setItem('theme', theme);
    }, [theme, primaryColor]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeProvider;
