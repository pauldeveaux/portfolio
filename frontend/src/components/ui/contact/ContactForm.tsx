"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

/**
 * Represents the data structure of the contact form.
 */
interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

/**
 * ContactForm component.
 *
 * Renders a contact form with first name, last name, email, and message fields.
 * Uses framer-motion for entry and button animations.
 * Handles controlled inputs and logs the submitted data.
 */
export default function ContactForm() {
    /** State for controlled form fields */
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    /**
     * Updates the corresponding field in the form state when input changes.
     * @param e - Change event from an input or textarea
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * Handles form submission.
     * Currently logs form data to the console.
     * @param e - Form submit event
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // TODO: Integrate with backend or email service
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }} // slide up + fade in animation
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
                    className="flex-1 w-full bg-transparent border-b py-2 focus:outline-none"
                />
            </div>

            <input
                type="email"
                name="email"
                placeholder="Votre Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b py-2 focus:outline-none"
            />

            <textarea
                name="message"
                placeholder="Votre Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full bg-transparent border p-3 rounded-md focus:outline-none"
            />

            <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }} // subtle grow on hover
                whileTap={{ scale: 0.95 }}   // shrink slightly on click
                className="bg-main-3 text-font-light-1 w-full py-2 px-4 rounded-md transition-colors hover:cursor-pointer"
            >
                Envoyer
            </motion.button>
        </motion.form>
    );
}
