"use client";
import { useState, useRef } from "react";
import Section, { SectionProps } from "@/components/ui/miscellaneous/Section";
import PortfolioCard, { PortfolioCardProps } from "@/components/features/portfolio/PortfolioCard";
import { motion } from "motion/react";

/**
 * Props for the `PortfolioSection` component.
 */
export interface PortfolioSectionProps extends SectionProps {
    /** Section title */
    title: string;

    /** Array of projects to display as `PortfolioCard`s */
    projects: PortfolioCardProps[];

    /** Number of rows to show when collapsed (default is 2) */
    rowsToShow?: number;
}

/**
 * A section displaying a grid of portfolio projects with a collapsible view.
 *
 * The section initially shows a limited number of rows (`rowsToShow`). Clicking
 * the "Show More" button expands the grid to reveal all projects. Clicking
 * "Show Less" collapses the grid and scrolls the user back to the top of the section.
 *
 * @param title - The section title displayed at the top
 * @param projects - Array of project objects to render inside the grid
 * @param rowsToShow - Number of rows to show when the grid is collapsed (default 2)
 * @param sectionProps - Additional props passed to the wrapper `Section`
 *
 * @example
 * ```tsx
 * <PortfolioSection
 *   title="My Projects"
 *   projects={[{ title: "Project 1", size: "small", imageUrl: "/img1.png" }]}
 *   rowsToShow={2}
 * />
 * ```
 */
export default function PortfolioSection({
                                             title,
                                             projects,
                                             rowsToShow = 2,
                                             ...sectionProps
                                         }: PortfolioSectionProps) {
    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const rowHeightPx = 320; // corresponds to auto-rows-[320px]
    const gapPx = 24; // gap-6 => 24px
    const collapsedMaxHeight = rowsToShow * rowHeightPx + (rowsToShow - 1) * gapPx;

    return (
        <Section {...sectionProps}>
            <div
                ref={sectionRef}
                className="flex flex-col items-center py-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
            >
                <h2 className="text-5xl font-bold mb-20 text-center text-white">{title}</h2>

                {/* Project grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px] grid-flow-dense w-full transition-[max-height] duration-300 ease-in-out"
                    style={{
                        maxHeight: expanded ? undefined : `${collapsedMaxHeight}px`,
                        overflow: expanded ? "visible" : "hidden",
                    }}
                >
                    {projects.map((project, index) => {
                        let colSpanClass = "col-span-1";
                        if (project.size === "medium") colSpanClass = "sm:col-span-2 lg:col-span-2";
                        if (project.size === "large") colSpanClass = "sm:col-span-2 lg:col-span-3";

                        return <PortfolioCard key={index} {...project} className={colSpanClass} />;
                    })}
                </div>

                {/* Show More / Show Less button */}
                <div className="mt-8">
                    <motion.button
                        onClick={() => {
                            // Scroll to top of section when collapsing
                            if (expanded && sectionRef.current) {
                                sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                            setExpanded(!expanded);
                        }}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg shadow transition cursor-pointer"
                        whileHover={{
                            scale: 1.05, // slightly grow
                            boxShadow: "0px 10px 20px rgba(0,0,0,0.15)", // more pronounced shadow
                        }}
                        transition={{
                            scale: { duration: 0.05 },
                        }}
                    >
                        {expanded ? "Show Less" : "Show More"}
                    </motion.button>
                </div>
            </div>
        </Section>
    );
}
