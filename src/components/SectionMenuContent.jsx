import ContentCertificate from "./ContentCertificate";
import ContentContact from "./ContentContact";
import ContentEducation from "./ContentEducation";
import ContentExperience from "./ContentExperience";
import ContentProject from "./ContentProject";
import ContentSkill from "./ContentSkill";

import { personalData } from "../utils/personalData";

const SectionMenuContent = () => {
    return (
        <div id="content" className="col-span-9 w-full relative">
            <ContentExperience experiences={personalData.experiences} />
            <ContentSkill skills={personalData.skills} />
            <ContentEducation />
            <ContentProject projects={personalData.projects} />
            <ContentCertificate certificates={personalData.certificates} />
            <ContentContact />
        </div>
    )
}

export default SectionMenuContent;