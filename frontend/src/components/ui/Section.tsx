'use client';


import React from "react";

interface SectionProps {
    id: string;
    children?: React.ReactNode;
    bgColor?: string;
    height?: string;
}


export default function Section({ id, children, bgColor="background", height }: SectionProps) {

    return (
        <section
            id={id}
            className=
            {
                `bg-${bgColor}`
            }
            style={{ height: height }}
        >
            {children}
        </section>
    );
}