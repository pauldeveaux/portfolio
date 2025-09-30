import Section, {SectionProps} from "@/components/ui/miscellaneous/Section";
import Chat from "@/components/ui/chat/Chat";


interface ChatSectionProps extends SectionProps {
    title: string;
}

export default function ChatSection({title, ...sectionProps}: ChatSectionProps) {
    return <Section{...sectionProps}>
        <div className="max-h-[100vh] flex flex-col items-center justify-start text-center gap-8 p-10 sm:p-20">
            <h2 className="text-5xl font-bold">{title}</h2>
            <div className="text-base whitespace-pre-line">
                < Chat/>
            </div>
        </div>

    </Section>
}