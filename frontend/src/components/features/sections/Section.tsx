'use client';


import React from "react";

import "@/components/style/patterns/test_pattern.css"



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