"use client";
import {useRef, useState} from "react";
import {motion} from "motion/react";
import Section, {SectionProps} from "@/components/ui/layout/Section";
import CertificationCard from "@/components/features/sections/certifications/CertificationCard";
import {Certification} from "@/types/Certification";

/**
 * Props for the CertificationsSection component.
 */
interface CertificationsSectionProps extends SectionProps {
    /** Section title */
    title: string;

    /** Array of certifications to display as `CertificationCard`s */
    certifications: Certification[];

    /** Number of certifications to show when collapsed (default is 3) */
    initialCount?: number;
}

/**
 * CertificationsSection component
 *
 * Displays the user's certifications as a grid of cards.
 * Clicking a card opens the corresponding PDF in a modal.
 * Beyond `initialCount` entries, a "Show more / Show less" toggle appears.
 */
export default function CertificationsSection({
    title,
    certifications,
    initialCount = 3,
    ...sectionProps
}: CertificationsSectionProps) {
    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    if (certifications.length === 0) return null;

    const hasMore = certifications.length > initialCount;
    const visibleCertifications = expanded ? certifications : certifications.slice(0, initialCount);

    return (
        <Section {...sectionProps}>
            <div
                ref={sectionRef}
                className="flex flex-col items-center py-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
            >
                <h2 className="text-5xl font-bold mb-10 text-center">{title}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1 sm:p-2 w-full">
                    {visibleCertifications.map((certification, index) => (
                        <CertificationCard key={index} {...certification} />
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-8">
                        <motion.button
                            onClick={() => {
                                if (expanded && sectionRef.current) {
                                    sectionRef.current.scrollIntoView({behavior: "smooth", block: "start"});
                                }
                                setExpanded(!expanded);
                            }}
                            className="px-6 py-3 bg-white text-main-3 font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                            }}
                            transition={{
                                scale: {duration: 0.05},
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
