"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkillCard, {SkillCardProps} from "@/components/ui/SkillCard";
import Section, {SectionProps} from "@/components/features/sections/Section";


interface SkillSectionProps extends SectionProps {
    section_title: string;
    skills: Array<SkillCardProps>;
}

export default function SkillsSection({ section_title,  skills, ...sectionProps }: SkillSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect, and infinite loop
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        const firstCard = cardRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let scrollSpeed = 1;


        const scrollStep = () => {
            if(!scrollContainer || !firstCard) return;

            const cardWidth = firstCard.offsetWidth;

            const style = getComputedStyle(scrollContainer);
            const gap = parseFloat(style.columnGap || style.gap || "0");

            const scrollBreakpoint = (skills.length) * (cardWidth + gap);

            if (scrollContainer.scrollLeft >=  scrollBreakpoint) {
                scrollContainer.scrollLeft = scrollContainer.scrollLeft - scrollBreakpoint;
            }
            scrollContainer.scrollLeft += scrollSpeed;
            animationFrameId = requestAnimationFrame(scrollStep);
        }

        animationFrameId = requestAnimationFrame(scrollStep);


        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <Section {...sectionProps}>
            <div className="pt-16 overflow-hidden">
                <h2 className="text-3xl font-bold mb-8 text-center justify-center">{section_title}</h2>

                <div
                    ref={scrollRef}
                    className={`flex max-w-4xl mx-auto justify-start gap-6 py-12 overflow-x-hidden scrollbar-hide cursor-grab`}
                >
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div key={index} ref={index === 0 ? cardRef : null} className="shrink-0">
                            <SkillCard key={index} name={skill.name} description={skill.description}/>
                        </div>
                    ))}
                </div>
            </div>
        </Section>

    );
}
