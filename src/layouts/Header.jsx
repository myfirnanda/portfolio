import { Link } from 'react-router-dom';
import { useTheme } from '../utils/useTheme';

const Header = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/70 border-b border-line">
            <nav className="w-full py-4 sm:py-5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="title">
                        <Link to="/" className="text-lg sm:text-xl font-bold">
                            <i className="ri-terminal-box-fill text-xl sm:text-2xl text-accent"></i>
                            <span className="text-accent">Hmn!</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="live flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-fg">
                            <i className="ri-global-line text-xl sm:text-2xl text-accent"></i>
                            <p className="hidden sm:inline">Sidoarjo, Indonesia</p>
                            <p className="sm:hidden">Sidoarjo</p>
                        </div>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-pressed={isDark}
                            className="w-9 h-9 rounded-full border border-line text-fg-muted hover:text-accent hover:border-accent flex items-center justify-center transition-colors"
                        >
                            <i className={`text-lg ${isDark ? 'ri-sun-line' : 'ri-moon-line'}`}></i>
                        </button>
                    </div>
                </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
