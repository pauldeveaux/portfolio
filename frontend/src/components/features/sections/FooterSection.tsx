'use client';
import { ArrowUp } from "lucide-react";
import Section, { SectionProps } from "@/components/ui/layout/Section";
import ButtonLink from "@/components/ui/buttons/ButtonLink";

/**
 * Props for the FooterSection component.
 *
 * @extends SectionProps - Inherits layout and styling props from Section.
 * @property {Array<{label: string; href: string}>} navLinks - List of navigation links to display in the footer.
 */
interface FooterSectionProps extends SectionProps {
    navLinks: { label: string; href: string }[];
}

/**
 * FooterSection Component
 *
 * Renders a footer with navigation links, a "scroll to top" button, and copyright.
 */
export default function FooterSection({ navLinks, ...sectionProps }: FooterSectionProps) {

    // Scroll smoothly to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Section {...sectionProps}>
            <div className="w-full text-font-light-1 pt-12 pb-5 relative">

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                >
                    <ArrowUp size={24} />
                </button>

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
                            <p className="text-sm">&copy; Paul Deveaux | 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
