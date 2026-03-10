import { useState, useEffect } from 'react';

const ContentCertificateItem = ({ image, title, source, link, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };
        
        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isModalOpen]);
    
    // Color variations for visual interest
    const colorSchemes = [
        { badge: 'from-pink-500 to-fuchsia-500', shadow: 'shadow-pink-500/30', border: 'border-pink-500/50' },
        { badge: 'from-fuchsia-500 to-purple-500', shadow: 'shadow-fuchsia-500/30', border: 'border-fuchsia-500/50' },
        { badge: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-500/30', border: 'border-purple-500/50' },
    ];
    const colorScheme = colorSchemes[index % colorSchemes.length];
    
    return (
        <>
        <div className="group relative">
            <div className={`h-full rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700 hover:${colorScheme.border} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:${colorScheme.shadow}`}>
                {/* Image Container with Overlay - Clickable */}
                <div 
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img
                        className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        src={image}
                        alt={title}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                    
                    {/* Badge on Image */}
                    <div className="absolute top-3 right-3">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${colorScheme.badge} text-white text-xs font-semibold shadow-lg backdrop-blur-sm`}>
                            <i className="ri-award-line text-sm"></i>
                            <span>Verified</span>
                        </div>
                    </div>
                    
                    {/* Zoom Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/60 backdrop-blur-sm rounded-full p-3">
                            <i className="ri-zoom-in-line text-2xl text-white"></i>
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6">
                    {/* Title */}
                    <h5 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 min-h-[2.5rem]">
                        {title}
                    </h5>
                    
                    {/* Source Badge */}
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                        <i className="ri-building-line text-base"></i>
                        <span className="text-sm font-medium">{source}</span>
                    </div>
                    
                    {/* View Certificate Button */}
                    {/* <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r ${colorScheme.badge} text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:${colorScheme.shadow} hover:scale-[1.02]`}>
                            <span>View Certificate</span>
                            <i className="ri-external-link-line text-base"></i>
                        </button>
                    </a> */}
                </div>
            </div>
        </div>
        
        {/* Modal Popup for Image */}
        {isModalOpen && (
            <div 
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn"
                onClick={() => setIsModalOpen(false)}
            >
                <div className="relative max-w-6xl w-full max-h-[90vh]">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute -top-12 right-0 flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
                    >
                        <span className="text-sm font-medium">Press ESC or Click to close</span>
                        <i className="ri-close-line text-3xl"></i>
                    </button>
                    
                    {/* Image */}
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                    
                    {/* Certificate Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                        <p className="text-gray-300 text-sm">{source}</p>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default ContentCertificateItem;
