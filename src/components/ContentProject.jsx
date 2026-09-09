import { Link } from 'react-router-dom';

const ContentProject = ({ projects }) => {
    // Show only latest 3 projects on home page
    const latestProjects = [...projects].reverse().slice(0, 3);
    
    return (
        <div id="projects" className="pt-16 mb-10">
            <div className="mb-10 sm:mb-12">
                <p className="meta mb-3">05</p>
                <h3 className="text-xl sm:text-2xl flex items-center gap-2 sm:gap-3">
                    <span>Recent Projects</span>
                    <span className="text-2xl sm:text-3xl leading-none">🛠️</span>
                </h3>
                <p className="text-sm sm:text-base text-fg-muted mt-3 sm:mt-4">Showcasing my latest work and technical expertise</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 mb-10">
                {latestProjects.map((project, index) => {
                    const ContentProjectItem = require("./ContentProjectItem").default;
                    return (
                        <ContentProjectItem key={project.id} index={index} {...project} />
                    )
                })}
            </div>
            <div className="text-center mt-8">
                <Link 
                    to="/projects" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent-strong text-on-accent font-semibold rounded-card hover:from-accent hover:to-accent transition-all duration-300 shadow-lg hover:shadow-accent/20"
                >
                    <span>View All Projects</span>
                    <i className="ri-arrow-right-line text-lg"></i>
                </Link>
            </div>
        </div>
    )
}

export default ContentProject;