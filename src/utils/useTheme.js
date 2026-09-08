import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

const readTheme = () => {
    // The inline script in public/index.html has already resolved the theme and
    // stamped <html> before React mounts, so trusting that class here keeps the
    // two in sync and avoids a second, conflicting decision.
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

/**
 * Reads and controls the site theme. State lives on <html>'s class list, which
 * is what the CSS variables key off; localStorage only records an explicit
 * choice so the OS preference can still lead when the visitor never picked one.
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(readTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const onChange = (event) => {
            // Only follow the OS while the visitor has not chosen for themselves.
            if (localStorage.getItem(STORAGE_KEY)) return;
            setTheme(event.matches ? 'dark' : 'light');
        };

        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => {
            const next = current === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) {
                // Private mode or blocked storage: the theme still applies for
                // this page view, it just will not be remembered.
            }
            return next;
        });
    }, []);

    return { theme, isDark: theme === 'dark', toggleTheme };
};
