'use client';


import React, { forwardRef } from "react";



export interface SectionProps {
    id?: string;
    children?: React.ReactNode;
    className?: string;
    height?: string;
}



const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ id, children, className, height }, ref) => {
        return (
            <section
                id={id}
                ref={ref}
                className={`${className}`}
                style={{ height: height }}
            >
                {children}
            </section>
        );
    }
);

export default Section;