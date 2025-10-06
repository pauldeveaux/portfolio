export type Project = {
    /** Title of the project */
    title: string;
    /** URL of the project's main image */
    imageUrl: string;
    /** Short description of the project */
    description: string;
    /** Optional list of tags for the project */
    tags?: string[];
    /** Optional size specifier (currently unused) */
    size?: "small" | "medium" | "large";
    /** Optional additional CSS classes */
    className?: string;
    /** Optional URL to fetch Markdown content for the modal */
    markdownUrl?: string;
};