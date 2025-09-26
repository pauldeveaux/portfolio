"use client";

import Section, {SectionProps} from "@/components/ui/Section";
import {ArrowDown} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {motion, animate} from "motion/react";
import { useHeaderHeight } from "@/utils/headerHeight";


interface HeroSectionProps extends SectionProps {
    title: string
    description: string
}

export default function HeroSection({ title, description, ...sectionProps}: HeroSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { className: sectionClassName, ...restSectionProps } = sectionProps;
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
                 className={`relative ${sectionClassName ?? ""}`}
                 style={{ height: heroHeight }}
                 {...restSectionProps}
        >
            <div  className="h-full flex flex-col items-center justify-start text-center pt-40 gap-15 ">
                <h2 className="text-7xl font-bold mb-4">{title}</h2>
                <div className="text-lg max-w-2xl">
                    {description}
                </div>
            </div>

            {/* Scroll Down */}
            <motion.button
                onClick={scrollToNextSection}
                className="absolute bottom-2 left-1/2 transform bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:cursor-pointer"
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
                <ArrowDown size={24} />
            </motion.button>

        </Section>
    );
}