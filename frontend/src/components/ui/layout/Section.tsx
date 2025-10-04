'use client';

import React, { forwardRef } from "react";

/**
 * Props for the Section component.
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    /** Unique identifier for the section, used for linking or scrolling */
    id: string;
    /** Optional minimum height for the section (e.g., "100vh") */
    height?: string;
}

/**
 * Section component.
 *
 * A reusable wrapper for page sections that supports:
 * - Forwarding refs
 * - Custom minHeight
 * - Standard HTML attributes (like className, style, etc.)
 *
 * @param props - SectionProps
 * @param ref - forwarded ref to the section element
 * @returns JSX.Element
 */
const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ id, children, className, height, style, ...other }, ref) => {
        return (
            <section
                id={id}
                ref={ref} // allows parent components to directly access the DOM node
                className={className}
                style={{ minHeight: height, ...style }} // minHeight + optional inline styles
                {...other} // spread remaining HTML attributes (like onClick, aria-*, etc.)
            >
                {children}
            </section>
        );
    }
);

// Required to make forwardRef show a proper name in React DevTools
Section.displayName = "Section";

export default Section;
