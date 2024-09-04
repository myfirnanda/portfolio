import ContentCertificate from "./ContentCertificate";
import ContentContact from "./ContentContact";
import ContentEducation from "./ContentEducation";
import ContentExperience from "./ContentExperience";
import ContentProject from "./ContentProject";
import ContentSkill from "./ContentSkill";

const SectionMenuContent = () => {
    return (
        <div id="content" className="col-span-9 w-full relative">
            <ContentExperience />
            <ContentSkill />
            <ContentEducation />
            <ContentProject />
            <ContentCertificate />
            <ContentContact />
        </div>
    )
}

export default SectionMenuContent;