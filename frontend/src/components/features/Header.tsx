'use client';

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { BurgerMenu } from "@/components/ui/BurgerMenu";
import ButtonLink from "@/components/ui/ButtonLink";
import { useEffect, useState, useCallback } from "react";

interface NavLink {
    label: string;
    href: string;
}

interface HeaderProps {
    title: string;
    navLinks?: NavLink[];
}

export default function Header({ title, navLinks }: HeaderProps) {
    const { scrollYProgress, scrollY } = useScroll();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Memoized mobile check function
    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768); // Changed to md breakpoint
    }, []);

    useEffect(() => {
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [checkMobile]);

    // Improved scroll handler with debouncing
    useMotionValueEvent(scrollY, "change", (latest) => {
        const difference = Math.abs(latest - lastScrollY);
        const scrollThreshold = 10;
        const hideThreshold = 150;
        const topZone = 80;

        // Skip micro-scrolls
        if (difference < scrollThreshold) return;

        // Always show header in top zone
        if (latest <= topZone) {
            if (!showHeader) setShowHeader(true);
            setLastScrollY(latest);
            return;
        }

        // Hide on scroll down (past threshold)
        if (latest > lastScrollY && latest > hideThreshold) {
            if (showHeader) setShowHeader(false);
        }
        // Show on scroll up
        else if (latest < lastScrollY) {
            if (!showHeader) setShowHeader(true);
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
                ease: [0.4, 0, 0.2, 1], // Custom easing curve
            }}
            style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
            }}
        >
            <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8 py-2 md:py-3">
                {/* Burger menu for mobile */}
                {navLinks && (
                    <div className="md:hidden">
                        <BurgerMenu navLinks={navLinks} />
                    </div>
                )}

                {/* Centered title */}
                <Link
                    href="/"
                    className="text-primary no-underline mx-4 flex-1 md:flex-none text-center md:text-left transition-colors hover:text-primary/80"
                >
                    <AnimatedTitle title={title} />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks?.map((link) => (
                        <ButtonLink
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            block="start"
                            className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                        >
                            {link.label}
                        </ButtonLink>
                    ))}
                </nav>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="hidden md:block h-1 bg-gradient-to-r from-primary to-primary/60 origin-left"
            />
        </motion.header>
    );
}