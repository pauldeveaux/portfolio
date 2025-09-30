import {ArrowUp} from "lucide-react";
import Section, {SectionProps} from "@/components/ui/Section";
import ButtonLink from "@/components/ui/ButtonLink";


interface FooterSectionProps extends SectionProps {
    navLinks: { label: string; href: string }[];
}


export default function FooterSection({navLinks, ...sectionProps}: FooterSectionProps) {

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <Section {...sectionProps}>
            <div className="w-full  text-white pt-12 pb-5 relative">

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                >
                    <ArrowUp size={24}/>
                </button>

                {/* Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">

                        {/* Navigation Links */}
                        <div className="flex flex-wrap justify-center gap-8 mb-8">
                            {navLinks.map((link) => (
                                <ButtonLink
                                    key={link.label}
                                    href={link.href}
                                    block="start"
                                    className={`text-white transition-colors duration-300 hover:text-secondary-background`}
                                >
                                    {link.label}
                                </ButtonLink>
                            ))}
                        </div>


                        {/* Divider */}
                        <div
                            className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>

                        {/* Copyright */}
                        <div className="container mx-auto text-center">
                            <p className="text-sm">
                                &copy; Paul Deveaux | 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}