import Section, { SectionProps } from "@/components/ui/layout/Section";
import Chat from "@/components/ui/chat/Chat";

/**
 * Props for the ChatSection component.
 *
 * @extends SectionProps - Inherits all props from the Section component.
 * @property {string} title - The title displayed at the top of the chat section.
 * @property {string} defaultAIMessage - The default AI message
 */
interface ChatSectionProps extends SectionProps {
    title: string;
    defaultAIMessage: string;
}

/**
 * ChatSection Component
 *
 * Renders a section with a title and a chat interface.
 */
export default function ChatSection({ title, defaultAIMessage, ...sectionProps }: ChatSectionProps) {
    return (
        <Section {...sectionProps}>
            {/* Main container with vertical layout and spacing */}
            <div className="max-h-[100vh] flex flex-col items-center justify-start text-center gap-8 p-10 sm:p-20">

                <h2 className="text-5xl font-bold">{title}</h2>

                {/* Chat interface */}
                <div className="text-base whitespace-pre-line">
                    <Chat defaultAIMessage={defaultAIMessage} />
                </div>
            </div>
        </Section>
    );
}
