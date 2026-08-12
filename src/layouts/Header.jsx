import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30">
            <nav className="w-full py-4 sm:py-5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="title">
                        <Link to="/" className="text-lg sm:text-xl font-bold">
                            <span className="text-xl sm:text-2xl">👾</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500">Hmn!</span>
                        </Link>
                    </div>
                    <div className="live flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                        <i className="ri-global-line text-xl sm:text-2xl text-fuchsia-500"></i>
                        <p className="hidden sm:inline">Sidoarjo, Indonesia</p>
                        <p className="sm:hidden">Sidoarjo</p>
                    </div>
                </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;