import ContentProjectList from "./ContentProjectList";

const ContentProject = ({ projects }) => {
    return (
        <div id="projects" class="pt-16 mb-10">
            <h3 class="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Recent Projects</h3><span class="text-3xl ml-1">🛠️</span>
            <ContentProjectList projects={projects} />
        </div>
    )
}

export default ContentProject;