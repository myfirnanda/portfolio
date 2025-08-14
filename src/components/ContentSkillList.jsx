import ContentSkillItem from "./ContentSkillItem";

const ContentSkillList = ({ skills }) => {
    console.log(skills.frameworks)
    return (
        <div id="skills-container">
            {Object.keys(skills).map((skill, index) => {
                return (
                    <div className="grid grid-cols-12 items-center mt-5 mb-10" id="skill-item" key={index}>
                        <h4 className="text-xl font-semibold col-span-3 capitalize">{skill === "programmingLanguage" ? (<>Programming<br />Language</>) : skill}</h4>
                        <div id="skill-tag" className="flex gap-5 col-span-9">
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