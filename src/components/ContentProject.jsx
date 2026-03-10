import { Link } from 'react-router-dom';
import ContentProjectList from "./ContentProjectList";

const ContentProject = ({ projects }) => {
    // Show only latest 3 projects on home page
    const latestProjects = [...projects].reverse().slice(0, 3);
    
    return (
        <div id="projects" className="pt-16 mb-10">
            <div className="mb-10 sm:mb-12">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold relative line-heading inline-block">
                    Recent Projects
                    <span className="ml-2 sm:ml-3">🛠️</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4">Showcasing my latest work and technical expertise</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-10">
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
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold rounded-xl hover:from-fuchsia-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-fuchsia-500/30"
                >
                    <span>View All Projects</span>
                    <i className="ri-arrow-right-line text-lg"></i>
                </Link>
            </div>
        </div>
    )
}

export default ContentProject;