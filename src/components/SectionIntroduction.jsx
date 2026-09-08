const SectionIntroduction = () => {
    return (
        <section id="introduction" className="py-16 sm:py-20 md:py-28 px-4">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative line-heading-center inline-block mb-4 animate-fade-in">
                        About Me, Call Me{' '}
                        <span className="text-accent">
                            Firnanda
                        </span>
                    </h3>
                </div>
                
                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Description */}
                    <div className="space-y-6">
                        <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
                            I'm a <span className="text-accent font-semibold">passionate developer</span> dedicated to crafting elegant solutions and turning ideas into impactful digital experiences. With expertise in both frontend and backend technologies, I specialize in building scalable web applications.
                        </p>
                        <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
                            I believe in writing <span className="text-accent font-semibold">clean, maintainable code</span> and staying up-to-date with the latest industry trends. Let's collaborate and build something extraordinary together!
                        </p>
                        
                        {/* Quick Facts */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 rounded-xl bg-surface border border-line">
                                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">~2</div>
                                <div className="text-xs sm:text-sm text-fg-muted">Years Experience</div>
                            </div>
                            <div className="p-4 rounded-xl bg-surface border border-line">
                                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">8+</div>
                                <div className="text-xs sm:text-sm text-fg-muted">Projects Completed</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Key Highlights */}
                    <div className="space-y-4">
                        <div className="group p-5 rounded-xl bg-surface border border-line hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-strong flex items-center justify-center">
                                    <i className="ri-lightbulb-line text-2xl text-fg"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-fg mb-1">Problem Solver</h4>
                                    <p className="text-sm text-fg-muted">Love tackling complex challenges with creative solutions</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="group p-5 rounded-xl bg-surface border border-line hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-strong flex items-center justify-center">
                                    <i className="ri-team-line text-2xl text-fg"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-fg mb-1">Flexible Worker</h4>
                                    <p className="text-sm text-fg-muted">Thrive both in team collaboration and independent work</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="group p-5 rounded-xl bg-surface border border-line hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-strong flex items-center justify-center">
                                    <i className="ri-book-open-line text-2xl text-fg"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-fg mb-1">Continuous Learner</h4>
                                    <p className="text-sm text-fg-muted">Always exploring new technologies and best practices</p>
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