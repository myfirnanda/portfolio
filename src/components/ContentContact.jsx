const ContentContact = () => {
    return (
        <div id="contact" className="pt-16 mb-36">
            <h3 className="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Contact Me</h3><span className="text-3xl ml-1">📞</span>
            <p className="mb-8">
                Looking to collaborate, discuss a potential project, or explore professional opportunities? I’m open to new challenges and would love to connect. Reach out to me via WhatsApp or email, and let’s talk about how we can work together to achieve your goals.
            </p>
            <ul className="flex justify-center gap-28 w-3/4">
                <li>
                    <a href="https://wa.me/6285161858890" className="flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-1 py-2 text-center me-2 mb-2">
                        <span className="relative py-1 px-2 text-4xl transition-all ease-in duration-75 bg-transparent rounded-full group-hover:bg-opacity-0">
                                <i className="ri-whatsapp-line"></i>
                            </span>
                        </button>
                        <div className="mb-2">
                            <h6 className="text-2xl font-semibold inline">Whatsapp</h6>
                            <p>(+62) 851 6185 8890</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="mailto:myfirnanda@gmail.com" className="flex gap-3 items-center" rel="noopener noreferrer">
                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-1 py-2 text-center me-2 mb-2">
                            <span className="relative py-1 px-2 text-4xl transition-all ease-in duration-75 bg-transparent rounded-full group-hover:bg-opacity-0">
                                <i className="ri-mail-line"></i>
                            </span>
                        </button>
                        <div className="mb-2">
                            <h6 className="text-2xl font-semibold">Gmail</h6>
                            <p>myfirnanda@gmail.com</p>
                        </div>
                    </a>
                </li>
            </ul>
            </div>
    )
}

export default ContentContact;