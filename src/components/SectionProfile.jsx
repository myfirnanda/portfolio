import { useEffect, useState } from "react";

const SectionProfile = () => {
    const words = [
        "Software Engineer",
        "Backend Developer",
        "Fullstack Developer",
        "Web Developer",
    ];
    
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
            className="w-full h-screen"
            style={{ backgroundImage: `url("https://www.dropbox.com/scl/fi/chofoaykmx3tpe05su51h/banner-bg.webp?rlkey=cmxv08hz6d5v92vqz7lavbfgu&st=7f35hfa4&raw=1")` }}
        >
            <div className="container mx-auto px-4">
                <div id="profile-description" className="h-screen flex flex-col justify-center items-center">
                <div className="mb-6">
                    <h6 className="text-2xl text-right">Hello, it's Me 👋</h6>
                    <h3 className="text-6xl">Mochammad Yoga Firnanda</h3>
                    <h6 className="text-2xl typing-animation text-left">
                    And I'm a <span>{text}</span>
                    <span className="blinking-cursor">|</span>
                    </h6>

                </div>
                <div className="flex gap-5">
                    <a href="https://www.dropbox.com/scl/fi/ahufskp7jfwj94j2mw9nw/CV_Mochammad-Yoga-Firnanda_2025-2.pdf?rlkey=nb77v7zb00wcgu41o0zavs9y7&st=9994cz18&raw=1"
                        target="_blank"
                        rel="noopener noreferrer">
                    <button type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 p-1 text-center me-2 mb-2">
                        <span className="relative p-2 text-sm transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 flex items-center gap-2 text-lg text-white">
                            <i className="ri-download-2-line"></i>
                            <p className="text-base">Get CV</p>
                        </span></button>
                    </a>
                    <a href="#contact">
                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm p-1 text-center me-2 mb-2">
                            <span className="relative p-2 text-sm transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 flex items-center gap-2 text-lg text-white">
                                <i className="ri-phone-fill"></i>
                                <p className="text-base">Reach Me</p>
                            </span>
                        </button>
                    </a>
                </div>
                </div>
            </div>
        </section>
    )
}

export default SectionProfile;