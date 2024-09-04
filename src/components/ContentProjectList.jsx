const ContentProjectList = () => {
    return (
        <div class="grid grid-cols-12 gap-4 mt-5 mb-10 bg-red-400">
            <div class="col-span-4">
                <div class="w-full rounded-lg shadow h-full" style="background-color: rgb(24 24 27);">
                    <div>
                        <img class="p-2 rounded-xl w-full h-42 object-cover" src="./projects/sltn.jpg" alt="product image" />
                    </div>
                    <div class="px-3 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight text-white line-clamp-2">Job Portal Wordpress Theme</h5>
                        </a>
                        <div class="flex items-center mt-1 mb-2.5">
                            <p class="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, eveniet suscipit libero omnis</p>
                        </div>
                        <div class="flex flex-wrap justify-between relative">
                        <div id="tech-stack" class="flex flex-wrap gap-2 mb-2.5">
                            <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border" style="color: rgb(134 25 143); border-color: rgb(232 121 249);">Wordpress</span>
                            <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border" style="color: rgb(134 25 143); border-color: rgb(232 121 249);">PHP</span>
                            <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border" style="color: rgb(134 25 143); border-color: rgb(232 121 249);">Bootstrap</span>
                        </div>
                        
                        <div id="link" class="flex justify-start w-full gap-2 mt-1">
                            <a href="#" target="_blank">
                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white">
                                <span class="relative px-1 text-xl transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <i class="ri-external-link-line"></i>
                                </span>
                            </button>
                            </a>
                            <a href="#" target="_blank">
                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white">
                                <span class="relative px-1 text-xl transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
            <div class="max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg" src="./projects/sltn.jpg" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">Noteworthy ifeoifhef peifhpie hfefpie </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
            </div>
            <div class="col-span-4">
            {/* <!--  --> */}
            </div>
        </div>
    )
}

export default ContentProjectList;