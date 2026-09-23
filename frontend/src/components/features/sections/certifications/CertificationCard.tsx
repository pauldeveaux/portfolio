"use client";
import {motion} from "motion/react";
import {useState} from "react";
import Image from "next/image";
import {Certification} from "@/types/Certification";
import CertificationModal from "@/components/features/sections/certifications/CertificationModal";

/**
 * CertificationCard component.
 *
 * Displays a card with the certification badge, title, provider, and date.
 * Clicking the card opens the certification PDF in a modal.
 */
export default function CertificationCard({title, provider, imageUrl, pdfUrl, date}: Certification) {
    const [imageError, setImageError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fallBackUrl = "/images/fallback.png";

    const formattedDate = date
        ? new Date(date).toLocaleDateString("fr-FR", {month: "long", year: "numeric"})
        : undefined;

    return (
        <>
            <motion.div
                className={`relative group flex flex-col rounded-xl overflow-hidden bg-white/95 backdrop-blur-sm
                border border-white/30 shadow-lg transition-all duration-300 w-full ${
                    pdfUrl ? "hover:shadow-2xl hover:shadow-black/20 hover:cursor-pointer" : ""
                }`}
                onClick={() => pdfUrl && setIsModalOpen(true)}
                whileHover={pdfUrl ? {scale: 1.02} : undefined}
                transition={{duration: 0}}
            >
                <div className="w-full h-40 flex items-center justify-center bg-gradient-to-br from-main-1/15 via-main-2/10 to-main-4/15 p-6">
                    <Image
                        src={imageError ? fallBackUrl : imageUrl}
                        alt={title}
                        width={800}
                        height={400}
                        unoptimized={true}
                        onError={() => setImageError(true)}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-1 text-font-dark-1">{title}</h3>
                    <p className="text-font-dark-2 italic">{provider}</p>
                    {formattedDate && (
                        <p className="text-sm text-font-dark-2 mt-2">{formattedDate}</p>
                    )}
                </div>
            </motion.div>

            {pdfUrl && (
                <CertificationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={title}
                    pdfUrl={pdfUrl}
                />
            )}
        </>
    );
}
