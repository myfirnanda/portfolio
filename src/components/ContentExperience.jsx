import ContentExperienceList from "./ContentExperienceList";

const ContentExperience = ({ experiences }) => {
    return (
        <div id="profesional-experiences" className="pt-16 mb-10 px-4 sm:px-6">
            <div className="mb-8 sm:mb-10">
                <p className="meta mb-3">02</p>
                <h3 className="text-xl sm:text-2xl">Professional Experience</h3>
                <span className="text-2xl sm:text-3xl ml-1 sm:ml-2">💼</span>
            </div>
            <ContentExperienceList experiences={experiences} />
        </div>
    )
}

export default ContentExperience;