import ContentExperienceItem from "./ContentExperienceItem";

const ContentExperienceList = ({ experiences }) => {
    return (
        <div class="flex items-center mt-5 mb-10">
            <div class="space-y-6 border-l-2 border-dashed w-screen">
                {[...experiences].reverse().map(experience => {
                    return <ContentExperienceItem key={experience.id} {...experience} />
                })}
            </div>
        </div>
    )
}

export default ContentExperienceList;