"use client";
import { useState, useRef } from "react";
import Section, { SectionProps } from "@/components/ui/layout/Section";
import PortfolioCard from "@/components/features/sections/portfolio/PortfolioCard";
import { motion } from "motion/react";
import {Project} from "@/types/Project";

/**
 * Props for the `PortfolioSection` component.
 */
export interface PortfolioSectionProps extends SectionProps {
    /** Section title */
    title: string;

    /** Array of projects to display as `PortfolioCard`s */
    projects: Project[];

    /** Number of rows to show when collapsed (default is 2) */
    rowsToShow?: number;
}

/**
 * A section displaying a grid of portfolio projects with a collapsible view.
 *
 * The section initially shows a limited number of rows (`rowsToShow`). Clicking
 * the "Show More" button expands the grid to reveal all projects. Clicking
 * "Show Less" collapses the grid and scrolls the user back to the top of the section.
 */
export default function PortfolioSection({
    title,
    projects,
    rowsToShow = 2,
    ...sectionProps
}: PortfolioSectionProps) {
    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const rowHeightPx = 320; // height of a single row
    const gapPx = 24; // gap between grid items
    const padding = 2;
    const collapsedMaxHeight = rowsToShow * rowHeightPx + (rowsToShow - 1) * (gapPx + padding * 8);

    return (
        <Section {...sectionProps}>
            <div
                ref={sectionRef}
                className="flex flex-col items-center py-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
            >
                <h2 className="text-5xl font-bold mb-20 text-center text-font-light-1">{title}</h2>

                {/* Grid of portfolio projects */}
                <div
                    className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 auto-rows-[320px] gap-6
                    p-1 sm:p-2 w-full transition-[max-height] duration-300 ease-in-out"
                    style={{
                        maxHeight: expanded ? undefined : `${collapsedMaxHeight}px`,
                        overflow: expanded ? "visible" : "hidden",
                    }}
                >
                    {projects.map((project, index) => {
                        // Determine column span based on project size
                        let colSpanClass = "col-span-1";
                        if (project.size === "medium") colSpanClass = "sm:col-span-2 lg:col-span-2";
                        if (project.size === "large") colSpanClass = "sm:col-span-2 lg:col-span-3";

                        return <PortfolioCard key={index} {...project} className={colSpanClass} />;
                    })}
                </div>

                {/* Toggle button for expanding/collapsing grid */}
                <div className="mt-8">
                    <motion.button
                        onClick={() => {
                            // Scroll to top of section when collapsing
                            if (expanded && sectionRef.current) {
                                sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                            setExpanded(!expanded);
                        }}
                        className="px-6 py-3 bg-button-light-1 border border-button-light-2 text-font-dark-1 font-bold rounded-lg shadow transition cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                        }}
                        transition={{
                            scale: { duration: 0.05 },
                        }}
                    >
                        {expanded ? "Afficher moins" : "Afficher plus"}
                    </motion.button>
                </div>
            </div>
        </Section>
    );
}
