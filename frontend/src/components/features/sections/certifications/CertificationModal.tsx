import {AnimatePresence, motion} from "motion/react";
import {useEffect} from "react";
import {ExternalLink, X} from "lucide-react";
import dynamic from "next/dynamic";

// pdf.js relies on browser APIs, so the viewer is only loaded client-side
const PdfViewer = dynamic(() => import("./PdfViewer"), {ssr: false});

/**
 * Props for the CertificationModal component.
 */
interface CertificationModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Function to close the modal */
    onClose: () => void;
    /** Title of the certification/modal */
    title: string;
    /** URL of the certification PDF to embed */
    pdfUrl: string;
}

/**
 * CertificationModal component.
 *
 * Displays a modal rendering the certification PDF.
 * Disables body scroll when open and supports fade/scale animations.
 */
export default function CertificationModal({isOpen, onClose, title, pdfUrl}: CertificationModalProps) {
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
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black hover:cursor-pointer"
                        initial={{opacity: 0}}
                        animate={{opacity: 0.6}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                        onClick={onClose}
                    />

                    {/* Modal container */}
                    <motion.div
                        className="relative bg-gray-50 rounded-2xl flex flex-col overflow-hidden
                        mx-4 sm:mx-6 max-w-4xl w-full z-5 h-[85vh] sm:h-[90vh] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        initial={{scale: 0.9, y: 30}}
                        animate={{scale: 1, y: 0}}
                        exit={{scale: 0.9, y: 30}}
                        transition={{duration: 0.2, ease: "easeOut"}}
                    >
                        {/* Header with title and close button */}
                        <div className="shrink-0 bg-gray-50 z-10 px-4 py-3 sm:px-6 sm:py-5 border-b border-gray-200 rounded-t-2xl flex items-center justify-between gap-2 sm:gap-4">
                            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{title}</h2>
                            <div className="flex items-center gap-1 shrink-0">
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Ouvrir le PDF dans un nouvel onglet"
                                    className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                                >
                                    <ExternalLink size={20}/>
                                </a>
                                <button
                                    className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1.5 transition-colors hover:cursor-pointer"
                                    onClick={onClose}
                                >
                                    <X size={20}/>
                                </button>
                            </div>
                        </div>

                        {/* PDF pages */}
                        <div className="flex-1 overflow-y-auto overscroll-contain p-2 sm:p-4 bg-gray-200">
                            <PdfViewer
                                url={pdfUrl}
                                error={
                                    <p className="text-center text-gray-600 py-16">
                                        Impossible d&apos;afficher le PDF.{" "}
                                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                                           className="underline">Ouvrir le fichier</a>
                                    </p>
                                }
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
