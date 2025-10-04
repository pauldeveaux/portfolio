import { motion } from "motion/react";
import ButtonLink from "@/components/ui/buttons/ButtonLink";

/** Single navigation link */
interface NavLink {
    label: string;
    href: string;
}

/** Props for the NavLinks component */
interface NavLinksProps {
    /** Array of navigation links */
    navLinks: NavLink[];
}

/**
 * NavLinks component.
 *
 * Renders a horizontal list of navigation links with hover underline animation.
 */
export default function NavLinks({ navLinks }: NavLinksProps) {
    return (
        <nav className="hidden sm:flex gap-4 justify-between">
            {navLinks.map(({ label, href }) => (
                <motion.div
                    key={label}
                    initial="initial"
                    whileHover="hover"
                    className="relative group"
                >
                    {/* Link button */}
                    <ButtonLink
                        href={href}
                        className="text-main-text group-hover:text-accent transition-colors"
                    >
                        {label}
                    </ButtonLink>

                    {/* Underline animation */}
                    <motion.span
                        className="absolute block left-0 -bottom-1 h-[2px] bg-accent"
                        variants={{
                            initial: { width: 0 },
                            hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.4 }}
                    />
                </motion.div>
            ))}
        </nav>
    );
}
