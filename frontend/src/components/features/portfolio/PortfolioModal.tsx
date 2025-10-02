import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {useEffect} from "react";

interface PortfolioModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    imageUrl: string;
    markdownContent: string;
    links?: { label: string; url: string }[];
}

export default function PortfolioModal({ isOpen, onClose, title, imageUrl, markdownContent, links }: PortfolioModalProps) {

    useEffect(() => {
        if (isOpen){
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen])

    return (
        // AnimatePresence allows us to animate the modal when it enters or leaves the DOM
        <AnimatePresence>
            {isOpen && (

                <motion.div
                    className="fixed inset-0 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // clicking anywhere closes modal
                >
                    {/* Backdrop with reduced opacity */}
                    <motion.div
                        className="absolute inset-0 bg-black hover:cursor-pointer"
                        initial={{ opacity: 0 }} // initial state: invisible
                        animate={{ opacity: 0.6  }} // animate to fully visible
                        exit={{ opacity: 0 }} // fade out when removed
                        onClick={onClose} // click on backdrop closes the modal
                    />

                    {/* Modal container */}
                    <motion.div
                        className="relative bg-white rounded-xl max-w-4xl w-full z-5 max-h-[90vh] flex flex-col overflow-hidden"
                        onClick={(e) => {e.stopPropagation()}}
                    >

                        {/* Sticky Header */}
                        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-300 rounded-t-xl">
                            {/* Close button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:cursor-pointer"
                                onClick={onClose}
                            >
                                ✕
                            </button>

                            {/* Title */}
                            <h2 className="text-3xl font-bold">{title}</h2>
                        </div>

                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                            {/* Main project image */}
                            <img src={imageUrl} alt={title} className="w-full  mb-4 rounded-lg" />


                            {/* Markdown content */}
                            <div className="prose mb-4">
                                <ReactMarkdown
                                    children={markdownContent}
                                    remarkPlugins={[remarkGfm]} // support GitHub-flavored Markdown (tables, lists, etc.)
                                    rehypePlugins={[rehypeRaw]} // allow HTML inside Markdown
                                />
                            </div>

                            {/* Optional links (GitHub, live demo, etc.) */}
                            {links && links.length > 0 && (
                                <div className="flex gap-4 flex-wrap">
                                    {links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
