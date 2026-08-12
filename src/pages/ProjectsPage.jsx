import { Link } from 'react-router-dom';
import ContentProjectList from "../components/ContentProjectList";
import BackToTop from "../components/BackToTop";
import { personalData } from "../utils/personalData";
import Starfield from "../components/Starfield";

const ProjectsPage = () => {
    return (
        <main className="min-h-screen bg-black">
            {/* Header Section */}
            <section className="pt-24 pb-10 relative">
                <Starfield direction="down-left" density={0.8} meteorRate={0.8} maxMeteors={3} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-fuchsia-500 transition-colors duration-300 mb-8"
                    >
                        <i className="ri-arrow-left-line text-xl"></i>
                        <span>Back to Home</span>
                    </Link>
                    
                    {/* Page Title */}
                    <div className="mb-10 sm:mb-12">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold relative line-heading inline-block">
                            All Projects
                            <span className="ml-2 sm:ml-3">🛠️</span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 mt-4 sm:mt-5 max-w-2xl">
                            A complete collection of my projects showcasing technical expertise and creative problem-solving across various technologies.
                        </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-10">
                        <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl px-6 py-4">
                            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500">
                                {personalData.projects.length}
                            </p>
                            <p className="text-sm text-gray-400">Total Projects</p>
                        </div>
                        <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl px-6 py-4">
                            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500">
                                {[...new Set(personalData.projects.flatMap(p => p.techStack))].length}
                            </p>
                            <p className="text-sm text-gray-400">Technologies Used</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Projects Grid */}
            <section className="pb-20 relative">
                <Starfield direction="down-left" density={0.8} meteorRate={0.8} maxMeteors={3} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ContentProjectList projects={personalData.projects} />
                </div>
            </section>
            
            <BackToTop />
        </main>
    )
}

export default ProjectsPage;
