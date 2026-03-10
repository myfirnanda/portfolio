import ContentProjectItem from "./ContentProjectItem";

const ContentProjectList = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-10">
            {[...projects].reverse().map((project, index) => {
                return (
                    <ContentProjectItem key={project.id} index={index} {...project} />
                )
            })}
        </div>
    )
}

export default ContentProjectList;