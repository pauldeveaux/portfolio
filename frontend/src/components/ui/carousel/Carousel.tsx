"use client";
import React, { useRef, useEffect, useState } from "react";
import CarouselCard, {CarouselCardProps} from "@/components/ui/carousel/CarouselCard";


interface CarouselProps {
    cards: Array<CarouselCardProps>;
}

export default function Carousel({ cards }: CarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const scrollBreakpointRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    // Auto-scroll effect, and infinite loop
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        const firstCard = cardRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        const scrollSpeed = 1;


        const scrollStep = () => {
            if(!scrollContainer || !firstCard) return;

            // Calculate the breakpoint loop based on card width and gap
            const style = getComputedStyle(scrollContainer);
            const gap = parseFloat(style.columnGap || style.gap || "0");

            scrollBreakpointRef.current = cards.length * (firstCard.offsetWidth + gap);

            scrollContainer.scrollLeft = scrollContainer.scrollLeft % scrollBreakpointRef.current;

            // Only auto-scroll if not dragging
            if(!isDragging) {
                scrollContainer.scrollLeft += scrollSpeed;
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        }

        animationFrameId = requestAnimationFrame(scrollStep);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isDragging, cards.length]);


    // Drag to scroll functionality
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>  ) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        setIsDragging(true);
        const startX = e.pageX;
        const scrollLeftStart = scrollContainer.scrollLeft;

        const onMouseMove = (eMove : MouseEvent) => {
            // Calculate the distance moved
            const dx = eMove.pageX - startX;
            const scrollPosition = scrollLeftStart - dx

            // Handle infinite scroll effect when dragging
            if (scrollPosition < 0)
                scrollContainer.scrollLeft = scrollBreakpointRef.current + (scrollPosition % scrollBreakpointRef.current);
            else
                scrollContainer.scrollLeft = scrollPosition % scrollBreakpointRef.current;
        }

        // Cleanup event listeners on mouse up
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            setIsDragging(false);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    // To ensure there are enough cards to fill the carousel width, we repeat the cards array
    const repeatCount = cards.length === 1 ? 5 : cards.length <= 3 ? 3 : 2;
    const skillsArray = Array.from({ length: repeatCount }).flatMap(() => cards);

    return (
        <div
            ref={scrollRef}
            className={`flex max-w-4xl mx-auto justify-start gap-6 py-12 overflow-x-hidden scrollbar-hide cursor-grab`}
            onMouseDown={(e) => { setIsDragging(true); onMouseDown(e); }}
        >
            {skillsArray.map((skill, index) => (
                <div key={index} ref={index === 0 ? cardRef : null} className="shrink-0 select-none h-64">
                    <CarouselCard key={index} name={skill.name} description={skill.description}/>
                </div>
            ))}
        </div>
    );
}
