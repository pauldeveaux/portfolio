import { motion } from "motion/react";
import { useState} from "react";
import PortfolioModal from "@/components/features/portfolio/PortfolioModal";


export interface PortfolioCardProps {
    title: string;
    imageUrl: string;
    description: string;
    tags?: string[];
    size?: "small" | "medium" | "large";
    className?: string;
    markdownUrl?: string;
}




export default function PortfolioCard({ title, imageUrl, description, tags, className, markdownUrl }: PortfolioCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [markdownContent, setMarkdownContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const openModal = async () => {
        setIsModalOpen(true);

        // Lazy load Markdown only if not already loaded
        if (markdownUrl && !markdownContent) {
            setLoading(true);
            try {
                const res = await fetch(markdownUrl);
                if (!res.ok) throw new Error(`Failed to fetch Markdown: ${res.status}`);
                const data = await res.text();
                setMarkdownContent(data);
            } catch (err) {
                console.error(err);
                setMarkdownContent("Failed to load content.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <motion.div
                className={`relative group flex flex-col rounded-xl 
                overflow-hidden shadow-xl bg-white hover:shadow-lg p-1 hover:cursor-pointer
                transition-shadow duration-300 w-full ${className}`}
                onClick={ openModal}
            >
                {/* Image */}
                <motion.img src={imageUrl} alt={title} className="w-full h-56 object-cover"/>

                {/* Title + description + tags */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 italic">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags && tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800 shadow-xl"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <PortfolioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                imageUrl={imageUrl}
                markdownContent={loading ? "Loading..." : markdownContent ?? ""}
            />
        </>
    );
}