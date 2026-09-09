import { useCallback, useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme';

/**
 * One shared subscription to <html>'s class list.
 *
 * This used to hold the theme in useState, which gives every caller its own
 * private copy: clicking the toggle in Header updated Header's copy and
 * flipped the class, but SectionProfile's copy never changed, so it never
 * re-rendered and its canvas kept the colours it had read on mount. Anything
 * styled by CSS variables switched correctly; anything that reads the
 * variables in JS did not.
 *
 * The class on <html> is the single source of truth, so consumers subscribe to
 * it directly. A MutationObserver also fires *after* the attribute lands,
 * which matters for callers that resolve CSS custom properties with
 * getComputedStyle -- a useEffect-driven version would hand them the previous
 * theme's values for one render.
 */
const subscribe = (onStoreChange) => {
    const observer = new MutationObserver(onStoreChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
    });
    return () => observer.disconnect();
};

const getSnapshot = () =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light';

// No DOM during SSR; the inline script in index.html settles the real value
// before React mounts on the client.
const getServerSnapshot = () => 'dark';

const applyTheme = (next) => {
    document.documentElement.classList.toggle('dark', next === 'dark');
};

export const useTheme = () => {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const onChange = (event) => {
            // Only follow the OS while the visitor has not chosen for themselves.
            if (localStorage.getItem(STORAGE_KEY)) return;
            applyTheme(event.matches ? 'dark' : 'light');
        };

        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const toggleTheme = useCallback(() => {
        const next = getSnapshot() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {
            // Private mode or blocked storage: the theme still applies for
            // this page view, it just will not be remembered.
        }
    }, []);

    return { theme, isDark: theme === 'dark', toggleTheme };
};
