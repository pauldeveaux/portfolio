import Section, {SectionProps} from "@/components/ui/Section";


interface TextSectionProps extends SectionProps {
    title: string;
    text: string;
}

export default function TextSection( {title, text, ...sectionProps}: TextSectionProps) {
    return (
        <Section {...sectionProps}>
            <div className="h-full flex flex-col items-center justify-start text-center p-40 gap-15 ">
                <h2 className="text-5xl font-bold mb-4">{title}</h2>
                <div className="text-lg whitespace-pre-line">
                    {text}
                </div>
            </div>
        </Section>
    );
}