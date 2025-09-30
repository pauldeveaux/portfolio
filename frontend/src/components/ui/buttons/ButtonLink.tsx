import React from "react";
import clsx from "clsx";
import { useHeaderHeight } from "@/utils/headerHeight";


interface ButtonLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    href: string;
    block?: ScrollLogicalPosition
}

export default function ButtonLink({ children, href, block="center", onClick, className, ...other }: ButtonLinkProps) {
    const headerHeight = useHeaderHeight();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isMobile = window.innerWidth < 640;
        const element = document.getElementById(href);

        if (element){
            const elementTop = element.getBoundingClientRect().top + window.scrollY;

            if (block === "start") {
                const offset = isMobile ? 0 : headerHeight;
                window.scrollTo({
                    top: elementTop - offset,
                    behavior: "smooth",
                });
            } else {
                element.scrollIntoView({ behavior: "smooth", block });
            }
        }

        // Handle additional onClick if provided
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