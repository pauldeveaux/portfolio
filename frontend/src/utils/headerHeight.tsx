import { useEffect, useState } from "react";

/**
 * Custom hook to get the height of the header element dynamically.
 * @param selector - The CSS selector for the header element. Default is "header".
 * @returns The height of the header element in pixels.
 */
export function useHeaderHeight(selector = "header") {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector<HTMLElement>(selector);
      if (header) {
        setHeight(header.offsetHeight);
      }
    };

    // Initial calculation
    updateHeight();

    // Update on window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, [selector]);

  return height;
}
