import ContentExperienceList from "./ContentExperienceList";

const ContentExperience = ({ experiences }) => {
    return (
        <div id="profesional-experiences" class="pt-16 mb-10">
            <h3 class="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Profesional Experience</h3>
            <span class="text-3xl ml-1">💼</span>
            <ContentExperienceList experiences={experiences} />
        </div>
    )
}

export default ContentExperience;