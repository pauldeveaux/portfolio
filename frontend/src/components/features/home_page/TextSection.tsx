import Section, {SectionProps} from "@/components/ui/miscellaneous/Section";


interface TextSectionProps extends SectionProps {
    title: string;
    text: string;
}

export default function TextSection( {title, text, ...sectionProps}: TextSectionProps) {
    return (
        <Section {...sectionProps}>
            <div className="h-full flex flex-col items-center justify-start text-center gap-15 p-10 sm:p-20">
                <h2 className="text-5xl font-bold mb-4">{title}</h2>
                <div className="text-lg whitespace-pre-line">
                    {text}
                </div>
            </div>
        </Section>
    );
}