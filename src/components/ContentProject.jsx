import sltnMain from "../images/project/sltn.jpg"

const ContentProject = () => {
    return (
        <div id="projects" class="pt-16 mb-10">
            <h3 class="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Recent Projects</h3><span class="text-3xl ml-1">🛠️</span>
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
                                <div class="flex items-center mt-1 mb-2.5">
                                    <p class="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, eveniet suscipit libero omnis</p>
                                </div>
                                <div class="flex flex-wrap justify-between relative">
                                    <div id="tech-stack" class="flex flex-wrap gap-2 mb-2.5">
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">Wordpress</span>
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">PHP</span>
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">Bootstrap</span>
                                    </div>
                                    <div id="link" class="flex justify-start w-full gap-2 mt-1">
                                    <a href="#" target="_blank">
                                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-0.5 text-center me-2 mb-2">
                                            <span className="relative px-1 text-xl transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                                <i class="ri-external-link-line"></i>
                                            </span>
                                        </button>
                                    </a>
                                    <a href="#" target="_blank">
                                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500    hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-0.5 text-center me-2 mb-2">
                                            <span className="relative px-1 text-xl transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                                <i class="ri-github-fill"></i>
                                            </span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div class="col-span-4">
                        <div class="w-full rounded-lg shadow h-full bg-zinc-900">
                            <div>
                                <img class="p-2 rounded-xl w-full h-42 object-cover" src={sltnMain} alt="product" />
                            </div>
                            <div class="px-3 pb-5">
                                <a href="#" target="_blank">
                                    <h5 class="text-xl font-semibold tracking-tight text-white line-clamp-2">Job Portal Wordpress Theme</h5>
                                </a>
                                <div class="flex items-center mt-1 mb-2.5">
                                    <p class="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, eveniet suscipit libero omnis</p>
                                </div>
                                <div class="flex flex-wrap justify-between relative">
                                    <div id="tech-stack" class="flex flex-wrap gap-2 mb-2.5">
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">Wordpress</span>
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">PHP</span>
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">Bootstrap</span>
                                    </div>
                                    <div id="link" class="flex justify-start w-full gap-2 mt-1">
                                    <a href="#" target="_blank">
                                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-0.5 text-center me-2 mb-2">
                                            <span className="relative px-1 text-xl transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                                <i class="ri-external-link-line"></i>
                                            </span>
                                        </button>
                                    </a>
                                    <a href="#" target="_blank">
                                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500    hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-0.5 text-center me-2 mb-2">
                                            <span className="relative px-1 text-xl transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                                <i class="ri-github-fill"></i>
                                            </span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-4">
                        <div class="w-full rounded-lg shadow h-full bg-zinc-900">
                            <div>
                                <img class="p-2 rounded-xl w-full h-42 object-cover" src={sltnMain} alt="product" />
                            </div>
                            <div class="px-3 pb-5">
                                <a href="#" target="_blank">
                                    <h5 class="text-xl font-semibold tracking-tight text-white line-clamp-2">Job Portal Wordpress Theme</h5>
                                </a>
                                <div class="flex items-center mt-1 mb-2.5">
                                    <p class="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, eveniet suscipit libero omnis</p>
                                </div>
                                <div class="flex flex-wrap justify-between relative">
                                    <div id="tech-stack" class="flex flex-wrap gap-2 mb-2.5">
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">Wordpress</span>
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">PHP</span>
                                        <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">Bootstrap</span>
                                    </div>
                                    <div id="link" class="flex justify-start w-full gap-2 mt-1">
                                    <a href="#" target="_blank">
                                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-0.5 text-center me-2 mb-2">
                                            <span className="relative px-1 text-xl transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                                <i class="ri-external-link-line"></i>
                                            </span>
                                        </button>
                                    </a>
                                    <a href="#" target="_blank">
                                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500    hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-0.5 text-center me-2 mb-2">
                                            <span className="relative px-1 text-xl transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                                                <i class="ri-github-fill"></i>
                                            </span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ContentProject;