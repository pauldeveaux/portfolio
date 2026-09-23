/**
 * Represents a certification earned by the user.
 */
export type Certification = {
    /** The title of the certification */
    title: string;

    /** The organization that issued the certification */
    provider: string;

    /** URL of the certification's image (e.g., badge or logo) */
    imageUrl: string;

    /** URL of the certification's PDF, opened when the card is clicked, if available */
    pdfUrl?: string;

    /** Date the certification was obtained (ISO string) */
    date: string;
};
