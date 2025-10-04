"use client";
import React, {useRef, useEffect, useState, JSX} from "react";
import CarouselCard, { CarouselCardProps } from "@/components/ui/carousel/CarouselCard";

/**
 * Props for the Carousel component.
 */
interface CarouselProps {
  /** List of card data to display inside the carousel */
  cards: Array<CarouselCardProps>;
}

/**
 * Infinite, auto-scrolling horizontal carousel component with mouse and touch drag support.
 *
 * - Automatically scrolls horizontally with a configurable base speed.
 * - Supports manual dragging with momentum.
 * - Touch gestures detect vertical scrolling and disable horizontal movement accordingly.
 * - Seamlessly loops through the same set of cards for an infinite effect.
 *
 * @param {CarouselProps} props - List of cards to render.
 * @returns {JSX.Element} React component rendering the looping carousel.
 */
export default function Carousel({ cards }: CarouselProps): JSX.Element {
  /** Reference to the scrollable container element */
  const scrollRef = useRef<HTMLDivElement>(null);
  /** Reference to the first card (for width measurement) */
  const cardRef = useRef<HTMLDivElement>(null);
  /** Stores the total scroll width of one full loop (all cards + gaps) */
  const scrollBreakpointRef = useRef(0);
  /** Tracks whether the user is currently dragging */
  const [isDragging, setIsDragging] = useState(false);

  /** Current horizontal velocity (px/ms), used for momentum scrolling */
  const velocityRef = useRef(0);

  /** requestAnimationFrame handle for continuous animation */
  const rafRef = useRef<number | null>(null);
  /** Last animation frame timestamp for delta time calculation */
  const lastTsRef = useRef<number | null>(null);

  /**
   * Auto-scroll and momentum loop.
   * Runs continuously using requestAnimationFrame and handles:
   * - Continuous slow scroll when idle.
   * - Momentum effect after dragging stops.
   * - Infinite looping by resetting scroll position.
   */
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const firstCard = cardRef.current;
    if (!scrollContainer || !firstCard) return;

    const AUTO_SPEED = 0.05; // px/ms (~50px/s)
    const FRICTION = 0.005;  // exponential decay per ms for momentum

    const step = (ts: number) => {
      if (!scrollContainer || !firstCard) return;

      // Calculate time since last frame
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current);
      lastTsRef.current = ts;

      // Determine gap between cards from computed styles
      const style = getComputedStyle(scrollContainer);
      const gap = parseFloat(style.columnGap || style.gap || "0");

      // Width of one complete loop (all cards + gaps)
      scrollBreakpointRef.current = cards.length * (firstCard.offsetWidth + gap);

      // Only apply auto/momentum scroll when not dragging
      if (!isDragging) {
        const autoDirection = velocityRef.current !== 0 ? Math.sign(velocityRef.current) : 1;

        // If momentum is active
        if (Math.abs(velocityRef.current) > 0) {
          // Apply exponential friction decay
          velocityRef.current *= Math.exp(-FRICTION * dt);

          // Prevent velocity from dropping below base auto-speed
          if (Math.abs(velocityRef.current) < AUTO_SPEED) {
            velocityRef.current = AUTO_SPEED * autoDirection;
          }

          // Compute next scroll position
          let nextScroll = scrollContainer.scrollLeft - velocityRef.current * dt;

          // Infinite loop logic
          if (nextScroll < 0) {
            nextScroll = scrollBreakpointRef.current + (nextScroll % scrollBreakpointRef.current);
          } else if (nextScroll > scrollBreakpointRef.current) {
            nextScroll = nextScroll % scrollBreakpointRef.current;
          }

          scrollContainer.scrollLeft = nextScroll;
        } else {
          // Default auto-scroll (no momentum)
          let nextScroll = scrollContainer.scrollLeft - AUTO_SPEED * dt;

          // Infinite loop logic
          if (nextScroll < 0) {
            nextScroll = scrollBreakpointRef.current + (nextScroll % scrollBreakpointRef.current);
          } else if (nextScroll > scrollBreakpointRef.current) {
            nextScroll = nextScroll % scrollBreakpointRef.current;
          }

          scrollContainer.scrollLeft = nextScroll;
        }
      }

      // Maintain infinite loop visually
      if (scrollBreakpointRef.current > 0) {
        scrollContainer.scrollLeft =
          scrollContainer.scrollLeft % scrollBreakpointRef.current;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(step);

    // Cleanup when component unmounts
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [isDragging, cards.length]);

  /**
   * Handles mouse-based dragging.
   * Updates scroll position manually and computes momentum velocity.
   */
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

      // Infinite loop scroll behavior
      if (scrollPos < 0) {
        scrollContainer.scrollLeft =
          scrollBreakpointRef.current + (scrollPos % scrollBreakpointRef.current);
      } else {
        scrollContainer.scrollLeft = scrollPos % scrollBreakpointRef.current;
      }

      // Compute velocity for momentum
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

  /**
   * Handles touch dragging.
   * Detects whether the gesture is vertical or horizontal, blocking horizontal movement
   * when the user primarily scrolls vertically.
   */
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
    let isVerticalScroll = false; // Detects vertical scrolling intent

    const onTouchMove = (ev: TouchEvent) => {
      const curX = ev.touches[0]?.pageX ?? lastX;
      const curY = ev.touches[0]?.pageY ?? startY;
      const dx = curX - startX;
      const dy = curY - startY;

      // Detect vertical gesture if dy > dx significantly
      if (!isVerticalScroll && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
        isVerticalScroll = true;
      }

      // If it's a vertical scroll, do not affect horizontal movement
      if (isVerticalScroll) return;

      const now = performance.now();
      const scrollPos = scrollLeftStart - dx;

      // Infinite loop horizontal scroll
      if (scrollPos < 0) {
        scrollContainer.scrollLeft =
          scrollBreakpointRef.current + (scrollPos % scrollBreakpointRef.current);
      } else {
        scrollContainer.scrollLeft = scrollPos % scrollBreakpointRef.current;
      }

      // Update velocity for momentum
      const dt = Math.max(1, now - lastTime);
      const delta = curX - lastX;
      velocityRef.current = (delta / dt) * 1.5;
      lastX = curX;
      lastTime = now;

      // Prevent vertical page scroll only if allowed
      if (ev.cancelable) ev.preventDefault();
    };

    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      window.removeEventListener("touchend", onTouchEnd as EventListener);
      setIsDragging(false);
    };

    // Use passive: false to allow preventDefault inside move handler
    window.addEventListener("touchmove", onTouchMove as EventListener, { passive: false });
    window.addEventListener("touchend", onTouchEnd as EventListener);
  };

  /**
   * Repeat the card array multiple times to create a seamless infinite loop.
   * Repetition count scales with the number of unique cards.
   */
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
