import { motion } from "motion/react";

/**
 * Props for the AnimatedTitle component.
 */
interface AnimatedTitleProps {
    /** The text to display and animate */
    title: string;
}

/**
 * AnimatedTitle component.
 *
 * Displays a heading (`h1`) where each character is individually wrapped
 * in a `motion.span` to allow for potential per-character animations.
 * The entire heading fades and slides into view on mount.
 */
export default function AnimatedTitle({ title }: AnimatedTitleProps) {
    return (
        <motion.h1
            initial={{ opacity: 0, y: -10 }} // start invisible and slightly above
            animate={{ opacity: 1, y: 0 }}   // fade in and move to original position
            transition={{ duration: 0.5 }}    // half-second animation
            className="text-2xl font-bold flex gap-1 p-2"
        >
            {title.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block cursor-pointer" // allows hover effects if needed
                >
                    {/* Preserve spaces using non-breaking space */}
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.h1>
    );
}
