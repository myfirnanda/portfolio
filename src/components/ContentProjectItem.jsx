import { useState, useEffect } from 'react';

const ContentProjectItem = ({ image, images = [], title, link, description, detailedDescription, features = [], techStack, linkGithub, linkPreview, index, role, duration }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };
        
        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);
    
    const projectImages = images.length > 0 ? images : [image];
    // Color schemes for variety
    const colorSchemes = [
        { accent: 'from-pink-500 to-rose-500', border: 'border-pink-500/50', shadow: 'shadow-pink-500/30', text: 'text-pink-500' },
        { accent: 'from-purple-500 to-violet-500', border: 'border-purple-500/50', shadow: 'shadow-purple-500/30', text: 'text-purple-500' },
        { accent: 'from-fuchsia-500 to-pink-500', border: 'border-fuchsia-500/50', shadow: 'shadow-fuchsia-500/30', text: 'text-fuchsia-500' },
        { accent: 'from-blue-500 to-cyan-500', border: 'border-blue-500/50', shadow: 'shadow-blue-500/30', text: 'text-blue-500' },
        { accent: 'from-violet-500 to-purple-500', border: 'border-violet-500/50', shadow: 'shadow-violet-500/30', text: 'text-violet-500' },
    ];
    const colorScheme = colorSchemes[index % colorSchemes.length];
    
    return (
        <>
        <div className="group h-full cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <div className={`h-full rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800/50 border border-zinc-700 hover:${colorScheme.border} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:${colorScheme.shadow} flex flex-col`}>
                {/* Image Container */}
                <div className="relative overflow-hidden">
                    <img 
                        className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={image} 
                        alt={title} 
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Click to View Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-3">
                            <span className="text-white font-medium flex items-center gap-2">
                                <i className="ri-eye-line text-xl"></i>
                                View Details
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h5 className={`text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 min-h-[3rem] group-hover:${colorScheme.text} transition-colors duration-300`}>
                        {title}
                    </h5>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow">{description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {techStack.slice(0, 4).map((stack, idx) => (
                            <span 
                                key={idx}
                                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 hover:border-fuchsia-500/50 transition-colors duration-200"
                            >
                                {stack}
                            </span>
                        ))}
                        {techStack.length > 4 && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-400">
                                +{techStack.length - 4}
                            </span>
                        )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-zinc-700/50">
                        {linkPreview !== '' && (
                            <a href={linkPreview} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
                                <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]">
                                    <i className="ri-external-link-line text-base"></i>
                                    <span>Live Demo</span>
                                </button>
                            </a>
                        )}
                        {linkGithub !== '' && (
                            <a href={linkGithub} target="_blank" rel="noopener noreferrer" className={linkPreview !== '' ? 'flex-1' : 'w-full'} onClick={(e) => e.stopPropagation()}>
                                <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-purple-500/50 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                                    <i className="ri-github-fill text-base"></i>
                                    <span>Code</span>
                                </button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
        {/* Modal Popup */}
        {isModalOpen && (
            <div 
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn"
                onClick={() => setIsModalOpen(false)}
            >
                <div 
                    className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl border border-zinc-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-500 border border-zinc-700 hover:border-red-500 flex items-center justify-center transition-all duration-300 group"
                    >
                        <i className="ri-close-line text-2xl text-white"></i>
                    </button>
                    
                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8">
                        {/* Left: Image Gallery */}
                        <div className="space-y-4 md:sticky md:top-6 md:self-start">
                            {/* Main Image */}
                            <div className="relative overflow-hidden rounded-xl border border-zinc-700">
                                <img
                                    src={projectImages[selectedImage]}
                                    alt={title}
                                    className="w-full h-64 sm:h-80 object-cover"
                                />
                            </div>
                            
                            {/* Thumbnail Gallery */}
                            {projectImages.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {projectImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                                selectedImage === idx 
                                                    ? `${colorScheme.border} shadow-lg` 
                                                    : 'border-zinc-700 hover:border-zinc-600'
                                            }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${title} ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Right: Project Details */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-2 ${colorScheme.text}`}>
                                    {title}
                                </h2>
                                {role && duration && (
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <i className="ri-user-line"></i>
                                            {role}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <i className="ri-time-line"></i>
                                            {duration}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                    <i className={`ri-file-text-line ${colorScheme.text}`}></i>
                                    Overview
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {detailedDescription || description}
                                </p>
                            </div>
                            
                            {/* Features */}
                            {features.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                        <i className={`ri-checkbox-circle-line ${colorScheme.text}`}></i>
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                <i className={`ri-arrow-right-s-line ${colorScheme.text} text-xl flex-shrink-0 mt-0.5`}></i>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {/* Tech Stack */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <i className={`ri-code-s-slash-line ${colorScheme.text}`}></i>
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((stack, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 text-sm font-medium"
                                        >
                                            {stack}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Action Links */}
                            <div className="flex gap-3 pt-4">
                                {linkPreview !== '' && (
                                    <a href={linkPreview} target="_blank" rel="noopener noreferrer" className="flex-1">
                                        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                                            <i className="ri-external-link-line text-lg"></i>
                                            <span>View Live Demo</span>
                                        </button>
                                    </a>
                                )}
                                {linkGithub !== '' && (
                                    <a href={linkGithub} target="_blank" rel="noopener noreferrer" className={linkPreview !== '' ? 'flex-1' : 'w-full'}>
                                        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-purple-500/50 text-white font-semibold transition-all duration-300">
                                            <i className="ri-github-fill text-lg"></i>
                                            <span>View Code</span>
                                        </button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ContentProjectItem;