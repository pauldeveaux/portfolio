"use client";
import { useState } from "react";
import Section, { SectionProps } from "@/components/ui/miscellaneous/Section";
import PortfolioCard, { PortfolioCardProps } from "@/components/features/portfolio/PortfolioCard";
import { motion } from "motion/react";

interface PortfolioSectionProps extends SectionProps {
    title: string;
    projects: PortfolioCardProps[];
    rowsToShow?: number;
}

export default function PortfolioSection({
                                             title,
                                             projects,
                                             rowsToShow = 2,
                                             ...sectionProps
                                         }: PortfolioSectionProps) {
    const [expanded, setExpanded] = useState(false);

    const rowHeightPx = 320; // correspond à auto-rows-[320px]
    const gapPx = 24; // gap-6 => 24px
    const collapsedMaxHeight = rowsToShow * rowHeightPx + (rowsToShow - 1) * gapPx;

    return (
        <Section {...sectionProps}>
            <div className="flex flex-col items-center py-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl font-bold mb-20 text-center">{title}</h2>

                {/* Grille des projets */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px] grid-flow-dense w-full transition-[max-height] duration-300 ease-in-out"
                    style={{
                        maxHeight: expanded ? undefined : `${collapsedMaxHeight}px`,
                        overflow: expanded ? "visible" : "hidden"
                    }}
                >
                    {projects.map((project, index) => {
                        let colSpanClass = "col-span-1";
                        if (project.size === "medium") colSpanClass = "sm:col-span-2 lg:col-span-2";
                        if (project.size === "large") colSpanClass = "sm:col-span-2 lg:col-span-3";

                        return (
                            <PortfolioCard key={index} {...project} className={colSpanClass} />
                        );
                    })}
                </div>

                {/* Bouton "Afficher plus" ou "Voir moins" sous la grille */}
                <div className="mt-8">
                    {!expanded ? (
                        <motion.button
                            onClick={() => setExpanded(true)}
                            className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-50 transition hover:cursor-pointer"
                        >
                            Afficher plus
                        </motion.button>
                    ) : (
                        <motion.button
                            onClick={() => setExpanded(false)}
                            className="px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-50 transition hover:cursor-pointer"
                        >
                            Afficher moins
                        </motion.button>
                    )}
                </div>
            </div>
        </Section>
    );
}
