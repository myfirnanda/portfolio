import { useEffect, useMemo, useState } from "react";
import ShapeGrid from "./ShapeGrid";
import { useTheme } from "../utils/useTheme";

// ctx.strokeStyle cannot read a Tailwind class, so the canvas resolves the
// tokens itself at paint time. Reading them beats copying hex values here: a
// literal copy silently drifts the moment tokens.css changes.
const tokenColor = (name, alpha = 1) => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return raw ? `oklch(${raw} / ${alpha})` : "transparent";
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
    // Re-read on every theme change; the toggle swaps the variables, not the DOM.
    // Dark mode's border used to read --color-ink-2 -- a neutral, near-zero-
    // chroma text token -- while hover read full --color-accent. Same
    // lightness band, wildly different chroma (0.015 vs 0.155): a washed-out
    // grey grid with a single hyper-saturated hexagon popping out on hover.
    // Dark's border is now the accent itself, dimmed via alpha, so idle and
    // hover read as one hue at two intensities. Light mode already read fine
    // on ink-2 -- left untouched, this is a dark-only fix.
    const gridColors = useMemo(
        () => (isDark
            ? { border: tokenColor("--color-accent", 0.7), hover: tokenColor("--color-accent") }
            : { border: tokenColor("--color-ink-2"), hover: tokenColor("--color-accent") }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isDark]
    );

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
            className="w-full relative overflow-hidden bg-paper-2"
        >
            {/* Tier-A enrichment: the hexagon canvas is the right half of the
                diptych. No bloom -- editorial does not do radial glows. */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-[1]">
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

            {/* 15 - Split Studio. Text holds the left half, the canvas the
                right, divided by a hairline rather than a gradient fade. */}
            <div className="w-full relative z-10 pointer-events-none">
                <div id="profile-description" className="grid grid-cols-1 lg:grid-cols-2 min-h-[100dvh]">
                    <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:pl-16 py-28 bg-paper-2 lg:border-r border-rule">
                        <p className="meta mb-6">Backend / Fullstack &middot; Est. 2023</p>

                        <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] mb-6">
                            Mochammad<br />Yoga Firnanda
                        </h1>

                        <p className="text-lg sm:text-xl text-ink-2 max-w-[45ch] mb-10">
                            I build the parts of the web people do not see. Currently working as{' '}
                            <span className="text-accent font-semibold">{text}</span>
                            <span className="blinking-cursor text-accent font-thin">|</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
                            <a href="https://www.dropbox.com/scl/fi/ahufskp7jfwj94j2mw9nw/CV_Mochammad-Yoga-Firnanda_2025-2.pdf?rlkey=nb77v7zb00wcgu41o0zavs9y7&st=9994cz18&raw=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-ink font-semibold rounded-card px-7 py-3.5 transition-transform duration-200 hover:-translate-y-[2px] active:translate-y-0">
                                <i className="ri-download-2-line text-lg"></i>
                                Download CV
                            </a>
                            <a href="#contact"
                                className="inline-flex items-center justify-center gap-2 border border-rule text-ink hover:border-accent hover:text-accent font-semibold rounded-card px-7 py-3.5 transition-colors duration-200">
                                <i className="ri-mail-send-line text-lg"></i>
                                Get in touch
                            </a>
                        </div>

                        <ul className="flex gap-6 mt-12 pointer-events-auto">
                            {[
                                { href: 'https://github.com/myfirnanda', label: 'GitHub' },
                                { href: 'https://www.linkedin.com/in/mochammad-yoga-firnanda/', label: 'LinkedIn' },
                                { href: 'https://www.instagram.com/firnanda.dev/', label: 'Instagram' },
                            ].map((s) => (
                                <li key={s.label}>
                                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                                       className="font-mono text-xs tracking-[0.06em] uppercase text-ink-2 hover:text-accent border-b border-transparent hover:border-accent transition-colors">
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="hidden lg:block" aria-hidden="true"></div>
                </div>
            </div>
        </section>
    )
}

export default SectionProfile;