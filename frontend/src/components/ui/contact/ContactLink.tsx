import ExternalLink from "@/components/ui/buttons/ExternalLink";
import Image from "next/image";


export interface ContactLinkProps {
    social_media: string;
    image_url: string;
    text: string;
    link: string;
}

export default function ContactLink ({ social_media, image_url, text, link }: ContactLinkProps) {
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
            <Image
                src={image_url}
                alt={`${social_media} logo`}
                width={32}
                height={32}
                className="w-8 h-8"
            />
            <span className="text-lg font-medium">
                {text}
            </span>
        </ExternalLink>
    );
}