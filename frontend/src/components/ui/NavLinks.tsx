import Link from "next/link";
import { motion } from "motion/react";

interface NavLink {
    label: string;
    href: string;
}

interface NavLinksProps {
    navLinks: NavLink[];
}

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
                    <Link
                        href={href}
                        className="text-main-text group-hover:text-accent transition-colors"
                    >
                        {label}
                    </Link>
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
