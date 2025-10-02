"use client";

import { motion } from "framer-motion";

export interface CarouselCardProps {
    name: string;
    description?: string;
}


export default function CarouselCard({ name, description }: CarouselCardProps) {
    return (
        <motion.div
            className="bg-white h-full flex flex-col flex-shrink-0 items-center text-center w-64 rounded-xl shadow-lg text-xl font-semibold"
            whileHover={{ scale: 1.1 }}
        >
            <h3 className="font-semibold text-xl m-4 text-black">{name}</h3>

            <p className="text-sm text-gray-500 mx-5 my-3">{description}</p>
        </motion.div>
    );
}