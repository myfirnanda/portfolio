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
    // Single locked accent per design.md -- no per-card hue rotation.
    const colorScheme = {
        border: 'border-accent/50',
        shadow: 'shadow-accent/20',
        text: 'text-accent',
    };
    
    return (
        <>
        <div className="group h-full cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <div className={`h-full rounded-card bg-surface border border-line hover:${colorScheme.border} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:${colorScheme.shadow} flex flex-col`}>
                {/* Image Container */}
                <div className="relative overflow-hidden">
                    <img 
                        className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={image} 
                        alt={title} 
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Click to View Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-bg/60 rounded-card px-6 py-3">
                            <span className="text-fg font-medium flex items-center gap-2">
                                <i className="ri-eye-line text-xl"></i>
                                View Details
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h5 className={`text-lg sm:text-xl font-bold text-fg mb-2 line-clamp-2 min-h-[3rem] group-hover:${colorScheme.text} transition-colors duration-300`}>
                        {title}
                    </h5>
                    
                    {/* Description */}
                    <p className="text-sm text-fg-muted line-clamp-3 mb-4 flex-grow">{description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {techStack.slice(0, 4).map((stack, idx) => (
                            <span 
                                key={idx}
                                className="text-xs font-semibold px-2.5 py-1 rounded-card bg-surface border border-line text-fg-muted hover:border-accent/50 transition-colors duration-200"
                            >
                                {stack}
                            </span>
                        ))}
                        {techStack.length > 4 && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-card bg-surface border border-line text-fg-muted">
                                +{techStack.length - 4}
                            </span>
                        )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-line/50">
                        {linkPreview !== '' && (
                            <a href={linkPreview} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
                                <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-accent-strong hover:from-accent hover:to-accent text-on-accent font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]">
                                    <i className="ri-external-link-line text-base"></i>
                                    <span>Live Demo</span>
                                </button>
                            </a>
                        )}
                        {linkGithub !== '' && (
                            <a href={linkGithub} target="_blank" rel="noopener noreferrer" className={linkPreview !== '' ? 'flex-1' : 'w-full'} onClick={(e) => e.stopPropagation()}>
                                <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-surface hover:bg-raised border border-line hover:border-accent/50 text-fg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
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
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg/90 p-4 animate-fadeIn"
                onClick={() => setIsModalOpen(false)}
            >
                <div 
                    className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-surface rounded-card border border-line"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-card bg-surface hover:bg-red-500 border border-line hover:border-red-500 flex items-center justify-center transition-all duration-300 group"
                    >
                        <i className="ri-close-line text-2xl text-fg"></i>
                    </button>
                    
                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8">
                        {/* Left: Image Gallery */}
                        <div className="space-y-4 md:sticky md:top-6 md:self-start">
                            {/* Main Image */}
                            <div className="relative overflow-hidden rounded-card border border-line">
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
                                            className={`flex-shrink-0 w-20 h-20 rounded-card overflow-hidden border-2 transition-all duration-300 ${
                                                selectedImage === idx 
                                                    ? `${colorScheme.border} shadow-lg` 
                                                    : 'border-line hover:border-line'
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
                                <h2 className={`text-2xl sm:text-3xl font-bold text-fg mb-2 ${colorScheme.text}`}>
                                    {title}
                                </h2>
                                {role && duration && (
                                    <div className="flex flex-wrap gap-3 text-sm text-fg-muted">
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
                                <h3 className="text-lg font-semibold text-fg mb-2 flex items-center gap-2">
                                    <i className={`ri-file-text-line ${colorScheme.text}`}></i>
                                    Overview
                                </h3>
                                <p className="text-fg-muted leading-relaxed">
                                    {detailedDescription || description}
                                </p>
                            </div>
                            
                            {/* Features */}
                            {features.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-fg mb-3 flex items-center gap-2">
                                        <i className={`ri-checkbox-circle-line ${colorScheme.text}`}></i>
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-fg-muted">
                                                <i className={`ri-arrow-right-s-line ${colorScheme.text} text-xl flex-shrink-0 mt-0.5`}></i>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {/* Tech Stack */}
                            <div>
                                <h3 className="text-lg font-semibold text-fg mb-3 flex items-center gap-2">
                                    <i className={`ri-code-s-slash-line ${colorScheme.text}`}></i>
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((stack, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-3 py-1.5 rounded-card bg-surface border border-line text-fg-muted text-sm font-medium"
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
                                        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-card bg-accent-strong hover:from-accent hover:to-accent text-on-accent font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                                            <i className="ri-external-link-line text-lg"></i>
                                            <span>View Live Demo</span>
                                        </button>
                                    </a>
                                )}
                                {linkGithub !== '' && (
                                    <a href={linkGithub} target="_blank" rel="noopener noreferrer" className={linkPreview !== '' ? 'flex-1' : 'w-full'}>
                                        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-card bg-surface hover:bg-raised border border-line hover:border-accent/50 text-fg font-semibold transition-all duration-300">
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