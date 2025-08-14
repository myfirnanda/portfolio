import ContentCertificateItem from "./ContentCertificateItem";

const ContentCertificateList = ({ certificates }) => {
    return (
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
            {certificates.map((item, index) => (
                <ContentCertificateItem
                    key={index}
                    image={item.image}
                    title={item.title}
                    source={item.source}
                    link={item.link}
                />
            ))}
        </div>
    );
};


export default ContentCertificateList;