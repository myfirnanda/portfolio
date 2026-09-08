import { useEffect, useState } from "react";
import ShapeGrid from "./ShapeGrid";
import { useTheme } from "../utils/useTheme";

// The canvas paints with ctx.strokeStyle, which cannot read Tailwind classes,
// so the grid needs the palette as literal values. These mirror the emerald
// tokens in css/style.css -- keep them in step if those change.
const GRID_COLORS = {
    dark: { border: "#1e3a2e", hover: "#2de09a" },
    light: { border: "#b9d3c3", hover: "#046c4e" },
};

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
    const { isDark } = useTheme();
    const gridColors = isDark ? GRID_COLORS.dark : GRID_COLORS.light;

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
            className="w-full min-h-[100dvh] flex items-center relative overflow-hidden bg-bg"
        >
            {/* Accent bloom, sized in vw so it scales with the viewport */}
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[80vw] h-[55vw] max-w-[1000px] pointer-events-none z-[2]"
                style={{ background: 'radial-gradient(ellipse at 35% 50%, rgb(var(--accent) / 0.16), transparent 62%)' }}
            ></div>

            {/* Animated hexagon grid */}
            <div className="absolute inset-0 z-[1]">
                <ShapeGrid
                    shape="hexagon"
                    direction="diagonal"
                    speed={0.2}
                    squareSize={30}
                    borderColor={gridColors.border}
                    hoverFillColor={gridColors.hover}
                    hoverTrailAmount={3}
                />
            </div>

            {/* Asymmetric split: content holds the left 7 of 12 columns and the
                right stays open so the hexagon field reads as the visual half.
                taste-skill 4.3 bans a centred hero above DESIGN_VARIANCE 4. */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
                <div id="profile-description" className="min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 items-center py-24">
                    <div className="lg:col-span-7 animate-fade-in">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.05] tracking-tight text-fg">
                            Mochammad Yoga<br />Firnanda
                        </h1>

                        <p className="text-xl sm:text-2xl md:text-3xl mb-8 min-h-[2.5rem] text-fg-muted">
                            Building backends and the web, currently as{' '}
                            <span className="text-accent font-semibold">{text}</span>
                            <span className="blinking-cursor text-accent font-thin">|</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto">
                            <a href="https://www.dropbox.com/scl/fi/ahufskp7jfwj94j2mw9nw/CV_Mochammad-Yoga-Firnanda_2025-2.pdf?rlkey=nb77v7zb00wcgu41o0zavs9y7&st=9994cz18&raw=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 text-on-accent bg-accent-strong font-medium rounded-xl px-7 py-3.5 transition-transform duration-200 hover:-translate-y-[2px] active:translate-y-0">
                                <i className="ri-download-2-line text-xl"></i>
                                Download CV
                            </a>
                            <a href="#contact"
                                className="inline-flex items-center justify-center gap-2 text-fg border border-line hover:border-accent hover:text-accent font-medium rounded-xl px-7 py-3.5 transition-colors duration-200">
                                <i className="ri-mail-send-line text-xl"></i>
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Social rail: icons, not a fourth text block, kept out of the
                        hero stack so the headline reads as one moment. */}
                    <div className="lg:col-span-5 flex lg:justify-end gap-3 mt-12 lg:mt-0 pointer-events-auto">
                        {[
                            { href: 'https://github.com/myfirnanda', icon: 'ri-github-fill', label: 'GitHub' },
                            { href: 'https://www.linkedin.com/in/mochammad-yoga-firnanda/', icon: 'ri-linkedin-fill', label: 'LinkedIn' },
                            { href: 'https://www.instagram.com/firnanda.dev/', icon: 'ri-instagram-line', label: 'Instagram' },
                        ].map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                               className="w-12 h-12 rounded-full bg-surface/70 backdrop-blur-sm border border-line hover:border-accent flex items-center justify-center transition-colors duration-200 group">
                                <i className={`${s.icon} text-xl text-fg-muted group-hover:text-accent transition-colors`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionProfile;