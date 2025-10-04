'use client';
import { useState, useEffect } from 'react';

/**
 * Custom React hook to detect if the current viewport width is below a specified breakpoint.
 *
 * Useful for rendering mobile-specific components or behaviors.
 *
 * @param breakpoint - The viewport width (in pixels) below which the device is considered "mobile".
 *                     Default is `768`.
 * @returns A boolean indicating whether the viewport is currently "mobile".
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 *
 * return (
 *   <div>
 *     {isMobile ? <MobileMenu /> : <DesktopMenu />}
 *   </div>
 * );
 * ```
 */
export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        /** Checks if the viewport width is less than the breakpoint */
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkMobile();

        // Listen for window resize events to update mobile status dynamically
        window.addEventListener('resize', checkMobile);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}
