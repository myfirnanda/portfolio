import { useState } from 'react';

const ContentExperienceItem = ({ image, title, position, status, companyName, companyLink, startDate, endDate, techStack, description, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // design.md locks a single accent hue across the whole page. This used to
    // rotate through cyan/teal/emerald/amber per card index -- that rotation
    // was itself the violation, not just the raw Tailwind colours inside it.
    const colorScheme = {
        dot: 'bg-accent-strong',
        border: 'border-accent/50',
        shadow: 'shadow-accent/20',
        badge: 'bg-accent/50 border-accent/50',
        text: 'text-accent',
        bullet: 'bg-accent-strong',
    };
    
    return (
        <div className="relative group">
            {/* Timeline Dot */}
            <div className={`hidden md:flex absolute left-6 top-6 w-5 h-5 ${colorScheme.dot} rounded-card border-4 border-bg z-10 group-hover:scale-125 transition-transform duration-300 shadow-lg`}></div>
            
            {/* Card */}
            <div className={`md:ml-16 bg-surface rounded-card p-5 sm:p-6 md:p-8 border border-line hover:${colorScheme.border} transition-all duration-300 hover:shadow-2xl hover:${colorScheme.shadow}`}>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4">
                    <div className="flex-1">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-fg mb-2">
                            {position}
                        </h4>
                        <a href={companyLink} 
                           target="_blank" 
                           rel="noreferrer" 
                           className={`inline-flex items-center gap-2 text-base sm:text-lg ${colorScheme.text} hover:underline transition-all duration-200 group/link`}>
                            <i className="ri-building-line"></i>
                            <span className="font-semibold">{companyName}</span>
                            <i className="ri-external-link-line text-sm opacity-0 group-hover/link:opacity-100 transition-opacity"></i>
                        </a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-card ${colorScheme.badge} border text-xs sm:text-sm font-semibold`}>
                            <i className="ri-time-line"></i>
                            <span>{status}</span>
                        </div>
                    </div>
                </div>
                
                {/* Date */}
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-line/50">
                    <i className="ri-calendar-line text-fg-muted"></i>
                    <span className="text-sm sm:text-base text-fg-muted">{startDate} - {endDate}</span>
                </div>
                
                {/* Job Description - Collapsible */}
                {description && description.length > 0 && (
                    <div className="mb-6">
                        {/* Dropdown Trigger. affordance-pulse is a slow accent
                            breathing border/glow -- signals "clickable" before
                            the visitor ever hovers it. Drops once opened; the
                            visitor has already found it by then. */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`w-full flex items-center justify-between gap-2 p-3 rounded-card bg-raised/50 hover:bg-surface transition-all duration-200 group/dropdown border border-transparent ${!isExpanded ? 'affordance-pulse' : ''}`}
                        >
                            <div className="flex items-center gap-2">
                                <i className="ri-file-list-3-line text-lg text-fg-muted group-hover/dropdown:text-fg-muted"></i>
                                <h5 className="text-sm font-semibold text-fg-muted group-hover/dropdown:text-fg">Key Responsibilities</h5>
                                {/* <span className="text-xs text-fg-subtle group-hover/dropdown:text-fg-muted">
                                    ({description.length} items)
                                </span> */}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-fg-subtle group-hover/dropdown:text-fg-muted hidden sm:inline">
                                    {isExpanded ? 'Click to hide' : 'Click to view'}
                                </span>
                                <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-xl ${colorScheme.text} transition-transform duration-200 ${isExpanded ? 'rotate-0' : ''}`}></i>
                            </div>
                        </button>
                        
                        {/* Dropdown Content */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                            <ul className="space-y-2.5 pl-3">
                                {description.map((desc, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-fg-muted leading-relaxed">
                                        <div className={`w-1.5 h-1.5 ${colorScheme.bullet} rounded-card mt-2 flex-shrink-0`}></div>
                                        <span>{desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                
                {/* Tech Stack */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <i className="ri-code-s-slash-line text-lg text-fg-muted"></i>
                        <h5 className="text-sm font-semibold text-fg-muted">Tech Stack:</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((stack, idx) => {
                            return (
                                <span key={idx} className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-card ${colorScheme.badge} border transition-all duration-200 hover:scale-105`}>
                                    {stack}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentExperienceItem;