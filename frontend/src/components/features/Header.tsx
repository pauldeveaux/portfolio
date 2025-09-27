'use client';

import Link from "next/link";
import {motion, useMotionValueEvent, useScroll} from "motion/react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import {BurgerMenu} from "@/components/ui/BurgerMenu";
import ButtonLink from "@/components/ui/ButtonLink";
import {useEffect, useState} from "react";

interface NavLink {
    label: string;
    href: string;
}

interface HeaderProps {
    title: string;
    navLinks?: NavLink[];
}

export default function Header({ title, navLinks }: HeaderProps) {
    const { scrollYProgress } = useScroll();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { scrollY } = useScroll()
    const [isMobile, setIsMobile] = useState(false);


      useEffect(() => {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 640);
            }
            checkMobile();

            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }, []);


    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > lastScrollY && latest > 50) {
            setShowHeader(false);
        }
        else {
            setShowHeader(true);
        }
        setLastScrollY(latest);
    });

    return (
        <motion.header
            id="header"
            className="bg-white shadow-md top-0 z-50 sticky"
            animate={isMobile ? { y: showHeader ? 0 : "-100%" } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="flex justify-between items-center px-6 md:pr-[10%] py-4">
                {/* Burger menu */}
                {navLinks && <BurgerMenu navLinks={navLinks} />}

                {/* Centered title */}
                <Link href="/public" className="text-primary no-underline mx-4 flex-1 text-center">
                    <AnimatedTitle title={title} />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden sm:flex gap-6">
                    {navLinks?.map(link => (
                        <ButtonLink
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            block="start"
                            className="hover:text-primary transition"
                        >
                            {link.label}
                        </ButtonLink>
                    ))}
                </nav>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="hidden sm:block h-[2px] bg-blue-400 origin-left"
            />
        </motion.header>
    );
}
