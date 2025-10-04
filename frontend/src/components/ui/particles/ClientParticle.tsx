"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { useEffect, useMemo, useRef, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

/**
 * Props for ClientParticles component.
 */
interface ClientParticlesProps {
    /** Additional CSS classes for the particle canvas */
    className?: string;
    /** Flag indicating if the device is mobile (used to reduce particle count / effects) */
    isMobile?: boolean;
}

/**
 * ClientParticles component.
 *
 * Renders an animated particle background using tsparticles.
 * The particle behavior and count adjust based on the `isMobile` prop.
 * Mobile devices have fewer particles and disabled hover effects for performance.
 *
 * @param props - ClientParticlesProps
 * @returns JSX.Element
 */
export default function ClientParticles({ className, isMobile }: ClientParticlesProps) {
    const [init, setInit] = useState(false); // tracks if tsparticles engine has loaded
    const particlesRef = useRef<Container | null>(null); // reference to particle container

    // Initialize tsparticles engine with slim build
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); // slim version reduces bundle size
        }).then(() => {
            setInit(true);
        });
    }, []);

    /**
     * Callback fired when particles are loaded.
     * Stores reference to the particle container.
     */
    const particlesLoaded = async (container?: Container): Promise<void> => {
        particlesRef.current = container || null;
    };

    /**
     * Particle options memoized based on `isMobile` to improve performance.
     */
    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 60,
            fullScreen: true,
            interactivity: {
                events: {
                    onClick: { enable: false },
                    onHover: {
                        enable: !isMobile, // disable hover repulsion on mobile
                        mode: "repulse",
                    },
                },
                modes: {
                    repulse: {
                        distance: 50,
                        duration: 0.5,
                        factor: 2,
                        speed: 0.5,
                    },
                },
            },
            particles: {
                color: {
                    value: ["#ffffff", "#a3d5ff", "#b0e0e6", "#00ced1"],
                },
                links: { enable: false },
                move: {
                    direction: MoveDirection.top,
                    enable: true,
                    outModes: { default: OutMode.out },
                    random: true,
                    speed: 1,
                    straight: false,
                    wobble: {
                        enable: !isMobile,
                        distance: 5,
                        speed: 0.5,
                    },
                },
                number: { value: isMobile ? 30 : 100 }, // fewer particles on mobile
                opacity: {
                    value: 0.4,
                    random: { enable: true, minimumValue: 0.2 },
                    animation: { enable: true, speed: 0.5, minimumValue: 0.05, sync: false },
                },
                shape: { type: "circle" },
                size: {
                    value: { min: 5, max: 10 },
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 3, sync: false },
                },
                collisions: { enable: !isMobile },
            },
            detectRetina: !isMobile, // disables high-DPI scaling on mobile for performance
        }),
        [isMobile],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                className={className}
                particlesLoaded={particlesLoaded}
                options={options}
            />
        );
    }

    return <></>; // renders nothing until engine is initialized
}
