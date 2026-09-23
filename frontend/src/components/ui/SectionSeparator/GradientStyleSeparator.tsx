import clsx from "clsx";

/**
 * Props for GradientStyleSeparator component.
 */
export interface GradientSeparatorProps {
    /** CSS classes for the main gradient background */
    bgClassName: string;
    /** Optional CSS classes for an overlay/mask on top of the gradient */
    maskBgClassName?: string;
    /** Height of the separator in pixels (default is 20) */
    height?: number;
}

/**
 * GradientStyleSeparator component.
 *
 * Renders a full-width horizontal gradient separator with optional masking overlay.
 * Useful for visually separating sections with gradient effects.
 *
 * @param props - GradientSeparatorProps
 * @returns JSX.Element
 */
export default function GradientStyleSeparator({
    bgClassName,
    maskBgClassName,
    height = 20
}: GradientSeparatorProps) {
    return (
        <div className="relative bottom-0 w-full" style={{ height: `${height * 4}px` }}>
            <div className={clsx("bottom-0 left-0 w-full h-full", bgClassName)} />

            {maskBgClassName && (
                <div className={clsx("absolute inset-0 pointer-events-none h-full", maskBgClassName)} />
            )}
        </div>
    );
}
