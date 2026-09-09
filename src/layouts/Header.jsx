import { Link } from 'react-router-dom';
import { useTheme } from '../utils/useTheme';

// N9 - Edge-aligned minimal. The wordmark sits hard against the left edge and
// the controls against the right, under a single hairline instead of floating
// rounded chrome. The previous shape was N1a (wordmark + inline links +
// button-right), one of the most recognisable AI nav fingerprints.
const Header = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 border-b border-rule">
            <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link to="/" className="font-mono text-sm tracking-[0.08em] uppercase text-ink hover:text-accent transition-colors">
                    firnanda<span className="text-accent">.dev</span>
                </Link>

                <div className="flex items-center gap-5">
                    <span className="hidden sm:block font-mono text-xs tracking-[0.06em] uppercase text-ink-2">
                        Sidoarjo, ID
                    </span>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        aria-pressed={isDark}
                        className="w-8 h-8 flex items-center justify-center text-ink-2 hover:text-accent transition-colors"
                    >
                        <i className={`text-lg ${isDark ? 'ri-sun-line' : 'ri-moon-line'}`}></i>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header;
