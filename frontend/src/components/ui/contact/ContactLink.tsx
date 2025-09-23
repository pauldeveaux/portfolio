import ExternalLink from "@/components/features/ExternalLink";


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
            className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <img
                src={image_url}
                alt={`${social_media} logo`}
                className="w-8 h-8 sm:w-6 sm:h-6"
            />
            <span className="text-lg font-medium text-center sm:text-left">{text}</span>
        </ExternalLink>
    );
}