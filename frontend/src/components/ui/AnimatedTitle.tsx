import { motion } from "motion/react";

interface AnimatedTitleProps {
    title: string;
}

export default function AnimatedTitle({ title }: AnimatedTitleProps) {
    return (
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-primary flex gap-1 p-2"
        >
            {title.split("").map((char, i) => (
                <motion.span
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    className="inline-block cursor-pointer"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.h1>
    );
}
