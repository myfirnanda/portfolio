const ContentCertificateItem = ({ image, title, source, link }) => {
    return (
        <div className="col-span-12 md:col-span-4">
            <div className="w-full rounded-lg shadow h-full bg-zinc-900">
                <div>
                    <img
                        className="p-2 rounded-xl w-full h-48 object-cover"
                        src={image}
                        alt={title}
                    />
                </div>
                <div className="px-3 pb-5">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <h5 className="text-xl font-semibold tracking-tight text-white line-clamp-2">
                            {title}
                        </h5>
                    </a>
                    <div className="flex flex-wrap justify-between relative">
                        <div className="flex justify-start w-full gap-2 mt-1">
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <button
                                    type="button"
                                    className="group text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
                                                focus:ring-4 focus:outline-none focus:ring-purple-200 
                                                dark:focus:ring-purple-800 font-medium rounded-lg text-sm 
                                                p-0.5 text-center me-2 mb-2"
                                >
                                    <span className="relative px-1 text-sm transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                        {source}
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentCertificateItem;
