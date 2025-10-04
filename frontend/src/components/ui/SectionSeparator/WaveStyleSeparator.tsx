import clsx from "clsx";

/**
 * Props for the `WaveStyleSeparator` component.
 */
export interface WaveStyleSeparatorProps {
    /** Tailwind CSS class to apply to the `<path>` element for setting the fill color. Example: "fill-gray-200" or "fill-[#107E7D]". */
    nextBackground?: string;

    /** Height of the wave separator in pixels. This controls the SVG container height. */
    height: number;

    /** SVG path string defining the shape of the wave. Default: "M0,64L1440,192L1440,0L0,0Z". */
    shape?: string;

    /** Rotation of the SVG in degrees. Default is 0. */
    rotation?: number;

    /** Flip the SVG horizontally if true. Default is false. */
    flipX?: boolean;

    /** Flip the SVG vertically if true. Default is false. */
    flipY?: boolean;

    /** Additional CSS classes for the wrapper SVG element. */
    className?: string;
}

/**
 * WaveStyleSeparator component.
 *
 * Renders a customizable wave-shaped SVG separator to create smooth
 * transitions between sections. Supports height, shape, rotation,
 * horizontal and vertical flipping, and Tailwind-based fill colors.
 *
 * @param props - WaveStyleSeparatorProps
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <WaveStyleSeparator
 *   nextBackground="fill-gray-200"
 *   height={20}
 *   shape="M0,128 C480,192 960,64 1440,128 L1440,0 L0,0 Z"
 *   rotation={0}
 *   flipX={false}
 *   flipY={false}
 * />
 * ```
 */
export default function WaveStyleSeparator({
    nextBackground,
    height,
    shape = "M0,64L1440,192L1440,0L0,0Z",
    rotation = 0,
    flipX = false,
    flipY = false,
    className = ""
}: WaveStyleSeparatorProps) {

    // Tailwind rotation class (e.g., "rotate-90"). Only works with predefined Tailwind rotation utilities.
    const rotationClassName = `rotate-${rotation}`;
    // Horizontal flip
    const flipXClassName = flipX ? "scale-x-[-1]" : "";
    // Vertical flip
    const flipYClassName = flipY ? "scale-y-[-1]" : "";

    return (
        <div className="w-full overflow-hidden leading-none">
            <svg
                className={clsx("w-full", className, rotationClassName, flipXClassName, flipYClassName)}
                style={{ height: `${height}px` }} // Inline style used for dynamic height
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    className={nextBackground} // Tailwind fill color applied here
                    d={shape}
                />
            </svg>
        </div>
    );
}
