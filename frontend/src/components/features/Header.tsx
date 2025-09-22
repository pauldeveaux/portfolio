'use client';

import Link from "next/link";
import { motion, useScroll } from "motion/react"

import AnimatedTitle from "@/components/ui/AnimatedTitle";
import NavLinks from "@/components/ui/NavLinks";



interface NavLink {
    label: string;
    href: string;
}

interface HeaderProps {
    title: string;
    navLinks?: NavLink[];
    onHeightMeasured?: (height: number) => void;
}


export default function Header({ title, navLinks, onHeightMeasured }: HeaderProps) {
    const { scrollYProgress } = useScroll()

    return (
    <header className="bg-background shadow-md sm:sticky top-0">
        <div className="flex flex-wrap justify-between items-center px-6 md:pr-[10%] py-4">

            {/* Title */}
            <Link href="/public" className="no-underline">
                <AnimatedTitle title={title} />
            </Link>

            {/* Navigation Links */}
            { navLinks && ( <NavLinks navLinks={navLinks} /> )}

        </div>

        {/* Scroll Progress Bar */}
        <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-[2px] bg-primary origin-left"
        />

    </header>
    );
}