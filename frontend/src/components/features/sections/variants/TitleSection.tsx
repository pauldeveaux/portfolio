"use client";

import Section, {SectionProps} from "@/components/features/sections/Section";


interface TitleSectionProps extends SectionProps {
    title: string
    description: string
}

export default function TitleSection({ title, description, ...sectionProps}: TitleSectionProps) {
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