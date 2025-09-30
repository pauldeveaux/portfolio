"use client";
import React, {useRef, useEffect, useState} from "react";
import CarouselCard, {CarouselCardProps} from "@/components/ui/carousel/CarouselCard";

interface CarouselProps {
    cards: Array<CarouselCardProps>;
}

export default function Carousel({cards}: CarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const scrollBreakpointRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    // Velocity (px/ms) for momentum (touch only)
    const velocityRef = useRef(0);

    // Keep track of requestAnimationFrame and timestamps
    const rafRef = useRef<number | null>(null);
    const lastTsRef = useRef<number | null>(null);

    // Auto-scroll + momentum loop
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        const firstCard = cardRef.current;
        if (!scrollContainer || !firstCard) return;

        const AUTO_SPEED = 0.05; // px/ms (~50px/s)
        const FRICTION = 0.005; // friction per ms

        const step = (ts: number) => {
            if (!scrollContainer || !firstCard) return;

            if (lastTsRef.current === null) lastTsRef.current = ts;
            const dt = Math.max(0, ts - lastTsRef.current); // ms since last frame
            lastTsRef.current = ts;

            const style = getComputedStyle(scrollContainer);
            const gap = parseFloat(style.columnGap || style.gap || "0");

            // Compute loop breakpoint (width of all original cards)
            scrollBreakpointRef.current = cards.length * (firstCard.offsetWidth + gap);

            if (!isDragging) {
                const autoDirection = velocityRef.current !== 0 ? Math.sign(velocityRef.current) : 1;

                // Apply momentum
                if (Math.abs(velocityRef.current) > 0) {
                    // Apply friction
                    velocityRef.current *= Math.exp(-FRICTION * dt);

                    // Clamp velocity to at least AUTO_SPEED in the same direction
                    if (Math.abs(velocityRef.current) < AUTO_SPEED) {
                        velocityRef.current = AUTO_SPEED * autoDirection;
                    }

                    // Next scroll position
                    let nextScroll = scrollContainer.scrollLeft - velocityRef.current * dt;

                    // Infinite loop logic
                    if (nextScroll < 0) {
                        nextScroll = scrollBreakpointRef.current + (nextScroll % scrollBreakpointRef.current);
                    } else if (nextScroll > scrollBreakpointRef.current) {
                        nextScroll = nextScroll % scrollBreakpointRef.current;
                    }

                    scrollContainer.scrollLeft = nextScroll;
                } else {
                    // Regular auto-scroll
                    let nextScroll = scrollContainer.scrollLeft - AUTO_SPEED * dt;

                    // Infinite loop
                    if (nextScroll < 0) {
                        nextScroll = scrollBreakpointRef.current + (nextScroll % scrollBreakpointRef.current);
                    } else if (nextScroll > scrollBreakpointRef.current) {
                        nextScroll = nextScroll % scrollBreakpointRef.current;
                    }

                    scrollContainer.scrollLeft = nextScroll;
                }
            }


            // Infinite loop effect
            if (scrollBreakpointRef.current > 0) {
                scrollContainer.scrollLeft =
                    scrollContainer.scrollLeft % scrollBreakpointRef.current;
            }

            rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastTsRef.current = null;
        };
    }, [isDragging, cards.length]);

    /** --- Mouse drag --- **/
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        setIsDragging(true);
        velocityRef.current = 0;

        const startX = e.pageX;
        const scrollLeftStart = scrollContainer.scrollLeft;
        let lastX = startX;
        let lastTime = performance.now();

        const onMouseMove = (ev: MouseEvent) => {
            const curX = ev.pageX;
            const now = performance.now();

            const dx = curX - startX;
            const scrollPos = scrollLeftStart - dx;

            // Infinite loop while dragging
            if (scrollPos < 0) {
                scrollContainer.scrollLeft =
                    scrollBreakpointRef.current + (scrollPos % scrollBreakpointRef.current);
            } else {
                scrollContainer.scrollLeft = scrollPos % scrollBreakpointRef.current;
            }

            // Update velocity for momentum
            const dt = Math.max(1, now - lastTime);
            const delta = curX - lastX;
            velocityRef.current = (delta / dt) * 0.2;
            lastX = curX;
            lastTime = now;
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            setIsDragging(false);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    /** --- Touch drag --- **/
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        setIsDragging(true);
        velocityRef.current = 0;

        const startX = e.touches[0].pageX;
        const scrollLeftStart = scrollContainer.scrollLeft;
        let lastX = startX;
        let lastTime = performance.now();

        const onTouchMove = (ev: TouchEvent) => {
            const curX = ev.touches[0]?.pageX ?? lastX;
            const now = performance.now();

            const dx = curX - startX;
            const scrollPos = scrollLeftStart - dx;

            if (scrollPos < 0) {
                scrollContainer.scrollLeft =
                    scrollBreakpointRef.current + (scrollPos % scrollBreakpointRef.current);
            } else {
                scrollContainer.scrollLeft = scrollPos % scrollBreakpointRef.current;
            }

            // Velocity in px/ms
            const dt = Math.max(1, now - lastTime);
            const delta = curX - lastX;
            velocityRef.current = delta / dt;
            lastX = curX;
            lastTime = now;
        };

        const onTouchEnd = () => {
            window.removeEventListener("touchmove", onTouchMove as EventListener);
            window.removeEventListener("touchend", onTouchEnd as EventListener);
            setIsDragging(false);
        };

        window.addEventListener("touchmove", onTouchMove as EventListener, {
            passive: true,
        });
        window.addEventListener("touchend", onTouchEnd as EventListener);
    };

    // Repeat cards to fill carousel
    const repeatCount = cards.length === 1 ? 5 : cards.length <= 3 ? 3 : 2;
    const skillsArray = Array.from({length: repeatCount}).flatMap(() => cards);

    return (
        <div
            ref={scrollRef}
            className="flex max-w-4xl mx-auto justify-start gap-6 py-5 overflow-x-hidden scrollbar-hide touch-pan-x"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            style={{ touchAction: 'pan-y', cursor: "grab"}}
        >
            {skillsArray.map((skill, index) => (
                <div
                    key={index}
                    ref={index === 0 ? cardRef : null}
                    className="shrink-0 select-none h-64"
                >
                    <CarouselCard name={skill.name} description={skill.description}/>
                </div>
            ))}
        </div>
    );
}
