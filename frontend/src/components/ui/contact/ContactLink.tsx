import ExternalLink from "@/components/ui/buttons/ExternalLink";
import Image from "next/image";

/**
 * Props for a ContactLink component.
 */
export interface ContactLinkProps {
    /** Name of the social media or contact platform */
    social_media: string;
    /** URL of the platform's icon/image */
    image_url: string;
    /** Display text for the link */
    text: string;
    /** URL to navigate to when clicked */
    link: string;
}

/**
 * ContactLink component.
 *
 * Renders a stylized clickable link for social media or contact platforms.
 * Includes an image (logo) and a text label.
 * Uses ExternalLink for safe external navigation (target="_blank" + rel="noopener noreferrer").
 */
export default function ContactLink({ social_media, image_url, text, link }: ContactLinkProps) {
    return (
        <ExternalLink
            href={link}
            className="
                flex items-center gap-3
                w-full sm:w-auto
                p-4
                bg-gradient-to-r from-purple-50 via-white to-cyan-50
                border border-gray-200
                rounded-2xl shadow-md hover:shadow-xl
                transition-all duration-300
            "
        >
            {/* Logo image */}
            <Image
                src={image_url}
                alt={`${social_media} logo`} // important for accessibility
                width={32}
                height={32}
                className="w-8 h-8"
            />

            {/* Display text */}
            <span className="text-lg font-medium">
                {text}
            </span>
        </ExternalLink>
    );
}
