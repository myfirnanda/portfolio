const ContentSkillItem = ({ image, name, width, height }) => {
    return (
        <div className="group relative flex items-center justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-zinc-800/50 rounded-lg p-2 sm:p-2.5 md:p-3 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-fuchsia-500/20">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
            </div>
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                {name}
            </span>
        </div>
    )
}

export default ContentSkillItem