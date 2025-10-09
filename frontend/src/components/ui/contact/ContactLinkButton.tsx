import ExternalLink from "@/components/ui/buttons/ExternalLink";
import Image from "next/image";
import {ContactLink} from "@/types/ContactLink";

/**
 * ContactLink component.
 *
 * Renders a stylized clickable link for social media or contact platforms.
 * Includes an image (logo) and a text label.
 * Uses ExternalLink for safe external navigation (target="_blank" + rel="noopener noreferrer").
 */
export default function ContactLinkButton({ socialMedia, imageUrl, text, link, download }: ContactLink) {
    return (
        <ExternalLink
            href={link}
            download={download}
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
                src={imageUrl}
                alt={`${socialMedia} logo`} // important for accessibility
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
