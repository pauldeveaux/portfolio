import { LucideIcon } from "lucide-react";

/**
 * Represents the type of an experience.
 */
export type ExperienceType = "School" | "Graduate" | "Internship" | "Work" | "Final";

/**
 * Represents a single experience entry, such as education, internship, or work.
 */
export interface Experience {
    /** The main title of the experience. */
    title: string;

    /** The subtitle of the experience. */
    subtitle: string;

    /** Detailed description of the experience. */
    text: string;

    /** The type/category of the experience. */
    type: ExperienceType;

    /** The date or period of the experience. */
    date: string;

    /** Optional tag for the experience */
    tag?: string;

    /** Optional icon associated with the tag, using Lucide icons. */
    tagIcon?: LucideIcon;

    /** Optional array of subtag strings for additional categorization. */
    subtags?: Array<string>;
}
