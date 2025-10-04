"use client";

import { motion } from "framer-motion";

/** Props for a single CarouselCard */
export interface CarouselCardProps {
    /** Name or title of the card */
    name: string;
    /** Optional description text displayed below the name */
    description?: string;
}

/**
 * CarouselCard component
 *
 * A single card displayed inside a Carousel. Supports hover animation.
 *
 * @param name - Card title
 * @param description - Optional descriptive text
 */
export default function CarouselCard({ name, description }: CarouselCardProps) {
    return (
        <motion.div
            className="bg-white h-full flex flex-col flex-shrink-0 items-center text-center w-64 rounded-xl shadow-lg text-xl font-semibold"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <h3 className="font-semibold text-xl m-4 text-black">{name}</h3>
            {description && (
                <p className="text-sm text-gray-500 mx-5 my-3 overflow-auto">{description}</p>
            )}
        </motion.div>
    );
}
