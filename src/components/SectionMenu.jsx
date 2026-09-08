import SectionMenuAside from "./SectionMenuAside"
import SectionMenuContent from "./SectionMenuContent"

const SectionMenu = () => {
    return (
        <>
        <section id="menu" className="bg-bg relative">
            <div className="relative bg-raised">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10">
                        <SectionMenuAside />
                        <SectionMenuContent />
                    </div>
                </div>
            </div>
        </section>
        
        {/* Mobile Navbar - Fixed Bottom - Outside to avoid z-index issues */}
        <div id="link-list-mobile" className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-surface/95 backdrop-blur-lg border-t border-line shadow-2xl">
            <nav className="container mx-auto px-2">
                <ul className="flex justify-around items-center py-3 text-xs">
                    <li className="flex-1 text-center">
                        <a href="#profesional-experiences" className="flex flex-col items-center gap-1 hover:text-accent active:text-accent transition-colors duration-200">
                            <i className="ri-briefcase-line text-xl"></i>
                            <span className="text-[10px]">Experience</span>
                        </a>
                    </li>
                    <li className="flex-1 text-center">
                        <a href="#skills" className="flex flex-col items-center gap-1 hover:text-accent active:text-accent transition-colors duration-200">
                            <i className="ri-code-s-slash-line text-xl"></i>
                            <span className="text-[10px]">Skills</span>
                        </a>
                    </li>
                    <li className="flex-1 text-center">
                        <a href="#education" className="flex flex-col items-center gap-1 hover:text-accent active:text-accent transition-colors duration-200">
                            <i className="ri-graduation-cap-line text-xl"></i>
                            <span className="text-[10px]">Education</span>
                        </a>
                    </li>
                    <li className="flex-1 text-center">
                        <a href="#projects" className="flex flex-col items-center gap-1 hover:text-accent active:text-accent transition-colors duration-200">
                            <i className="ri-folder-line text-xl"></i>
                            <span className="text-[10px]">Projects</span>
                        </a>
                    </li>
                    <li className="flex-1 text-center">
                        <a href="#certificate" className="flex flex-col items-center gap-1 hover:text-accent active:text-accent transition-colors duration-200">
                            <i className="ri-award-line text-xl"></i>
                            <span className="text-[10px]">Certificates</span>
                        </a>
                    </li>
                    <li className="flex-1 text-center">
                        <a href="#contact" className="flex flex-col items-center gap-1 hover:text-accent active:text-accent transition-colors duration-200">
                            <i className="ri-mail-line text-xl"></i>
                            <span className="text-[10px]">Contact</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default SectionMenu;