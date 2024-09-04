const SectionMenuAside = () => {
    return (
        <div id="rocket" className="col-span-3 w-full sticky top-10 h-screen">
                  <a href="#introduction" id="profile-picture" className="w-full flex justify-center animate-up-down">
                    <img src="https://www.dropbox.com/scl/fi/u4j60zhklts7nsm680z4g/img2.webp?rlkey=gl6pm7td5pu26axt5wxs5xz6z&st=py0js3zo&raw=1" alt="Rocket Guy" />
                  </a>
                  <div id="link-list" className="p-4 rounded-xl bg-zinc-900">
                    <ul className="text-lg font-semibold">
                      <li className="mb-2"><i className="ri-arrow-right-double-line"></i> <a href="#profesional-experiences" className="hover:text-fuchsia-500">Profesional Experiences</a></li>
                      <li className="mb-2"><i className="ri-arrow-right-double-line"></i> <a href="#skills" className="hover:text-fuchsia-500">Skills & Tech Stack</a></li>
                      <li className="mb-2"><i className="ri-arrow-right-double-line"></i> <a href="#education" className="hover:text-fuchsia-500">Education</a></li>
                      <li className="mb-2"><i className="ri-arrow-right-double-line"></i> <a href="#projects" className="hover:text-fuchsia-500">Recent Projects</a></li>
                      <li className="mb-2"><i className="ri-arrow-right-double-line"></i> <a href="#certificate" className="hover:text-fuchsia-500">Certificates</a></li>
                      <li><a href="#contact" className="hover:text-fuchsia-500"><i className="ri-arrow-right-double-line"></i> Contact</a></li>
                    </ul>
                  </div>
                </div>
    )
}

export default SectionMenuAside;