import {motion} from "motion/react";
import {useState} from "react";
import Image from "next/image";
import PortfolioModal from "@/components/features/sections/portfolio/PortfolioModal";
import useMarkdownLoader from "@/components/features/markdown/markdownLoader";
import {Project} from "@/types/Project";


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
                                          size = "small",
                                          markdownUrl,
                                          markdown
                                      }: Project) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Lazy-load Markdown content when modal is opened
    const {content, loading, loadMarkdown} = useMarkdownLoader({});

    const fallBackUrl = "/images/fallback.png";
    const hoverScale = {
        small: 1.02,
        medium: 1.015,
        large: 1.01
    }

    /**
     * Opens the modal and loads Markdown content if not already loaded.
     */
    const openModal = async () => {
        setIsModalOpen(true);
        if (!content) {
            await loadMarkdown({markdownUrl: markdownUrl, markdown: markdown});
        }
    };

    return (
        <>
            <motion.div
                className={`relative group flex flex-col rounded-xl 
                overflow-hidden shadow-xl bg-main-5 hover:shadow-lg p-1 hover:cursor-pointer
                transition-shadow duration-300 w-full ${className}`}
                onClick={openModal}
                whileHover={{scale: hoverScale[size]}}
                transition={{duration: 0.3}}
            >
                {/* Project image with fallback */}
                <Image
                    src={imageError ? fallBackUrl : imageUrl}
                    alt={title}
                    width={800}
                    height={400}
                    unoptimized={true}
                    onError={() => setImageError(true)}
                    className="w-full h-56 object-cover"
                />

                {/* Title, description, and tags */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <div className="flex items-center justify-between gap-5">
                        <p className="text-font-dark-2 italic">{description}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            {tags && tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-sm px-3 py-1 rounded-full bg-button-light-accent/80 text-font-light-1 shadow-xl"
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
