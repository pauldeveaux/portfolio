'use client';


import React from "react";


export interface SectionProps {
    id?: string;
    children?: React.ReactNode;
    className?: string;
    height?: string;
}



export default function Section({id, children, className, height}: SectionProps) {
    return (
        <section
            id={id}
            className={`relative ${className}`}
            style={{height: height}}
        >
            {children}
        </section>
    );
}