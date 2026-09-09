import { useState, useEffect } from 'react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-accent-strong hover:from-accent hover:to-accent text-on-accent rounded-card shadow-lg hover:shadow-accent/20 transition-all duration-300 flex items-center justify-center group hover:scale-110"
                    aria-label="Back to top" title='Back to Top'
                >
                    <i className="ri-rocket-2-fill text-2xl transition-transform duration-300 transform group-hover:-translate-y-1"></i>
                </button>
            )}
        </>
    );
};

export default BackToTop;
