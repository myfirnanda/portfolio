import { Link } from 'react-router-dom';
import ContentProjectList from "../components/ContentProjectList";
import BackToTop from "../components/BackToTop";
import { personalData } from "../utils/personalData";

const ProjectsPage = () => {
    return (
        <main className="min-h-[100dvh] bg-bg">
            {/* Header Section */}
            <section className="pt-24 pb-10 relative">

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-fg-muted hover:text-accent transition-colors duration-300 mb-8"
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
                        <p className="text-base sm:text-lg text-fg-muted mt-4 sm:mt-5 max-w-2xl">
                            A complete collection of my projects showcasing technical expertise and creative problem-solving across various technologies.
                        </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-10">
                        <div className="bg-surface/50 border border-line rounded-xl px-6 py-4">
                            <p className="text-3xl font-bold text-accent">
                                {personalData.projects.length}
                            </p>
                            <p className="text-sm text-fg-muted">Total Projects</p>
                        </div>
                        <div className="bg-surface/50 border border-line rounded-xl px-6 py-4">
                            <p className="text-3xl font-bold text-accent">
                                {[...new Set(personalData.projects.flatMap(p => p.techStack))].length}
                            </p>
                            <p className="text-sm text-fg-muted">Technologies Used</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Projects Grid */}
            <section className="pb-20 relative">

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ContentProjectList projects={personalData.projects} />
                </div>
            </section>
            
            <BackToTop />
        </main>
    )
}

export default ProjectsPage;
