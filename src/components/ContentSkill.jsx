import ContentSkillList from "./ContentSkillList";

const ContentSkill = ({ skills }) => {
    return (
        <div id="skills" className="pt-16 mb-10 px-4 sm:px-6">
            <div className="mb-8 sm:mb-10">
                <p className="meta mb-3">04</p>
                <h3 className="text-xl sm:text-2xl flex items-center gap-2 sm:gap-3">
                    <span>Skills & Tech Stack</span>
                    <span className="text-2xl sm:text-3xl leading-none">🚀</span>
                </h3>
            </div>
            <ContentSkillList skills={skills} />
        </div>
    )
}

export default ContentSkill;