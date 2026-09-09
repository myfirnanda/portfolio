import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useTheme } from './useTheme';

// Two independent components, exactly like Header and SectionProfile: one owns
// the toggle, the other only reads. The bug this guards against is useTheme
// holding per-instance useState, where the reader never learns the theme
// changed and anything it derives in JS (the hero canvas colours) goes stale.
const Toggler = () => {
    const { toggleTheme } = useTheme();
    return <button onClick={toggleTheme}>toggle</button>;
};

const Reader = () => {
    const { isDark } = useTheme();
    return <span data-testid="reader">{isDark ? 'dark' : 'light'}</span>;
};

describe('useTheme', () => {
    // jsdom ships no matchMedia; the hook only uses it to follow the OS while
    // the visitor has made no explicit choice, which these tests do not cover.
    beforeAll(() => {
        window.matchMedia = () => ({
            matches: false,
            addEventListener: () => {},
            removeEventListener: () => {},
        });
    });

    beforeEach(() => {
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    // MutationObserver delivers its callback as a microtask, so these await an
    // async act to let the subscription land before asserting.
    test('a reader elsewhere in the tree sees a toggle made by another component', async () => {
        document.documentElement.classList.add('dark');

        render(
            <>
                <Toggler />
                <Reader />
            </>
        );

        expect(screen.getByTestId('reader')).toHaveTextContent('dark');

        await act(async () => {
            screen.getByText('toggle').click();
        });

        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(screen.getByTestId('reader')).toHaveTextContent('light');

        await act(async () => {
            screen.getByText('toggle').click();
        });

        expect(screen.getByTestId('reader')).toHaveTextContent('dark');
    });

    test('an external change to the html class propagates to every consumer', async () => {
        render(<Reader />);
        expect(screen.getByTestId('reader')).toHaveTextContent('light');

        await act(async () => {
            document.documentElement.classList.add('dark');
        });

        expect(screen.getByTestId('reader')).toHaveTextContent('dark');
    });

    test('the toggle records the explicit choice so the OS stops leading', () => {
        render(<Toggler />);

        act(() => {
            screen.getByText('toggle').click();
        });

        expect(localStorage.getItem('theme')).toBe('dark');
    });
});
