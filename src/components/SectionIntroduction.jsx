const SectionIntroduction = () => {
    return (
        <section id="introduction" className="py-16 sm:py-20 md:py-28 px-4">
            {/* z-10 keeps this above App's fixed starfield canvas at z-1. */}
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative line-heading-center inline-block mb-4 animate-fade-in">
                        About Me — Call Me{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500">
                            Firnanda
                        </span>
                    </h3>
                </div>
                
                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Description */}
                    <div className="space-y-6">
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            I'm a <span className="text-fuchsia-500 font-semibold">passionate developer</span> dedicated to crafting elegant solutions and turning ideas into impactful digital experiences. With expertise in both frontend and backend technologies, I specialize in building scalable web applications.
                        </p>
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            I believe in writing <span className="text-purple-500 font-semibold">clean, maintainable code</span> and staying up-to-date with the latest industry trends. Let's collaborate and build something extraordinary together!
                        </p>
                        
                        {/* Quick Facts */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700">
                                <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 mb-1">~2</div>
                                <div className="text-xs sm:text-sm text-gray-400">Years Experience</div>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700">
                                <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500 mb-1">8+</div>
                                <div className="text-xs sm:text-sm text-gray-400">Projects Completed</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Key Highlights */}
                    <div className="space-y-4">
                        <div className="group p-5 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                    <i className="ri-lightbulb-line text-2xl text-white"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">Problem Solver</h4>
                                    <p className="text-sm text-gray-400">Love tackling complex challenges with creative solutions</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="group p-5 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                                    <i className="ri-team-line text-2xl text-white"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">Flexible Worker</h4>
                                    <p className="text-sm text-gray-400">Thrive both in team collaboration and independent work</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="group p-5 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <i className="ri-book-open-line text-2xl text-white"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">Continuous Learner</h4>
                                    <p className="text-sm text-gray-400">Always exploring new technologies and best practices</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionIntroduction;