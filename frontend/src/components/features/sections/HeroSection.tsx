"use client";

import Section, {SectionProps} from "@/components/ui/Section";


interface HeroSectionProps extends SectionProps {
    title: string
    description: string
}

export default function HeroSection({ title, description, ...sectionProps}: HeroSectionProps) {
    return (
        <Section {...sectionProps}>
            <div  className="h-full flex flex-col items-center justify-start text-center pt-40 gap-15 ">
                <h2 className="text-5xl font-bold mb-4">{title}</h2>
                <div className="text-lg max-w-2xl">
                    {description}
                </div>
            </div>
        </Section>
    );
}