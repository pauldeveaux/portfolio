"use client";

import Section, { SectionProps } from "@/components/ui/layout/Section";
import useMarkdownLoader from "@/components/features/markdown/markdownLoader";
import React, {useEffect} from "react";
import {motion} from "motion/react";

interface TextSectionProps extends SectionProps {
    title: string;
    text: string;
}

export default function TextSection({ title, text, ...sectionProps }: TextSectionProps) {
    const { content, loading, loadMarkdown } = useMarkdownLoader({});

    useEffect(() => {
        async function fetchMarkdown() {
            await loadMarkdown({markdown: text});
        }
        fetchMarkdown();
    }, [text, loadMarkdown]);


    return (
        <Section {...sectionProps}>
            <div className="relative h-full flex flex-col items-center justify-start text-center gap-8 p-10 sm:p-20 overflow-hidden">

                <motion.div
                    className="absolute top-10 left-[10%] w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"
                    animate={{y: [0, -20, 0], x: [0, 10, 0]}}
                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                />
                <motion.div
                    className="absolute bottom-16 right-[15%] w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"
                    animate={{y: [0, 15, 0], x: [0, -12, 0]}}
                    transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
                />
                <motion.div
                    className="absolute top-1/2 left-[5%] w-20 h-20 bg-white/8 rounded-full blur-xl pointer-events-none"
                    animate={{y: [0, -25, 0], x: [0, 8, 0]}}
                    transition={{duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1}}
                />

                <motion.div
                    className="relative w-full sm:max-w-6xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-12 shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    whileHover={{y: -4}}
                    viewport={{once: true, margin: "-100px"}}
                    transition={{duration: 0.6, ease: "easeOut"}}
                >
                    <motion.h2
                        className="text-5xl font-extrabold text-white mb-4"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        {title}
                    </motion.h2>
                    <motion.div
                        className="mx-auto w-24 h-1 bg-white/50 rounded-full mb-8"
                        initial={{scaleX: 0}}
                        whileInView={{scaleX: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: 0.4}}
                    />
                    <motion.div
                        className="text-lg text-white/90 leading-relaxed text-left whitespace-pre-line"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: 0.5}}
                    >
                        {loading ? <p>...</p> : content}
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
}
