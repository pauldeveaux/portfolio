"use client";
import Section, {SectionProps} from "@/components/ui/Section";
import Carousel from "@/components/ui/carousel/Carousel";
import {CarouselCardProps} from "@/components/ui/carousel/CarouselCard";


interface SkillSectionProps extends SectionProps {
    section_title: string;
    skills: Array<CarouselCardProps>;
}

export default function SkillsSection({ section_title,  skills, ...sectionProps }: SkillSectionProps) {

    return (
        <Section {...sectionProps}>
            <div className="pt-16 overflow-hidden">
                <h2 className="text-3xl font-bold mb-8 text-center justify-center">{section_title}</h2>

                < Carousel cards={ skills } />
            </div>
        </Section>

    );
}
