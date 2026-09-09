const ContentContact = () => {
    return (
        <div id="contact" className="pt-16 mb-20 sm:mb-28 lg:mb-36 px-4 sm:px-6 relative overflow-hidden">
            <div className="mb-8 sm:mb-10 relative z-10">
                <p className="meta mb-3">06</p>
                <h3 className="text-xl sm:text-2xl flex items-center gap-2 sm:gap-3">
                    <span>Contact Me</span>
                    <span className="text-2xl sm:text-3xl leading-none">📞</span>
                </h3>
            </div>
            <p className="mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed max-w-3xl relative z-10">
                Looking to collaborate, discuss a potential project, or explore professional opportunities? I’m open to new challenges and would love to connect. Reach out to me via WhatsApp or email, and let’s talk about how we can work together to achieve your goals.
            </p>
            <ul className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-6 sm:gap-10 md:gap-16 lg:gap-28 relative z-10">
                <li className="inline-block">
                    <a href="https://wa.me/6285161858890" className="flex gap-3 sm:gap-4 items-center hover:scale-[1.02] transition-transform duration-200" target="_blank" rel="noopener noreferrer">
                        <button type="button" className="text-on-accent bg-accent-strong hover:shadow-lg hover:shadow-accent/20 focus:ring-4 focus:outline-none focus:ring-accent/40 font-medium rounded-card transition-all duration-300 flex-shrink-0">
                        <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-2xl sm:text-3xl md:text-4xl">
                                <i className="ri-whatsapp-line"></i>
                            </span>
                        </button>
                        <div>
                            <h6 className="text-lg sm:text-xl md:text-2xl font-semibold mb-0.5 sm:mb-1">Whatsapp</h6>
                            <p className="text-xs sm:text-sm md:text-base text-fg-muted">(+62) 851 6185 8890</p>
                        </div>
                    </a>
                </li>
                <li className="inline-block">
                    <a href="mailto:myfirnanda@gmail.com" className="flex gap-3 sm:gap-4 items-center hover:scale-[1.02] transition-transform duration-200" rel="noopener noreferrer">
                        <button type="button" className="text-on-accent bg-accent-strong hover:shadow-lg hover:shadow-accent/20 focus:ring-4 focus:outline-none focus:ring-accent/40 font-medium rounded-card transition-all duration-300 flex-shrink-0">
                            <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-2xl sm:text-3xl md:text-4xl">
                                <i className="ri-mail-line"></i>
                            </span>
                        </button>
                        <div>
                            <h6 className="text-lg sm:text-xl md:text-2xl font-semibold mb-0.5 sm:mb-1">Gmail</h6>
                            <p className="text-xs sm:text-sm md:text-base text-fg-muted break-all">myfirnanda@gmail.com</p>
                        </div>
                    </a>
                </li>
            </ul>
            </div>
    )
}

export default ContentContact;