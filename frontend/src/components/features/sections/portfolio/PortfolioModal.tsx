import { AnimatePresence, motion } from "motion/react";
import { useEffect, ReactNode, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * Props for the PortfolioModal component.
 */
interface PortfolioModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Function to close the modal */
    onClose: () => void;
    /** Title of the project/modal */
    title: string;
    /** URL of the main image to display */
    imageUrl: string;
    /** Pre-rendered Markdown content as a ReactNode */
    markdownNode: ReactNode;
}

/**
 * PortfolioModal component.
 *
 * Displays a modal with a project title, image, and Markdown content.
 * Disables body scroll when open and supports fade/scale animations.
 */
export default function PortfolioModal({ isOpen, onClose, title, imageUrl, markdownNode }: PortfolioModalProps) {
    const [imageError, setImageError] = useState(false);
    const fallBackUrl = "/images/fallback.png";

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Clicking outside closes modal
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black hover:cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    {/* Modal container */}
                    <motion.div
                        className="relative bg-gray-50 rounded-2xl flex flex-col overflow-hidden
                        mx-4 sm:mx-6 max-w-5xl w-full z-5 max-h-[85vh] sm:max-h-[90vh] shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Prevent click propagation
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 30 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {/* Header with title and close button */}
                        <div className="sticky top-0 bg-gray-50 z-10 px-6 py-5 border-b border-gray-200 rounded-t-2xl flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                            <button
                                className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1.5 transition-colors hover:cursor-pointer"
                                onClick={onClose}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-6 scrollbar-thin">
                            {/* Main project image */}
                            <Image
                                src={imageError ? fallBackUrl : imageUrl}
                                alt={title}
                                width={800}
                                height={400}
                                unoptimized={true}
                                onError={() => setImageError(true)}
                                className="w-full max-h-[50vh] object-contain mb-6 rounded-xl border border-gray-100 shadow-sm"
                            />

                            {/* Markdown content */}
                            <div className="!max-w-none mb-4">
                                {markdownNode}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
