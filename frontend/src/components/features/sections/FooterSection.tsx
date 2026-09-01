'use client';
import { ArrowUp } from "lucide-react";
import Section, { SectionProps } from "@/components/ui/layout/Section";
import ButtonLink from "@/components/ui/buttons/ButtonLink";
import { motion } from "motion/react";

/**
 * Props for the FooterSection component.
 *
 * @extends SectionProps - Inherits layout and styling props from Section.
 * @property {string} license - License to display in the footer
 * @property {Array<{label: string; href: string}>} navLinks - List of navigation links to display in the footer.
 */
interface FooterSectionProps extends SectionProps {
    license: string;
    navLinks: { label: string; href: string }[];
}

/**
 * FooterSection Component
 *
 * Renders a footer with navigation links, a "scroll to top" button, and copyright.
 */
export default function FooterSection({ license, navLinks, ...sectionProps }: FooterSectionProps) {

    // Scroll smoothly to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Section {...sectionProps}>
            <div className="w-full text-font-light-1 pt-12 pb-5 relative">

                {/* Scroll to Top Button */}
                <motion.button
                    onClick={scrollToTop}
                    className="
                        absolute -top-6 left-1/2 -translate-x-1/2
                        text-main-3
                        p-3 rounded-full
                        shadow-lg
                        border-2 border-main-1
                        hover:scale-110 hover:shadow-2xl hover:cursor-pointer
                        transition-all duration-300
                    "
                    animate={{
                        background: [
                            "linear-gradient(to right, #fff, #E6FFFE, #D4FFFD)",
                            "linear-gradient(to right, #D4FFFD, #fff, #E6FFFE)",
                            "linear-gradient(to right, #E6FFFE, #D4FFFD, #fff)",
                            "linear-gradient(to right, #fff, #E6FFFE, #D4FFFD)",
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowUp size={24} />
                </motion.button>

                {/* Main container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">

                        {/* Navigation links */}
                        <div className="flex flex-wrap justify-center gap-8 mb-8">
                            {navLinks.map((link) => (
                                <ButtonLink
                                    key={link.label}
                                    href={link.href}
                                    block="start"
                                    className="text-font-light-1 transition-colors duration-300 hover:text-font-light-accent"
                                >
                                    {link.label}
                                </ButtonLink>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>

                        {/* Copyright */}
                        <div className="container mx-auto text-center">
                            <p className="text-sm">{license}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
