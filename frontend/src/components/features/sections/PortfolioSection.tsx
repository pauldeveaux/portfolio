"use client";
import { useState, useRef } from "react";
import Section, { SectionProps } from "@/components/ui/layout/Section";
import PortfolioCard from "@/components/features/sections/portfolio/PortfolioCard";
import { motion } from "motion/react";
import { Project } from "@/types/Project";
import { useIsMobile } from "@/components/features/hooks/useIsMobile";

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
 * Calculates the number of rows needed to display a list of projects
 * in a grid layout, based on each project's size and the maximum number of columns.
 */
function calculateRows(projects: Project[], maxColumns: number): number {
    const rows: number[] = [];
    let currentRow = 0;
    let colCount = 0;

    projects.forEach(project => {
        let span = 1;
        if (project.size === "medium") span = 2;
        else if (project.size === "large") span = 3;

        if (colCount + span > maxColumns) {
            currentRow++;
            colCount = 0;
        }

        colCount += span;
        rows[currentRow] = colCount;
    });

    return rows.length;
}

/**
 * PortfolioSection component
 */
export default function PortfolioSection({
    title,
    projects,
    rowsToShow = 2,
    ...sectionProps
}: PortfolioSectionProps) {
    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const maxColumns = isMobile ? 1 : 3;
    const rowsNeeded = calculateRows(projects, maxColumns);

    /**
     * Renders the portfolio cards with the "Show More / Show Less" logic
     */
    const renderProjects = (): React.ReactNode[] => {
        let colCount = 0;
        const maxColsTotal = rowsToShow * maxColumns;

        return projects.map((project, index) => {
            let span = 1;
            if (project.size === "medium") span = 2;
            else if (project.size === "large") span = 3;

            // Si non expanded, cacher les projets au-delà des lignes visibles
            if (!expanded && colCount + span > maxColsTotal) return null;

            colCount += span;

            let colSpanClass = "col-span-1";
            if (project.size === "medium") colSpanClass = "sm:col-span-2 lg:col-span-2";
            if (project.size === "large") colSpanClass = "sm:col-span-2 lg:col-span-3";

            return <PortfolioCard key={index} {...project} className={colSpanClass} />;
        });
    };

    return (
        <Section {...sectionProps}>
            <div
                ref={sectionRef}
                className="flex flex-col items-center py-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
            >
                <h2 className="text-5xl font-bold mb-20 text-center text-font-light-1">{title}</h2>

                {/* Grid of portfolio projects */}
                <div className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6 p-1 sm:p-2 w-full transition-all duration-300 ease-in-out">
                    {renderProjects()}
                </div>

                {/* Toggle button */}
                {rowsNeeded > rowsToShow && (
                    <div className="mt-8">
                        <motion.button
                            onClick={() => {
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
                )}
            </div>
        </Section>
    );
}
