export interface PortfolioCardProps {
    title: string;
    imageUrl: string;
    description: string;
    tags?: string[];
    size?: "small" | "medium" | "large";
    className?: string;
}

export default function PortfolioCard({ title, imageUrl, description, tags, className }: PortfolioCardProps) {
    return (
        <div
            className={`relative group flex flex-col rounded-xl 
            overflow-hidden shadow-xl bg-white hover:shadow-lg 
            transition-shadow duration-300 w-full ${className}`
        }
        >

            {/* Image */}
            <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />

            {/* Overlay avec description (seulement au hover) */}
            <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-sm text-center">{description}</p>
            </div>

            {/* Contenu permanent (titre + tags) */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
