import ClientParticles from "@/components/ui/particles/ClientParticle";
import { useIsMobile } from "@/components/features/hooks/useIsMobile";

/**
 * BlurryParticles component.
 *
 * Displays a full-screen, fixed background with a gradient and animated particles.
 * Adds a blurry mask overlay to give depth and a soft visual effect.
 *
 * Mobile devices receive a slightly different blur treatment for performance.
 *
 * @returns JSX.Element
 */
export default function BlurryParticles() {
    const isMobile = useIsMobile(); // custom hook to detect mobile devices

    return (
        <div className="fixed -z-10 top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-[#14A3A2] via-[#129190] to-[#107E7D]">
            {/* Particle animation component */}
            <ClientParticles
                className="pointer-events-none" // ensures particles do not block interactions
                isMobile={isMobile} // adjust behavior for mobile devices
            />

            {/* Blurry overlay mask */}
            {isMobile ? (
                <div
                    className="
                        absolute
                        bg-gradient-to-b from-black/25 via-black/15 to-black/25
                        rounded-2xl
                        -inset-8
                        pointer-events-none
                        md:backdrop-blur-[1px]
                    "
                />
            ) : (
                <div
                    className="
                        absolute
                        bg-black/10
                        backdrop-blur-[1px]
                        rounded-2xl
                        -inset-8
                        pointer-events-none
                        sm:backdrop-blur-[2px]
                    "
                />
            )}
        </div>
    );
}
