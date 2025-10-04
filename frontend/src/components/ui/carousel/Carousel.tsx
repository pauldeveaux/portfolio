"use client";
import React, { useRef, useEffect, useState } from "react";
import CarouselCard, { CarouselCardProps } from "@/components/ui/carousel/CarouselCard";

/** Props for the Carousel component */
interface CarouselProps {
  /** List of card data to display inside the carousel */
  cards: Array<CarouselCardProps>;
}

/**
 * Infinite, auto-scrolling horizontal carousel component with mouse and touch drag support.
 *
 * - Automatically scrolls horizontally with base speed.
 * - Supports manual dragging with momentum.
 * - Touch gestures detect vertical scrolling and disable horizontal movement.
 * - Seamlessly loops through the same set of cards for an infinite effect.
 */
export default function Carousel({ cards }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollBreakpointRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef(0); // horizontal scroll speed for momentum
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  /** Main animation loop: auto-scroll and momentum scrolling */
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const firstCard = cardRef.current;
    if (!scrollContainer || !firstCard) return;

    const AUTO_SPEED = 0.05; // px/ms (~50px/s)
    const FRICTION = 0.005;  // exponential decay for momentum

    const step = (ts: number) => {
      if (!scrollContainer || !firstCard) return;
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current);
      lastTsRef.current = ts;

      // Compute total scroll width for one full loop
      const style = getComputedStyle(scrollContainer);
      const gap = parseFloat(style.columnGap || style.gap || "0");
      scrollBreakpointRef.current = cards.length * (firstCard.offsetWidth + gap);

      if (!isDragging) {
        const autoDirection = velocityRef.current !== 0 ? Math.sign(velocityRef.current) : 1;

        // Apply momentum if present
        if (Math.abs(velocityRef.current) > 0) {
          velocityRef.current *= Math.exp(-FRICTION * dt);
          if (Math.abs(velocityRef.current) < AUTO_SPEED) velocityRef.current = AUTO_SPEED * autoDirection;
          let nextScroll = scrollContainer.scrollLeft - velocityRef.current * dt;
          nextScroll = nextScroll < 0
            ? scrollBreakpointRef.current + (nextScroll % scrollBreakpointRef.current)
            : nextScroll % scrollBreakpointRef.current;
          scrollContainer.scrollLeft = nextScroll;
        } else {
          // Default auto-scroll
          let nextScroll = scrollContainer.scrollLeft - AUTO_SPEED * dt;
          nextScroll = nextScroll < 0
            ? scrollBreakpointRef.current + (nextScroll % scrollBreakpointRef.current)
            : nextScroll % scrollBreakpointRef.current;
          scrollContainer.scrollLeft = nextScroll;
        }
      }

      // Keep scroll position within loop range
      if (scrollBreakpointRef.current > 0) {
        scrollContainer.scrollLeft %= scrollBreakpointRef.current;
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

  /** Mouse drag handler for horizontal scroll with momentum */
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

      scrollContainer.scrollLeft =
        scrollPos < 0
          ? scrollBreakpointRef.current + (scrollPos % scrollBreakpointRef.current)
          : scrollPos % scrollBreakpointRef.current;

      const dt = Math.max(1, now - lastTime);
      velocityRef.current = ((curX - lastX) / dt) * 0.2;
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

  /** Touch drag handler with vertical scroll detection */
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    setIsDragging(true);
    velocityRef.current = 0;

    const startX = e.touches[0].pageX;
    const startY = e.touches[0].pageY;
    const scrollLeftStart = scrollContainer.scrollLeft;
    let lastX = startX;
    let lastTime = performance.now();
    let isVerticalScroll = false;

    const onTouchMove = (ev: TouchEvent) => {
      const curX = ev.touches[0]?.pageX ?? lastX;
      const curY = ev.touches[0]?.pageY ?? startY;
      const dx = curX - startX;
      const dy = curY - startY;

      if (!isVerticalScroll && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) isVerticalScroll = true;
      if (isVerticalScroll) return;

      const now = performance.now();
      const scrollPos = scrollLeftStart - dx;

      scrollContainer.scrollLeft =
        scrollPos < 0
          ? scrollBreakpointRef.current + (scrollPos % scrollBreakpointRef.current)
          : scrollPos % scrollBreakpointRef.current;

      const dt = Math.max(1, now - lastTime);
      velocityRef.current = ((curX - lastX) / dt) * 1.5;
      lastX = curX;
      lastTime = now;

      if (ev.cancelable) ev.preventDefault();
    };

    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      window.removeEventListener("touchend", onTouchEnd as EventListener);
      setIsDragging(false);
    };

    window.addEventListener("touchmove", onTouchMove as EventListener, { passive: false });
    window.addEventListener("touchend", onTouchEnd as EventListener);
  };

  /** Repeat cards to create seamless infinite loop */
  const repeatCount = cards.length === 1 ? 5 : cards.length <= 3 ? 3 : 2;
  const skillsArray = Array.from({ length: repeatCount }).flatMap(() => cards);

  return (
    <div
      ref={scrollRef}
      className="flex max-w-4xl mx-auto justify-start gap-6 py-5 overflow-x-hidden scrollbar-hide touch-pan-x"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{ touchAction: "pan-y", cursor: "grab" }}
    >
      {skillsArray.map((skill, index) => (
        <div
          key={index}
          ref={index === 0 ? cardRef : null}
          className="shrink-0 select-none h-64"
        >
          <CarouselCard name={skill.name} description={skill.description} />
        </div>
      ))}
    </div>
  );
}
