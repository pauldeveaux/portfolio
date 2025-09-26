'use client';


import React from "react";


export interface SectionProps {
    id?: string;
    children?: React.ReactNode;
    bgColor?: string;
    height?: string;
}



export default function Section({id, children, bgColor, height}: SectionProps) {
    return (
        <section
            id={id}
            className={`${bgColor}`}
            style={{height: height}}
        >
            {children}
        </section>
    );
}