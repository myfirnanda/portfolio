const SectionMenuAside = () => {
    return (
        <div id="rocket" className="hidden lg:block lg:col-span-3 w-full sticky top-12 h-screen">
                  {/* Animated Rocket Image */}
                  <a href="#introduction" id="profile-picture" className="w-full flex justify-center animate-up-down">
                    <img src="https://www.dropbox.com/scl/fi/u4j60zhklts7nsm680z4g/img2.webp?rlkey=gl6pm7td5pu26axt5wxs5xz6z&st=py0js3zo&raw=1" alt="Rocket Guy" />
                  </a>

                  {/* Desktop Link List */}
                  <div id="link-list" className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <ul className="space-y-1.5">
                      <li>
                        <a href="#profesional-experiences" className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-all duration-200">
                          <i className="ri-briefcase-line text-lg text-fuchsia-500"></i>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">Professional Experiences</span>
                        </a>
                      </li>
                      <li>
                        <a href="#skills" className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-all duration-200">
                          <i className="ri-code-s-slash-line text-lg text-purple-500"></i>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">Skills & Tech Stack</span>
                        </a>
                      </li>
                      <li>
                        <a href="#education" className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-all duration-200">
                          <i className="ri-graduation-cap-line text-lg text-blue-500"></i>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">Education</span>
                        </a>
                      </li>
                      <li>
                        <a href="#projects" className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-all duration-200">
                          <i className="ri-folder-3-line text-lg text-pink-500"></i>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">Recent Projects</span>
                        </a>
                      </li>
                      <li>
                        <a href="#certificate" className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-all duration-200">
                          <i className="ri-award-line text-lg text-amber-500"></i>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">Certificates</span>
                        </a>
                      </li>
                      <li>
                        <a href="#contact" className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-all duration-200">
                          <i className="ri-mail-send-line text-lg text-green-500"></i>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">Contact</span>
                        </a>
                      </li>
                    </ul>
                  </div>
      </div>
    )
}

export default SectionMenuAside;