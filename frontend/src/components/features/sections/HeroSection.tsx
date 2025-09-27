"use client";

import Section, {SectionProps} from "@/components/ui/Section";
import {ArrowDown} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {motion, animate} from "motion/react";
import {useHeaderHeight} from "@/utils/headerHeight";
import ClientParticles from "@/components/ui/ClientParticle";


interface HeroSectionProps extends SectionProps {
    title: string
    description: string
}

export default function HeroSection({title, description, ...sectionProps}: HeroSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const {className: sectionClassName, ...restSectionProps} = sectionProps;
    const headerHeight = useHeaderHeight();

    const [heroHeight, setHeroHeight] = useState("100vh");

    useEffect(() => {
        if (headerHeight) {
            setHeroHeight(`calc(100vh - ${headerHeight}px)`);
        }
    }, [headerHeight]);


    const scrollToNextSection = () => {
        const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
        if (!next) return;

        const target = next.offsetTop - headerHeight;

        animate(window.scrollY, target, {
            duration: 1.5,
            onUpdate: (value) => window.scrollTo(0, value),
            ease: "easeInOut",
        });
    };


    return (
        <Section ref={sectionRef}
                 className={`relative overflow-hidden ${sectionClassName ?? ""}`}
                 style={{height: heroHeight}}
                 {...restSectionProps}
        >
            {/* Particles */}
            <ClientParticles className="absolute inset-0 z-0 pointer-events-none" />


            <div
                className="relative z-10 h-full flex flex-col items-center justify-start text-center pt-40 gap-15"
            >
                <h2 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg repulse-div">{title}</h2>
                <div className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl repulse-div">
                    {description}
                </div>
            </div>

            {/* Scroll Down */}
            <motion.button
                onClick={scrollToNextSection}
                className="
                absolute z-10 bottom-6 left-1/2 -translate-x-1/2
                bg-gradient-to-r from-[#E0F7F7] via-[#B2FFFF] to-[#A0FFFF]
                text-[#107E7D]
                p-3 rounded-full
                shadow-xl shadow-[#107E7D]/40
                border-2 border-white/50
                hover:scale-110 hover:shadow-2xl
                transition-all duration-300
                "
                animate={{
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }}
            >
                <ArrowDown size={24}/>
            </motion.button>

        </Section>
    );
}