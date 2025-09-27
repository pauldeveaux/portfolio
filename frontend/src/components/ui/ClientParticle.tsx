"use client";

import Particles, {initParticlesEngine} from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import {useEffect, useMemo, useRef, useState} from "react";
import {loadSlim} from "@tsparticles/slim";


interface ClientParticlesProps {
    className?: string;
    particleCount?: number;
    enableEffects?: boolean;
}


export default function ClientParticles({className, particleCount = 120, enableEffects = true}: ClientParticlesProps) {
    const [init, setInit] = useState(false);
    const particlesRef = useRef<Container | null>(null);


    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);


    const particlesLoaded = async (container?: Container): Promise<void> => {
        particlesRef.current = container || null;
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 60,
            fullScreen: false,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                    },
                    onHover: {
                        enable: enableEffects,
                        mode: "repulse",
                    },
                },
                modes: {
                    repulse: {
                        distance: 50,
                        duration: 0.5,
                        factor: 2,
                        speed: 0.5
                    },
                }
            },
            particles: {
                color: {
                    value: ["#ffffff", "#a3d5ff", "#b0e0e6"], // couleurs de bulles pastel
                },
                links: {
                    enable: false, // pas de liens entre bulles
                },
                move: {
                    direction: MoveDirection.top, // bulles qui montent
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                    wobble: {
                        enable: true,
                        distance: 5,
                        speed: 0.5
                    }
                },
                number: {
                    value: particleCount,
                },
                opacity: {
                    value: 0.4,
                    random: {enable: true, minimumValue: 0.2},
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0.05,
                        sync: false
                    }
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: {min: 5, max: 10},
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 3,
                        sync: false,
                    }
                },
                collisions: {
                    enable: true
                }
            },
            detectRetina: true,
        }),
        [particleCount, enableEffects],
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

    return <></>;
};

