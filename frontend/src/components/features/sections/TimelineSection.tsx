'use client';
import Section, {SectionProps} from "@/components/ui/layout/Section";
import {
    VerticalTimeline,
    VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {GraduationCap, Briefcase, Star} from "lucide-react";
import React, {useEffect} from "react";
import {useIsMobile} from "@/components/features/hooks/useIsMobile";
import {Experience, ExperienceType} from "@/types/Experience";
import useMarkdownLoader from "@/components/features/markdown/markdownLoader";


/**
 * Props for the `TimelineElement` component.
 *
 * @interface TimelineElementProps
 * @property {Experience} experience - The timeline event data containing title, subtitle, text, date, type, and optional tags.
 */
interface TimelineElementProps {
    experience: Experience;
}

/** Props for the TimelineSection component */
interface TimelineSectionProps extends SectionProps {
    title: string;
    elements: Array<Experience>;
}

/** Parameters associated with each timeline type */
interface TimelineTypeParameters {
    icon: React.ReactNode;
    position?: "left" | "right";
    tagIcon?: React.ComponentType<{ size?: number }>;
}

/**
 * TimelineElement Component
 *
 * Renders a single event in a vertical timeline using `VerticalTimelineElement`.
 * Handles icons, positioning, tags, subtags, and markdown content for the event.
 *
 * @param {TimelineElementProps} props - The component props.
 * @param {Experience} props.experience - The data for this timeline event.
 * @returns {JSX.Element} A vertical timeline element representing a single experience.
 */
function TimelineElement({ experience }: TimelineElementProps) {
    const { content, loading, loadMarkdown } = useMarkdownLoader({});

        useEffect(() => {
        async function fetchMarkdown() {
            await loadMarkdown({markdown: experience.text});
        }
        fetchMarkdown();
    }, [experience.text, loadMarkdown]);

    const timelineTypeIcons: Record<ExperienceType, TimelineTypeParameters> = {
        School: {icon: <GraduationCap/>, position: "left"},
        Graduate: {icon: <GraduationCap/>, position: "left", tagIcon: Star},
        Internship: {icon: <Briefcase/>, position: "right"},
        Work: {icon: <Briefcase/>, position: "left"},
        Final: {icon: <Star/>},
    };

    const {icon, position, tagIcon} = timelineTypeIcons[experience.type];

    const hoverClasses = "transition-transform duration-300 hover:scale-110 hover:shadow-xl rounded-lg";

    const contentStyle = {
        background: "linear-gradient(135deg, #14C5C3 0%, #13B9B7 50%, #12AEA9 100%)",
        color: "#fff",
        boxShadow: "0 15px 40px rgba(20, 195, 193, 0.5)",
        border: "4px solid #0DA5A2",
    };

    // Special case for the final element (just the icon)
    if (experience.type === "Final") {
        return (
            <VerticalTimelineElement
                key={experience.title}
                iconClassName={hoverClasses}
                textClassName={hoverClasses}
                iconStyle={{
                    background: "linear-gradient(135deg, #14C5C3 0%, #13B9B7 50%, #12AEA9 100%)",
                    color: "#fff"
                }}
                icon={icon}
            />
        );
    }

    return (
        <VerticalTimelineElement
            key={experience.title}
            dateClassName="text-font-dark-2 font-medium"
            iconClassName={hoverClasses}
            contentStyle={contentStyle}
            contentArrowStyle={{borderRight: "7px solid #14C5C3"}}
            position={position}
            intersectionObserverProps={{
                rootMargin: '0px 0px -40px 0px',
                triggerOnce: false,
            }}
            date={experience.date}
            iconStyle={{background: "#14C5C3", color: "#fff", boxShadow: "0 0 0 6px rgba(20, 195, 193, 0.3)"}}
            icon={icon}
        >
            <div className="transition-transform duration-300 hover:scale-105 rounded-lg p-4">
                {/* Tag and icon */}
                <div className="flex items-center gap-2 mb-2">
                    {tagIcon && React.createElement(tagIcon, {size: 20})}
                    {experience.tag &&
                        <span className="px-3 py-1 bg-white/30 rounded-full text-xs font-bold">{experience.tag}</span>}
                </div>

                {/* Title, subtitle, and text */}
                <h3 className="text-2xl font-extrabold">{experience.title}</h3>
                <h4 className="text-lg opacity-90 mt-1">{experience.subtitle}</h4>
                {loading ? <p>props.text</p> : content}

                {/* Optional subtags */}
                {experience.subtags && experience.subtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {experience.subtags.map((subtag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                {subtag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </VerticalTimelineElement>
    );
}

/**
 * TimelineSection Component
 *
 * Displays a vertical timeline with different event types.
 * Automatically appends a final marker at the end.
 */
export default function TimelineSection({title, elements, ...sectionProps}: TimelineSectionProps) {
    const isMobile = useIsMobile();

    // Add a final element to mark the end of the timeline
    const finalElementProps = {type: "Final" as ExperienceType, title: "", subtitle: "", text: "", date: ""};

    return (
        <Section {...sectionProps}>
            <h2 className="text-5xl font-bold mb-20 text-center pt-16">{title}</h2>

            <VerticalTimeline lineColor="#107E7D" animate={!isMobile}>
                {[...elements, finalElementProps].map((el, i) =>
                    <TimelineElement key={i} experience={el} />
                )}
            </VerticalTimeline>
        </Section>
    );
}
