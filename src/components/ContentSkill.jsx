import ContentSkillList from "./ContentSkillList";

const ContentSkill = ({ skills }) => {
    return (
        <div id="skills" className="pt-16 mb-10">
            <h3 className="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Skills & Tech Stack</h3>
            <span className="text-3xl ml-1">🚀</span>
            <ContentSkillList skills={skills} />
        </div>
    )
}

export default ContentSkill;