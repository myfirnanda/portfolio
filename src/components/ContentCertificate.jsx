import ContentCertificateList from "./ContentCertificateList";
import { personalData } from "../utils/personalData";

const ContentCertificate = () => {
    return (
        <div id="certificate" className="pt-16 mb-10 px-4 sm:px-6">
            <div className="mb-8 sm:mb-10">
                <p className="meta mb-3">06</p>
                <h3 className="text-xl sm:text-2xl">Certificates</h3>
                <span className="text-2xl sm:text-3xl ml-1 sm:ml-2">✨</span>
            </div>
            <ContentCertificateList certificates={personalData.certificates} />
        </div>
    );
};

export default ContentCertificate;