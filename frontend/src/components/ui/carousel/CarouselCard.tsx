"use client";

import {motion} from "motion/react";
import useMarkdownLoader from "@/components/features/markdown/markdownLoader";
import React, {useEffect, useState} from "react";

/** Props for a single CarouselCard */
export interface CarouselCardProps {
    /** Name or title of the card */
    name: string;
    /** Optional description text displayed below the name */
    description?: string;
}

/**
 * CarouselCard component
 *
 * A single card displayed inside a Carousel. Supports hover animation.
 *
 * @param name - Card title
 * @param description - Optional descriptive text
 */
export default function CarouselCard({name, description}: CarouselCardProps) {
    const {content, loading, loadMarkdown} = useMarkdownLoader({});
    const [animDelay] = useState(() => Math.random() * 5);
    const [animDuration] = useState(() => 6 + Math.random() * 4);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        async function fetchMarkdown() {
            await loadMarkdown({markdown: description});
        }

        fetchMarkdown();
    }, [description, loadMarkdown]);

    return (
        <motion.div
            className="relative overflow-hidden h-full flex flex-col flex-shrink-0 items-center text-center w-64 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-main-1/40 text-xl transition-shadow duration-200 bg-[length:200%_200%] bg-[linear-gradient(135deg,white_30%,#EDFFFE_50%,#F5FFF4_65%,white_85%)]"
            style={mounted ? {animationDelay: `${animDelay}s`, animationDuration: `${animDuration}s`, animationName: "gradient-shift", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite"} : undefined}
            whileHover={{scale: 1.03}}
            transition={{duration: 0.15}}
        >
            <h3 className="font-semibold text-xl m-4 text-black">{name}</h3>
            {description && (
                <div className="text-sm text-gray-500 mb-3 pl-5 pr-1 overflow-y-auto scrollbar-thin w-full">
                    <div className="pr-5">
                        {loading ? <p>...</p> : content}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
