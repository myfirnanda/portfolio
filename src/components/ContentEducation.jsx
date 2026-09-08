const ContentEducation = () => {
    return (
        <div id="education" className="pt-16 mb-10 px-4 sm:px-6">
            <div className="mb-8 sm:mb-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold relative line-heading inline-block mb-3 sm:mb-4">Education</h3>
                <span className="text-2xl sm:text-3xl ml-1 sm:ml-2">🎓</span>
            </div>
            
            {/* Timeline Container */}
            <div className="relative space-y-8 sm:space-y-10">
                {/* Timeline Line - Hidden on mobile */}
                <div className="hidden md:block absolute left-8 top-4 bottom-4 w-0.5 bg-accent-strong"></div>
                
                {/* Education Item 1 */}
                <div className="relative group">
                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-6 top-6 w-5 h-5 bg-accent-strong rounded-full border-4 border-bg z-10 group-hover:scale-125 transition-transform duration-300"></div>
                    
                    {/* Card */}
                    <div className="md:ml-16 bg-surface rounded-xl p-5 sm:p-6 md:p-8 border border-line hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                            <div className="flex-1">
                                <h4 className="text-xl sm:text-2xl font-bold text-fg mb-1">
                                    National Development University
                                </h4>
                                <h4 className="text-base sm:text-xl text-accent">Veteran of East Java</h4>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base text-fg-muted">
                                <i className="ri-map-pin-line text-accent"></i>
                                <span>Surabaya, Indonesia</span>
                            </div>
                        </div>
                        
                        {/* Degree & Date */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5 pb-4 border-b border-line/50">
                            <div className="flex items-center gap-2">
                                <i className="ri-graduation-cap-fill text-xl text-accent"></i>
                                <h4 className="text-base sm:text-lg font-semibold text-accent">Bachelor of Computer Science</h4>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base text-fg-muted">
                                <i className="ri-calendar-line text-accent"></i>
                                <span>2021 - 2025</span>
                            </div>
                        </div>
                        
                        {/* Details */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-raised/50 rounded-xl">
                                <i className="ri-star-fill text-xl text-yellow-500 mt-0.5 flex-shrink-0"></i>
                                <div>
                                    <span className="font-semibold text-fg">Cumulative GPA:</span>
                                    <span className="ml-2 text-yellow-400 font-bold">3.88 / 4.00</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-raised/50 rounded-xl">
                                <i className="ri-book-open-line text-xl text-accent mt-0.5 flex-shrink-0"></i>
                                <div>
                                    <span className="font-semibold text-fg block mb-1">Relevant Coursework:</span>
                                    <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                                        Software Engineering, Web Programming, Mobile App Development, Cloud Computing, Data Structure, Object-Oriented Programming (OOP), Framework Programming
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Education Item 2 */}
                <div className="relative group">
                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-6 top-6 w-5 h-5 bg-accent-strong rounded-full border-4 border-bg z-10 group-hover:scale-125 transition-transform duration-300"></div>
                    
                    {/* Card */}
                    <div className="md:ml-16 bg-surface rounded-xl p-5 sm:p-6 md:p-8 border border-line hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                            <div className="flex-1">
                                <h4 className="text-xl sm:text-2xl font-bold text-fg mb-1">
                                    Yayasan Dicoding Indonesia
                                </h4>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base text-fg-muted">
                                <i className="ri-map-pin-line text-accent"></i>
                                <span>Bandung, Indonesia</span>
                            </div>
                        </div>
                        
                        {/* Program & Date */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5 pb-4 border-b border-line/50">
                            <div className="flex items-center gap-2">
                                <i className="ri-cloud-fill text-xl text-accent"></i>
                                <h4 className="text-base sm:text-lg font-semibold text-accent">Cloud Computing Learning Path</h4>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base text-fg-muted">
                                <i className="ri-calendar-line text-accent"></i>
                                <span>Aug 2023 - Dec 2023</span>
                            </div>
                        </div>
                        
                        {/* Achievements */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-accent-strong rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                                    Developed an innovative app with <span className="text-accent font-semibold">CRUD functionalities</span>, authentication, and authorization, integrating with <span className="text-accent font-semibold">GoogleCloud Platform (GCP)</span> services for enhanced performance and scalability.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-accent-strong rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                                    Created a <span className="text-accent font-semibold">REST API</span> using ExpressJS and MySQL, ensuring smooth frontend usage by testing with Postman, and provided clear API documentation with <span className="text-accent font-semibold">Swagger</span> for team collaboration.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-accent-strong rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                                    Successfully collaborated with <span className="text-accent font-semibold">6 member team</span>, demonstrating strong interpersonal skills, and completed the project ahead of schedule.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentEducation;