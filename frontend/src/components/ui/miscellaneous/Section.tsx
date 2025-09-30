'use client';


import React, {forwardRef} from "react";


export interface SectionProps extends React.HTMLAttributes<HTMLElement>{
    id: string;
    height?: string;
}


const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({id, children, className, height, style, ...other}, ref) => {
        return (
            <section
                id={id}
                ref={ref}
                className={className}
                style={{minHeight: height, ...style}}
                {...other}
            >
                {children}
            </section>
        );
    }
);
Section.displayName = "Section";


export default Section;