import ContentCertificateItem from "./ContentCertificateItem";

const ContentCertificateList = ({ certificates }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
            {certificates.map((item, index) => (
                <ContentCertificateItem
                    key={index}
                    index={index}
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