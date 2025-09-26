'use client';


import React, {forwardRef} from "react";


export interface SectionProps {
    id: string;
    children?: React.ReactNode;
    height?: string;

    [key: string]: any;
}


const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({id, children, className, height, ...other}, ref) => {
        return (
            <section
                id={id}
                ref={ref}
                className={`${className}`}
                style={{height: height}}
                {...other}
            >
                {children}
            </section>
        );
    }
);
Section.displayName = "Section";


export default Section;