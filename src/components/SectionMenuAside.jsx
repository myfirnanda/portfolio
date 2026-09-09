const SectionMenuAside = () => {
    return (
        <div id="rocket" className="hidden lg:block lg:col-span-3 w-full sticky top-20 h-[100dvh]">
                  {/* Animated Rocket Image */}
                  <a href="#introduction" id="profile-picture" className="w-full flex justify-center animate-up-down">
                    <img src="https://www.dropbox.com/scl/fi/u4j60zhklts7nsm680z4g/img2.webp?rlkey=gl6pm7td5pu26axt5wxs5xz6z&st=py0js3zo&raw=1" alt="Rocket Guy" />
                  </a>

                  {/* Desktop Link List */}
                  <div id="link-list" className="p-4 rounded-card bg-surface border border-line">
                    <ul className="space-y-1.5">
                      <li>
                        <a href="#profesional-experiences" className="group flex items-center gap-3 px-3 py-2.5 rounded-card hover:bg-surface transition-all duration-200">
                          <i className="ri-briefcase-line text-lg text-accent"></i>
                          <span className="text-sm font-medium text-fg-muted group-hover:text-fg">Professional Experiences</span>
                        </a>
                      </li>
                      <li>
                        <a href="#skills" className="group flex items-center gap-3 px-3 py-2.5 rounded-card hover:bg-surface transition-all duration-200">
                          <i className="ri-code-s-slash-line text-lg text-accent"></i>
                          <span className="text-sm font-medium text-fg-muted group-hover:text-fg">Skills & Tech Stack</span>
                        </a>
                      </li>
                      <li>
                        <a href="#education" className="group flex items-center gap-3 px-3 py-2.5 rounded-card hover:bg-surface transition-all duration-200">
                          <i className="ri-graduation-cap-line text-lg text-accent"></i>
                          <span className="text-sm font-medium text-fg-muted group-hover:text-fg">Education</span>
                        </a>
                      </li>
                      <li>
                        <a href="#projects" className="group flex items-center gap-3 px-3 py-2.5 rounded-card hover:bg-surface transition-all duration-200">
                          <i className="ri-folder-3-line text-lg text-accent"></i>
                          <span className="text-sm font-medium text-fg-muted group-hover:text-fg">Recent Projects</span>
                        </a>
                      </li>
                      <li>
                        <a href="#contact" className="group flex items-center gap-3 px-3 py-2.5 rounded-card hover:bg-surface transition-all duration-200">
                          <i className="ri-mail-send-line text-lg text-accent"></i>
                          <span className="text-sm font-medium text-fg-muted group-hover:text-fg">Contact</span>
                        </a>
                      </li>
                    </ul>
                  </div>
      </div>
    )
}

export default SectionMenuAside;