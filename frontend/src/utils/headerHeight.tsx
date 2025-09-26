
import { useEffect, useState } from "react";

/**
    * Custom hook to get the height of the header element.
    * @param selector - The CSS selector for the header element. Default is "header".
    * @returns The height of the header element in pixels.
    * Usage:
    * const headerHeight = useHeaderHeight();
 **/
export function useHeaderHeight(selector = "header") {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(selector);
    if (header) {
      setHeight(header.offsetHeight);
    }
  }, [selector]);

  console.log("Header height:", height);

  return height;
}
