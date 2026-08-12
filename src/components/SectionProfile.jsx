import { useEffect, useState } from "react";
import Starfield from "./Starfield";

const words = [
    "Software Engineer",
    "Backend Developer",
    "Fullstack Developer",
    "Web Developer",
];

const SectionProfile = () => {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let timeout;

        if (isTyping) {
        if (charIndex < words[wordIndex].length) {
            timeout = setTimeout(() => {
            setText((prev) => prev + words[wordIndex][charIndex]);
            setCharIndex(charIndex + 1);
            }, 50);
        } else {
            timeout = setTimeout(() => setIsTyping(false), 2000);
        }
        } else {
        if (charIndex > 0) {
            timeout = setTimeout(() => {
            setText((prev) => prev.slice(0, -1));
            setCharIndex(charIndex - 1);
            }, 50);
        } else {
            setIsTyping(true);
            setWordIndex((prev) => (prev + 1) % words.length);
        }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isTyping, wordIndex]);

    return (
        <section
            id="profile"
            className="w-full min-h-screen flex items-center relative overflow-hidden"
            style={{ backgroundImage: `url("https://www.dropbox.com/scl/fi/chofoaykmx3tpe05su51h/banner-bg.webp?rlkey=cmxv08hz6d5v92vqz7lavbfgu&st=7f35hfa4&raw=1")` }}
        >
            <Starfield direction="up-right" density={0.9} meteorRate={1} maxMeteors={3} />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div id="profile-description" className="min-h-screen flex flex-col justify-center items-center py-20">
                    {/* Main Content */}
                    <div className="mb-4 text-center px-4 animate-fade-in">
                        {/* Greeting Badge */}
                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 backdrop-blur-sm mb-4">
                            <span className="text-2xl">👋</span>
                            <span className="text-sm sm:text-base font-medium text-gray-200">Hello, I'm</span>
                        </div>
                        
                        {/* Name */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 drop-shadow-2xl">
                                Mochammad Yoga Firnanda
                            </span>
                        </h1>
                        
                        {/* Typing Role */}
                        <div className="text-xl sm:text-2xl md:text-3xl mb-6 min-h-[2.5rem] flex items-center justify-center">
                            <span className="text-gray-300">I'm a </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500 font-bold ml-2">{text}</span>
                            <span className="blinking-cursor text-fuchsia-500 font-thin">|</span>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-row gap-3 sm:gap-5 w-full sm:w-auto px-4 mb-8">
                        <a href="https://www.dropbox.com/scl/fi/ahufskp7jfwj94j2mw9nw/CV_Mochammad-Yoga-Firnanda_2025-2.pdf?rlkey=nb77v7zb00wcgu41o0zavs9y7&st=9994cz18&raw=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial">
                            <button type="button" className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl hover:shadow-lg hover:shadow-pink-500/50 font-medium rounded-lg px-4 sm:px-8 py-3.5 text-center transition-all duration-300 transform hover:scale-105">
                                <span className="flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg">
                                    <i className="ri-download-2-line text-lg sm:text-xl"></i>
                                    <p>Download CV</p>
                                </span>
                            </button>
                        </a>
                        <a href="#contact" className="flex-1 sm:flex-initial">
                            <button type="button" className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l hover:shadow-lg hover:shadow-purple-500/50 font-medium rounded-lg px-4 sm:px-8 py-3.5 text-center transition-all duration-300 transform hover:scale-105">
                                <span className="flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg">
                                    <i className="ri-mail-send-line text-lg sm:text-xl"></i>
                                    <p>Contact Me</p>
                                </span>
                            </button>
                        </a>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 animate-fade-in-delay">
                        <a href="https://github.com/myfirnanda" target="_blank" rel="noopener noreferrer" 
                           className="w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 hover:border-purple-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 group">
                            <i className="ri-github-fill text-xl text-gray-400 group-hover:text-purple-500 transition-colors"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/mochammad-yoga-firnanda/" target="_blank" rel="noopener noreferrer" 
                           className="w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 hover:border-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 group">
                            <i className="ri-linkedin-fill text-xl text-gray-400 group-hover:text-blue-500 transition-colors"></i>
                        </a>
                        <a href="https://www.instagram.com/firnanda.dev/" target="_blank" rel="noopener noreferrer" 
                           className="w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 hover:border-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 group">
                            <i className="ri-instagram-line text-xl text-gray-400 group-hover:text-pink-500 transition-colors"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionProfile;