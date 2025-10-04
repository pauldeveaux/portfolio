/** Props for the ExternalLink component */
interface ExternalLinkProps {
    /** URL to navigate to */
    href: string;
    /** Link content */
    children: React.ReactNode;
    /** Optional additional CSS classes */
    className?: string;
}

/**
 * ExternalLink component.
 *
 * Renders an anchor tag that opens in a new tab safely using
 * `rel="noopener noreferrer"` to prevent security risks.
 */
export default function ExternalLink({ href, children, className }: ExternalLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            {children}
        </a>
    );
}
