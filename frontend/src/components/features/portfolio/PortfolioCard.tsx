import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import PortfolioModal from "@/components/features/portfolio/PortfolioModal";
import useMarkdownLoader from "@/utils/markdownLoader";

/**
 * Props for the PortfolioCard component.
 */
export interface PortfolioCardProps {
    /** Title of the project */
    title: string;
    /** URL of the project's main image */
    imageUrl: string;
    /** Short description of the project */
    description: string;
    /** Optional list of tags for the project */
    tags?: string[];
    /** Optional size specifier (currently unused) */
    size?: "small" | "medium" | "large";
    /** Optional additional CSS classes */
    className?: string;
    /** Optional URL to fetch Markdown content for the modal */
    markdownUrl?: string;
}

/**
 * PortfolioCard component.
 *
 * Displays a card with project image, title, description, and tags.
 * When clicked, opens a modal with more details and lazy-loaded Markdown content.
 */
export default function PortfolioCard({
    title,
    imageUrl,
    description,
    tags,
    className,
    markdownUrl
}: PortfolioCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Lazy-load Markdown content when modal is opened
    const { content, loading, loadMarkdown } = useMarkdownLoader({});

    const fallBackUrl = "/images/fallback.png";

    /**
     * Opens the modal and loads Markdown content if not already loaded.
     */
    const openModal = async () => {
        setIsModalOpen(true);
        if (!content) await loadMarkdown(markdownUrl);
    };

    return (
        <>
            <motion.div
                className={`relative group flex flex-col rounded-xl 
                overflow-hidden shadow-xl bg-main-5 hover:shadow-lg p-1 hover:cursor-pointer
                transition-shadow duration-300 w-full ${className}`}
                onClick={openModal}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Project image with fallback */}
                <Image
                    src={imageError ? fallBackUrl : imageUrl}
                    alt={title}
                    width={800}
                    height={400}
                    onError={() => setImageError(true)}
                    className="w-full h-56 object-cover"
                />

                {/* Title, description, and tags */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-font-dark-2 italic">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags && tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-sm px-2 py-1 rounded-full bg-main-5 text-font-dark-2 shadow-xl"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Modal showing project details */}
            <PortfolioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                imageUrl={imageUrl}
                markdownNode={loading ? "Loading..." : content ?? ""}
            />
        </>
    );
}
