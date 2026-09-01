"use client";
import React, { useRef, useEffect, useCallback } from "react";
import CarouselCard, { CarouselCardProps } from "@/components/ui/carousel/CarouselCard";

/** Props for the Carousel component */
interface CarouselProps {
  /** List of card data to display inside the carousel */
  cards: Array<CarouselCardProps>;
}

const AUTO_SPEED = 0.05;
const FRICTION = 0.005;

/**
 * Infinite, auto-scrolling horizontal carousel component with mouse and touch drag support.
 *
 * Uses CSS transform instead of scrollLeft for reliable cross-browser animation.
 * Supports manual dragging with momentum and seamless infinite looping.
 */
export default function Carousel({ cards }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const velocityRef = useRef(0);
  const autoDirectionRef = useRef(1); // 1 = right, -1 = left
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const getBreakpoint = useCallback(() => {
    const firstCard = cardRef.current;
    const track = trackRef.current;
    if (!firstCard || !track) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return cards.length * (firstCard.offsetWidth + gap);
  }, [cards.length]);

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
  }, []);

  /** Main animation loop */
  useEffect(() => {
    const step = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current);
      lastTsRef.current = ts;

      const bp = getBreakpoint();

      if (!isDraggingRef.current && bp > 0) {
        if (Math.abs(velocityRef.current) > 0.01) {
          velocityRef.current *= Math.exp(-FRICTION * dt);
          offsetRef.current -= velocityRef.current * dt;
          if (Math.abs(velocityRef.current) < 0.01) velocityRef.current = 0;
        } else {
          offsetRef.current += AUTO_SPEED * dt * autoDirectionRef.current;
        }

        // Wrap around for infinite loop
        while (offsetRef.current >= bp) offsetRef.current -= bp;
        while (offsetRef.current < 0) offsetRef.current += bp;

        applyTransform();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [getBreakpoint, applyTransform]);

  /** Mouse drag handler */
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;

    const startX = e.pageX;
    const startOffset = offsetRef.current;
    let lastX = startX;
    let lastTime = performance.now();

    const onMouseMove = (ev: MouseEvent) => {
      const curX = ev.pageX;
      const now = performance.now();
      const dx = curX - startX;
      const bp = getBreakpoint();

      let newOffset = startOffset - dx;
      if (bp > 0) {
        while (newOffset >= bp) newOffset -= bp;
        while (newOffset < 0) newOffset += bp;
      }
      offsetRef.current = newOffset;
      applyTransform();

      const dt = Math.max(1, now - lastTime);
      velocityRef.current = ((curX - lastX) / dt) * 0.8;
      lastX = curX;
      lastTime = now;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      if (Math.abs(velocityRef.current) > 0.01) {
        autoDirectionRef.current = velocityRef.current > 0 ? -1 : 1;
      }
      isDraggingRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  /** Touch drag handler with vertical scroll detection */
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;

    const startX = e.touches[0].pageX;
    const startY = e.touches[0].pageY;
    const startOffset = offsetRef.current;
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
      const bp = getBreakpoint();

      let newOffset = startOffset - dx;
      if (bp > 0) {
        while (newOffset >= bp) newOffset -= bp;
        while (newOffset < 0) newOffset += bp;
      }
      offsetRef.current = newOffset;
      applyTransform();

      const dt = Math.max(1, now - lastTime);
      velocityRef.current = ((curX - lastX) / dt) * 1.5;
      lastX = curX;
      lastTime = now;

      if (ev.cancelable) ev.preventDefault();
    };

    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      window.removeEventListener("touchend", onTouchEnd as EventListener);
      if (Math.abs(velocityRef.current) > 0.01) {
        autoDirectionRef.current = velocityRef.current > 0 ? -1 : 1;
      }
      isDraggingRef.current = false;
    };

    window.addEventListener("touchmove", onTouchMove as EventListener, { passive: false });
    window.addEventListener("touchend", onTouchEnd as EventListener);
  };

  /** Repeat cards to create seamless infinite loop */
  const repeatCount = cards.length === 1 ? 5 : cards.length <= 3 ? 3 : 2;
  const skillsArray = Array.from({ length: repeatCount }).flatMap(() => cards);

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto py-5 overflow-hidden touch-pan-x"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{ touchAction: "pan-y", cursor: "grab" }}
    >
      <div
        ref={trackRef}
        className="flex justify-start gap-6 will-change-transform"
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
    </div>
  );
}
