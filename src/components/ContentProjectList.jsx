import ContentProjectItem from "./ContentProjectItem";

const ContentProjectList = ({ projects }) => {
    return (
        <div class="grid grid-cols-12 gap-4 mt-5 mb-10">
            {[...projects].reverse().map(project => {
                return (
                    <ContentProjectItem key={project.id} {...project} />
                )
            })}
        </div>
    )
}

export default ContentProjectList;