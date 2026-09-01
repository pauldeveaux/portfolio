'use client';
import Section, {SectionProps} from "@/components/ui/layout/Section";
import {
    VerticalTimeline,
    VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {GraduationCap, Briefcase, Star, ChevronDown, ChevronUp, FlaskConical} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {useIsMobile} from "@/components/features/hooks/useIsMobile";
import {Experience, ExperienceType} from "@/types/Experience";
import useMarkdownLoader from "@/components/features/markdown/markdownLoader";

interface TimelineSectionProps extends SectionProps {
    title: string;
    elements: Array<Experience>;
}

type FilterType = "all" | "formation" | "stage" | "emploi";

const typeFilter: Record<ExperienceType, FilterType> = {
    School: "formation",
    Graduate: "formation",
    Internship: "stage",
    Work: "emploi",
    Final: "all",
};

const filters: { key: FilterType; label: string }[] = [
    {key: "all", label: "Tout"},
    {key: "emploi", label: "Emplois"},
    {key: "formation", label: "Formation"},
    {key: "stage", label: "Stages"},
];

interface TimelineTypeParameters {
    icon: React.ReactNode;
    position?: "left" | "right";
    tagIcon?: React.ComponentType<{ size?: number }>;
}

const timelineTypeIcons: Record<ExperienceType, TimelineTypeParameters> = {
    School: {icon: <GraduationCap/>, position: "left"},
    Graduate: {icon: <GraduationCap/>, position: "left", tagIcon: Star},
    Internship: {icon: <FlaskConical/>, position: "right"},
    Work: {icon: <Briefcase/>, position: "left"},
    Final: {icon: <Star/>},
};

const contentStyle = {
    background: "linear-gradient(135deg, #12B5B3 0%, #10A5A3 50%, #0e9996 100%)",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(20, 195, 193, 0.3)",
    border: "1px solid #0DA5A2",
    borderRadius: "12px",
};

const finalElement: Experience = {type: "Final", title: "", subtitle: "", text: "", date: ""};

function TimelineElement({experience, defaultExpanded}: { experience: Experience; defaultExpanded: boolean }) {
    const {content, loading, loadMarkdown} = useMarkdownLoader({});
    const [expanded, setExpanded] = useState(defaultExpanded);
    const cardRef = useRef<HTMLDivElement>(null);

    const toggleExpanded = () => {
        if (expanded) {
            setExpanded(false);
            requestAnimationFrame(() => {
                const rect = cardRef.current?.getBoundingClientRect();
                if (rect && rect.top < 0) {
                    cardRef.current?.scrollIntoView({behavior: "instant", block: "nearest"});
                }
            });
        } else {
            setExpanded(true);
        }
    };

    useEffect(() => {
        async function fetchMarkdown() {
            await loadMarkdown({markdown: experience.text});
        }
        fetchMarkdown();
    }, [experience.text, loadMarkdown]);

    const {icon, position, tagIcon} = timelineTypeIcons[experience.type];

    if (experience.type === "Final") {
        return (
            <VerticalTimelineElement
                key={experience.title}
                iconStyle={{
                    background: "linear-gradient(135deg, #14A3A2 0%, #107E7D 100%)",
                    color: "#fff"
                }}
                icon={icon}
            />
        );
    }

    return (
        <VerticalTimelineElement
            key={experience.title}
            dateClassName="text-font-dark-2 font-medium text-sm"
            contentStyle={contentStyle}
            contentArrowStyle={{borderRight: "7px solid #14A3A2"}}
            position={position}
            intersectionObserverProps={{
                rootMargin: '0px 0px -40px 0px',
                triggerOnce: true,
            }}
            date={experience.date}
            iconStyle={{background: "#14A3A2", color: "#fff", boxShadow: "0 0 0 4px rgba(20, 163, 162, 0.3)"}}
            icon={icon}
        >
            <div
                ref={cardRef}
                className="group cursor-pointer select-none p-3"
                onClick={toggleExpanded}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleExpanded(); }}
            >
                <div className="flex items-center gap-2">
                    {tagIcon && React.createElement(tagIcon, {size: 18})}
                    {experience.tag &&
                        <span className="px-2 py-0.5 bg-white/25 rounded-full text-xs font-bold">{experience.tag}</span>}
                </div>

                <h3 className="text-lg font-bold mt-1">{experience.title}</h3>
                <h4 className="text-sm opacity-85 mt-0.5">{experience.subtitle}</h4>

                {expanded && (
                    <>
                        <div className="mt-2 text-sm opacity-90 leading-relaxed">
                            {loading ? <p>...</p> : content}
                        </div>

                        {experience.subtags && experience.subtags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {experience.subtags.map((subtag, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                        {subtag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-end mt-1">
                    <span className="text-white/30 group-hover:text-white transition-colors duration-200">
                        {expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                    </span>
                </div>
            </div>
        </VerticalTimelineElement>
    );
}

export default function TimelineSection({title, elements, ...sectionProps}: TimelineSectionProps) {
    const isMobile = useIsMobile();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [showAll, setShowAll] = useState(false);
    const INITIAL_COUNT = 3;

    const filteredElements = elements.filter(el => {
        if (activeFilter === "all") return true;
        return typeFilter[el.type] === activeFilter;
    });

    const visibleElements = showAll ? filteredElements : filteredElements.slice(0, INITIAL_COUNT);
    const hasMore = filteredElements.length > INITIAL_COUNT;

    return (
        <Section {...sectionProps} ref={sectionRef}>
            <h2 className="text-5xl font-bold mb-8 text-center pt-16">{title}</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {filters.map(f => (
                    <button
                        key={f.key}
                        onClick={() => { setActiveFilter(f.key); setShowAll(false); }}
                        className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeFilter === f.key
                                ? "bg-main-1 text-white shadow-md"
                                : "bg-white text-gray-700 shadow hover:shadow-md border border-gray-200 hover:border-main-1/40"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <VerticalTimeline lineColor="#107E7D" animate={!isMobile}>
                {visibleElements.map((el, i) =>
                    <TimelineElement key={`${el.title}-${i}`} experience={el} defaultExpanded={false} />
                )}
                {showAll && <TimelineElement experience={finalElement} defaultExpanded={false} />}
            </VerticalTimeline>

            {hasMore && !showAll && (
                <div className="flex justify-center mt-4 pb-8">
                    <button
                        onClick={() => setShowAll(true)}
                        className="cursor-pointer px-6 py-2 rounded-full bg-main-1 text-white text-sm font-medium shadow hover:bg-main-2 transition-colors"
                    >
                        Voir tout le parcours ({filteredElements.length - INITIAL_COUNT} de plus)
                    </button>
                </div>
            )}

            {showAll && hasMore && (
                <div className="flex justify-center mt-4 pb-8">
                    <button
                        onClick={() => {
                            setShowAll(false);
                            requestAnimationFrame(() => {
                                const rect = sectionRef.current?.getBoundingClientRect();
                                if (rect && rect.bottom < 0) {
                                    sectionRef.current?.scrollIntoView({behavior: "instant", block: "end"});
                                }
                            });
                        }}
                        className="cursor-pointer px-6 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        Réduire
                    </button>
                </div>
            )}
        </Section>
    );
}
