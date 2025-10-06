/**
 * Represents a portfolio project.
 */
export type Project = {
  /** The title of the project */
  title: string;

  /** URL of the project's main image */
  imageUrl: string;

  /** Short description of the project */
  description: string;

  /** Optional list of tags for the project (e.g., technologies used) */
  tags?: string[];

  /** Optional size specifier for layout purposes */
  size?: "small" | "medium" | "large";

  /** Optional additional CSS classes for custom styling */
  className?: string;

  /** Optional URL to fetch Markdown content for a modal or detailed view */
  markdownUrl?: string;
};
