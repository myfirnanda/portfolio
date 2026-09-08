import ContentSkillItem from "./ContentSkillItem";

const ContentSkillList = ({ skills }) => {
    console.log(skills.frameworks)
    return (
        <div id="skills-container" className="space-y-8 sm:space-y-10">
            {Object.keys(skills).map((skill, index) => {
                return (
                    <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6 items-start sm:items-center" id="skill-item" key={index}>
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold sm:col-span-3 capitalize mb-2 sm:mb-0">
                            {skill === "programmingLanguage" ? (<>Programming<br className="hidden sm:block" /> Language</>) : skill}
                        </h4>
                        <div id="skill-tag" className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 sm:col-span-9 w-full">
                        {skills[skill].map(stack => {
                            return (                                
                                <ContentSkillItem key={stack.id} {...stack} />  
                            )
                        })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ContentSkillList;