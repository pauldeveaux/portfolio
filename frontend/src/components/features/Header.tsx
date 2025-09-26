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
}


export default function Header({ title, navLinks }: HeaderProps) {
    const { scrollYProgress } = useScroll()

    return (
    <header id="header" className="bg-background shadow-md sm:sticky top-0 z-50">
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