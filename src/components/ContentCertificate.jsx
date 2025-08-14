import ContentCertificateList from "./ContentCertificateList";
import { personalData } from "../utils/personalData";

const ContentCertificate = () => {
    return (
        <div id="certificate" className="pt-16 mb-10">
            <h3 className="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Certificates</h3>
            <span className="text-3xl ml-1">✨</span>
            <ContentCertificateList certificates={personalData.certificates} />
        </div>
    );
};

export default ContentCertificate;