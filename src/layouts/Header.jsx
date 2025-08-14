const Header = () => {
    return (
        <header>
            <nav className="w-full py-5 absolute">
                <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    <div className="title">
                    <h1 className="text-xl"><span className="text-2xl">👾</span>Hmn!</h1>
                    </div>
                    <div className="live flex items-center gap-1">
                    <i className="ri-global-line text-2xl"></i>
                    <p>Sidoarjo, Indonesia</p>
                    </div>
                </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;