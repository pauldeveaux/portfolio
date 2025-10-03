"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";


export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleChange =
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // TODO
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-7 w-full max-w-3xl mx-auto mt-12 space-y-4 sm:px-4"
        >
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="Votre Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="flex-1 w-full bg-transparent border-b py-2 focus:outline-none"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Votre Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="flex-1 w-full bg-transparent border-b py-2 focus:outline-none "
                />
            </div>

            <input
                type="email"
                name="email"
                placeholder="Votre Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b py-2 focus:outline-none "
            />

            <textarea
                name="message"
                placeholder="Votre Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full bg-transparent border p-3 rounded-md focus:outline-none "
            />

            <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-main-3 text-font-light-1 w-full py-2 px-4 rounded-md transition-colors hover:cursor-pointer"
            >
                Envoyer
            </motion.button>
        </motion.form>
    );
}