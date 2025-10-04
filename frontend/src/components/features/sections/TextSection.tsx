import Section, { SectionProps } from "@/components/ui/layout/Section";

/**
 * Props for the TextSection component.
 *
 * @extends SectionProps - Inherits layout and styling props from Section.
 * @property {string} title - Section title displayed at the top.
 * @property {string} text - Paragraph text content of the section.
 */
interface TextSectionProps extends SectionProps {
    title: string;
    text: string;
}

/**
 * TextSection Component
 *
 * Renders a titled section with a block of text.
 */
export default function TextSection({ title, text, ...sectionProps }: TextSectionProps) {
    return (
        <Section {...sectionProps}>
            {/* Container with vertical layout and spacing */}
            <div className="h-full flex flex-col items-center justify-start text-center gap-15 p-10 sm:p-20">

                {/* Section title */}
                <h2 className="text-5xl font-bold mb-4">{title}</h2>

                {/* Text content */}
                <div className="text-lg whitespace-pre-line">
                    {text}
                </div>
            </div>
        </Section>
    );
}
