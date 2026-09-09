import ContentProjectItem from "./ContentProjectItem";

const ContentProjectList = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 mb-10">
            {[...projects].reverse().map((project, index) => {
                return (
                    <ContentProjectItem key={project.id} index={index} {...project} />
                )
            })}
        </div>
    )
}

export default ContentProjectList;