import { useEffect, useState } from "react";

/**
 * Custom React hook to dynamically get the height of a header element.
 *
 * This is useful when you need to calculate offsets for scrolling,
 * sticky positioning, or other layout-dependent behaviors.
 *
 * @param selector - CSS selector of the header element. Default is `"header"`.
 * @returns The height of the header element in pixels.
 *
 * @example
 * ```ts
 * const headerHeight = useHeaderHeight(); // default: selects <header>
 * const headerHeight = useHeaderHeight("#main-header"); // custom selector
 * ```
 */
export function useHeaderHeight(selector = "header") {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    /** Recalculate header height */
    const updateHeight = () => {
      const header = document.querySelector<HTMLElement>(selector);
      if (header) {
        setHeight(header.offsetHeight);
      }
    };

    // Initial height calculation on mount
    updateHeight();

    // Update height whenever the window resizes
    window.addEventListener("resize", updateHeight);

    // Cleanup the listener when component unmounts
    return () => window.removeEventListener("resize", updateHeight);
  }, [selector]);

  return height;
}
