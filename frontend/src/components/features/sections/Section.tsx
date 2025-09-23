'use client';


import React from "react";


export interface SectionProps {
    children?: React.ReactNode;
    bgColor?: string;
    height?: string;
}



export default function Section({children, bgColor, height}: SectionProps) {
    return (
        <section
            className={`${bgColor}`}
            style={{height: height}}
        >
            {children}
        </section>
    );
}