import sltnMain from "../images/project/sltn.jpg"

const ContentCertificate = () => {
    return (
        <div id="certificate" class="pt-16 mb-10">
            <h3 class="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Certificates</h3><span class="text-3xl ml-1">✨</span>
            <div class="grid grid-cols-12 gap-4 mt-5 mb-10 bg-red-400">
                <div class="col-span-4">
                    <div class="w-full rounded-lg shadow h-full bg-zinc-900">
                            <div>
                                <img class="p-2 rounded-xl w-full h-42 object-cover" src={sltnMain} alt="product" />
                            </div>
                            <div class="px-3 pb-5">
                                <a href="#" target="_blank">
                                    <h5 class="text-xl font-semibold tracking-tight text-white line-clamp-2">Job Portal Wordpress Theme</h5>
                                </a>
                                <div class="flex flex-wrap justify-between relative">
                                    <div id="link" class="flex justify-start w-full gap-2 mt-1">
                                        <a href="#" target="_blank">
                                            <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500    hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-0.5 text-center me-2 mb-2">
                                                <span className="relative px-1 text-sm transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                                    Dicoding Indonesia
                                                </span>
                                            </button>
                                        </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentCertificate;