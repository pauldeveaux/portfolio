"use client";

import {motion} from "framer-motion";
import React, {useState} from "react";
import {sendEmail} from "@/lib/backend/email";
import {ContactFormData} from "@/types/Contact";


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

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    /**
     * Updates the corresponding field in the form state when input changes.
     * @param e - Change event from an input or textarea
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    /**
     * Handles form submission.
     * Currently logs form data to the console.
     * @param e - Form submit event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            const res = await sendEmail(formData);
            console.log(res.message)
            setSuccessMessage("Votre email a bien été envoyé !")
            setFormData({firstName: "", lastName: "", email: "", message: ""});
        } catch (err: any) {
            console.error(err.message)
            setErrorMessage("Erreur lors de l'envoi de l'email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{opacity: 0, y: 20}} // slide up + fade in animation
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
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
                disabled={loading}
                whileHover={{scale: loading ? 1 : 1.05}}
                whileTap={{scale: loading ? 1 : 0.95}}
                className={`bg-main-3 text-font-light-1 w-full py-2 px-4 rounded-md transition-colors 
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Sending...
                    </div>
                ) : (
                    "Envoyer"
                )}
            </motion.button>

            {successMessage && (
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mt-4"
                >
                    {successMessage}
                </motion.div>
            )}

            {errorMessage && (
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-4"
                >
                    {errorMessage}
                </motion.div>
            )}
        </motion.form>
    );
}
