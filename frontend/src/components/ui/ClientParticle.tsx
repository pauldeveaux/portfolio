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
}


export default function ClientParticles({className}: ClientParticlesProps) {
    const [init, setInit] = useState(false);
    const particlesRef = useRef<Container | null>(null);



    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);







    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(particlesRef.current);
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
                        enable: true,
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
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 120,
                },
                opacity: {
                    value: 0.4,
                    random: { enable: true, minimumValue: 0.2 },
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
                    value: { min: 5, max: 10 }, // taille plus grande pour des bulles
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
        [],
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

