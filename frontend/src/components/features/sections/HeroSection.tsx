"use client";

import Section, { SectionProps } from "@/components/ui/layout/Section";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, animate } from "motion/react";
import { useHeaderHeight } from "@/components/features/hooks/useHeaderHeight";
import ButtonLink from "@/components/ui/buttons/ButtonLink";

/**
 * Props for the HeroSection component.
 *
 * @extends SectionProps - Inherits layout and styling props from Section.
 * @property {string} title - The main title displayed in the hero section.
 * @property {string} description - A short description displayed under the title.
 */
interface HeroSectionProps extends SectionProps {
    title: string;
    description: string;
}

/**
 * HeroSection Component
 *
 * Full-screen hero section with title, description, call-to-action buttons, and animated scroll-down indicator.
 * Adjusts height based on header size and smooth-scrolls to the next section.
 */
export default function HeroSection({ title, description, ...sectionProps }: HeroSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { className: sectionClassName, ...restSectionProps } = sectionProps;
    const headerHeight = useHeaderHeight();
    const [heroHeight, setHeroHeight] = useState("100vh");

    // Adjust hero height when header height is available
    useEffect(() => {
        if (headerHeight) {
            setHeroHeight(`calc(100vh - ${headerHeight}px)`);
        }
    }, [headerHeight]);

    // Scroll smoothly to the "about" section
    const scrollToNextSection = () => {
        const targetSection = document.getElementById("about");
        if (!targetSection) return;

        const isMobile = window.innerWidth < 768;
        const offset = isMobile ? 0 : headerHeight;
        const target = targetSection.offsetTop - offset;

        animate(window.scrollY, target, {
            duration: 1.5,
            onUpdate: (value) => window.scrollTo(0, value),
            ease: "easeInOut",
        });
    };

    return (
        <Section
            ref={sectionRef}
            className={`relative overflow-hidden ${sectionClassName ?? ""}`}
            style={{ height: heroHeight }}
            {...restSectionProps}
        >
            {/* Hero content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 gap-15 md:px-8">
                <h2 className="relative text-5xl md:text-6xl font-extrabold drop-shadow-lg">{title}</h2>
                <div className="relative mt-4 text-lg md:text-xl text-font-light-2 max-w-xl">
                    {description}
                </div>

                {/* Call-to-action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 relative">
                    <ButtonLink
                        href="chat"
                        className="px-8 py-4 backdrop-blur-sm rounded-xl
                            bg-button-light-1/90  border-button-light-1/50  text-main-3  font-semibold
                            hover:bg-button-light hover:scale-105 hover:shadow-2xl hover:shadow-main-3/20
                            transition-all duration-300 flex items-center justify-center gap-3 shadow-lg border"
                    >
                        <MessageCircle size={22} />
                        Parlez à mon IA
                    </ButtonLink>
                    <ButtonLink
                        href="portfolio"
                        className="px-8 py-4 backdrop-blur-sm border-2
                        bg-main-3/20  border-button-light-1/40 text-font-light-1
                        hover:bg-[#107E7D]/40 hover:border-white/60 hover:scale-105 hover:shadow-xl
                        rounded-xl font-semibold  transition-all duration-300"
                        block={"start"}
                    >
                        Voir mes projets
                    </ButtonLink>
                </div>
            </div>

            {/* Animated scroll-down button */}
            <motion.button
                onClick={scrollToNextSection}
                className="
                    absolute z-10 bottom-6 left-1/2 -translate-x-1/2
                    bg-gradient-to-r from-white via-[#B2FFFF] to-[#A0FFFF]
                    text-main-3
                    p-3 rounded-full
                    shadow-xl shadow-[#107E7D]/40
                    border-2 border-white/50
                    hover:scale-110 hover:shadow-2xl hover:cursor-pointer
                    transition-all duration-300
                "
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            >
                <ArrowDown size={24} />
            </motion.button>
        </Section>
    );
}
