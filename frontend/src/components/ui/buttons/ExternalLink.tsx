/** Props for the ExternalLink component */
interface ExternalLinkProps {
    /** URL to navigate to */
    href: string;
    /** Link content */
    children: React.ReactNode;
    /** Optional additional CSS classes */
    className?: string;
    /** Force download instead of opening in a new tab */
    download?: boolean;
}

/**
 * ExternalLink component.
 *
 * Renders an anchor tag that opens in a new tab safely using
 * `rel="noopener noreferrer"` to prevent security risks.
 */
export default function ExternalLink({ href, children, className, download }: ExternalLinkProps) {

    return (
        <a
            href={href}
            target={download ? "_self" : "_blank"}
            rel={download ? undefined : "noopener noreferrer"}
            download={download}
            className={className}
        >
            {children}
        </a>
    );
}
