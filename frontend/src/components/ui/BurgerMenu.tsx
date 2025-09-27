'use client';

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";

interface NavLink {
    label: string;
    href: string;
}

interface BurgerMenuProps {
    navLinks: NavLink[];
}

export function BurgerMenu({ navLinks }: BurgerMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="sm:hidden relative">
            {/* Burger button */}
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md focus:outline-none z-50 relative hover:cursor-pointer"
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 w-64 bg-white shadow-lg flex flex-col gap-4 p-4 rounded-md z-40 "
                    >
                        {navLinks.map(link => (
                            <motion.div
                                key={`${link.label}-${link.href}`}
                                whileHover={{ scale: 1.05, color: "#7f5af0" }}  // effet hover
                                whileTap={{ scale: 0.95 }}                      // effet click / tap
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                < ButtonLink
                                    href={link.href}
                                    className="block w-full py-2 px-3 rounded-md text-gray-800"
                                    block="start"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </ButtonLink>
                            </motion.div>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
}
