import ContentSkillList from "./ContentSkillList";

const ContentSkill = ({ skills }) => {
    return (
        <div id="skills" className="pt-16 mb-10 px-4 sm:px-6">
            <div className="mb-8 sm:mb-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold relative line-heading inline-block mb-3 sm:mb-4">Skills & Tech Stack</h3>
                <span className="text-2xl sm:text-3xl ml-1 sm:ml-2">🚀</span>
            </div>
            <ContentSkillList skills={skills} />
        </div>
    )
}

export default ContentSkill;