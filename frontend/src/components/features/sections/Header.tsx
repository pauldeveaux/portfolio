'use client';

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import AnimatedTitle from "@/components/ui/miscellaneous/AnimatedTitle";
import { BurgerMenu } from "@/components/ui/buttons/BurgerMenu";
import ButtonLink from "@/components/ui/buttons/ButtonLink";
import { useState } from "react";
import { useIsMobile } from "@/components/features/hooks/useIsMobile";

/**
 * A navigation link object.
 */
interface NavLink {
    label: string;
    href: string;
}

/**
 * Props for the Header component.
 *
 * @property {string} title - The site title displayed in the header.
 * @property {NavLink[]} [navLinks] - Optional list of navigation links.
 */
interface HeaderProps {
    title: string;
    navLinks?: NavLink[];
}

/**
 * Header Component
 *
 * Sticky header with a title, responsive navigation, scroll hide/show behavior, and scroll progress bar.
 */
export default function Header({ title, navLinks }: HeaderProps) {
    const { scrollYProgress, scrollY } = useScroll();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const isMobile = useIsMobile(1024);

    // Handle scroll to show/hide header
    useMotionValueEvent(scrollY, "change", (latest) => {
        const difference = Math.abs(latest - lastScrollY);
        const scrollThreshold = 10;
        const hideThreshold = 150;
        const topZone = 80;

        if (difference < scrollThreshold) return; // ignore micro-scrolls

        if (latest <= topZone) {
            if (!showHeader) setShowHeader(true);
            setLastScrollY(latest);
            return;
        }

        if (latest > lastScrollY && latest > hideThreshold) {
            if (showHeader) setShowHeader(false); // hide on scroll down
        } else if (latest < lastScrollY) {
            if (!showHeader) setShowHeader(true); // show on scroll up
        }

        setLastScrollY(latest);
    });

    return (
        <motion.header
            id="header"
            className="bg-white/95 backdrop-blur-sm shadow-lg top-0 z-50 sticky border-b border-gray-100"
            animate={isMobile ? { y: showHeader ? 0 : "-100%" } : { y: 0 }}
            transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
            style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
            }}
        >
            <div className="container flex justify-between items-center px-4 md:px-6 lg:px-8 py-2 lg:py-3 lg:mx-auto">

                {/* Burger menu for mobile */}
                {navLinks && (
                    <div className="lg:hidden">
                        <BurgerMenu navLinks={navLinks} />
                    </div>
                )}

                {/* Centered site title */}
                <Link
                    href="/"
                    className="text-main-2 no-underline mx-4 flex-1 lg:flex-none text-center lg:text-left transition-colors"
                >
                    <AnimatedTitle title={title} />
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks?.map((link) => (
                        <ButtonLink
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            block="start"
                            className="text-font-dark-2 hover:text-main-2 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-main-2 after:transition-all after:duration-200 hover:after:w-full"
                        >
                            {link.label}
                        </ButtonLink>
                    ))}
                </nav>
            </div>

            {/* Scroll progress bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="hidden md:block h-1 bg-gradient-to-r from-main-2 to-main-2/60 origin-left"
            />
        </motion.header>
    );
}
