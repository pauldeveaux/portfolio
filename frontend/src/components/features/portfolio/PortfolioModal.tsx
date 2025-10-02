import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {useEffect} from "react";
import Image from "next/image";

interface PortfolioModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    imageUrl: string;
    markdownContent: string;
}

export default function PortfolioModal({ isOpen, onClose, title, imageUrl, markdownContent }: PortfolioModalProps) {

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
                        transition={{ duration: 0.25 }}
                        onClick={onClose} // click on backdrop closes the modal
                    />

                    {/* Modal container */}
                    <motion.div
                        className="relative bg-white rounded-xl flex flex-col overflow-hidden
                        mx-10 my-15 sm:my-0 max-w-4xl w-full z-5 max-h-[90vh]"
                        onClick={(e) => {e.stopPropagation()}}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                        transition={{ duration: 0.25 }}
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
                            <Image
                                src={imageUrl}
                                alt={title}
                                width={800}
                                height={400}
                                className="w-full max-h-[50vh] object-contain mb-4 rounded-lg border border-gray-200 shadow-md"
                            />

                            {/* Markdown content */}
                            <div className="prose !max-w-none mb-4">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]} // support GitHub-flavored Markdown (tables, lists, etc.)
                                    rehypePlugins={[rehypeRaw]} // allow HTML inside Markdown
                                >
                                    {markdownContent}
                                </ReactMarkdown>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
