import React from "react";
import clsx from "clsx";
import { useHeaderHeight } from "@/utils/headerHeight";

/** Props for the ButtonLink component */
interface ButtonLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button content */
    children: React.ReactNode;
    /** Target element ID or URL fragment */
    href: string;
    /** Scroll alignment when navigating to target (default: "center") */
    block?: ScrollLogicalPosition;
}

/**
 * ButtonLink component.
 *
 * Acts like a button that scrolls smoothly to a target element.
 * Accounts for header height when `block="start"` and responsive layout.
 */
export default function ButtonLink({
    children,
    href,
    block = "center",
    onClick,
    className,
    ...other
}: ButtonLinkProps) {
    const headerHeight = useHeaderHeight();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isMobile = window.innerWidth < 640;
        const element = document.getElementById(href);

        if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;

            if (block === "start") {
                // Adjust for header height on desktop
                const offset = isMobile ? 0 : headerHeight;
                window.scrollTo({
                    top: elementTop - offset,
                    behavior: "smooth",
                });
            } else {
                element.scrollIntoView({ behavior: "smooth", block });
            }
        }

        // Call additional onClick if provided
        if (onClick) onClick(e);
    };

    return (
        <button
            onClick={handleClick}
            className={clsx("hover:cursor-pointer", className)}
            {...other}
        >
            {children}
        </button>
    );
}
