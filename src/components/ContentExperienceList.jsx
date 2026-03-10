import { useState } from "react";
import ContentExperienceItem from "./ContentExperienceItem";

const ContentExperienceList = ({ experiences }) => {
    const [showAll, setShowAll] = useState(false);
    const INITIAL_DISPLAY_COUNT = 3;
    
    // Reverse array to show newest first
    const reversedExperiences = [...experiences].reverse();
    
    // Get experiences to display
    const displayedExperiences = showAll 
        ? reversedExperiences 
        : reversedExperiences.slice(0, INITIAL_DISPLAY_COUNT);
    
    // Check if there are more experiences to show
    const hasMore = reversedExperiences.length > INITIAL_DISPLAY_COUNT;
    
    return (
        <div className="relative space-y-8 sm:space-y-10">
            {/* Timeline Line - Gradient */}
            <div className="hidden md:block absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-pink-500 via-fuchsia-500 to-purple-500"></div>
            
            <div className="space-y-8">
                {displayedExperiences.map((experience, index) => {
                    return <ContentExperienceItem key={experience.id} index={index} {...experience} />
                })}
            </div>
            
            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:scale-105"
                    >
                        <i className={`ri-${showAll ? 'arrow-up' : 'arrow-down'}-s-line text-xl transition-transform duration-200`}></i>
                        <span>
                            {showAll 
                                ? 'Show Less' 
                                : `Load More Professional Experience (${reversedExperiences.length - INITIAL_DISPLAY_COUNT} more)`
                            }
                        </span>
                        <i className={`ri-${showAll ? 'arrow-up' : 'arrow-down'}-s-line text-xl transition-transform duration-200`}></i>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ContentExperienceList;