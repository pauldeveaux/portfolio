import clsx from "clsx";


/**
 * Props for the `WaveStyleSeparator` component.
 */
export interface WaveStyleSeparatorProps {
    /**
     * Tailwind CSS class to apply to the `<path>` element for setting the fill color.
     * Example: `"fill-gray-200"` or `"fill-[#107E7D]"`.
     */
    nextBackground?: string; // Use tailwind fill-*

    /**
     * Height of the wave separator in pixels.
     * This controls the `h-` class applied to the SVG container.
     */
    height: number;

    /**
     * SVG path string defining the shape of the wave.
     * Default: `"M0,64L1440,192L1440,0L0,0Z"`.
     * Can be replaced with a custom cubic or quadratic Bezier path for smoother waves.
     */
    shape?: string;

    /**
     * Rotation of the SVG in degrees.
     * Default is `0`.
     */
    rotation?: number;

    /**
     * Flip the SVG horizontally if `true`.
     * Default is `false`.
     */
    flipX?: boolean;

    /**
     * Flip the SVG vertically if `true`.
     * Default is `false`.
     */
    flipY?: boolean;

    /**
     * Additional className
     */
    className?: string;
}


/**
 * A wave-style SVG separator component that can be used
 * to create smooth transitions between sections with
 * customizable height, shape, rotation, and flip transformations.
 *
 * @param nextBackground - Tailwind CSS class for the fill color of the wave.
 * @param height - Height of the wave separator in pixels.
 * @param shape - SVG path string defining the wave shape.
 * @param rotation - Rotation of the SVG in degrees.
 * @param flipX - Whether to flip the SVG horizontally.
 * @param flipY - Whether to flip the SVG vertically.
 * @param className - Additional className
 *
 * @param className
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
export default function WaveStyleSeparator(
    {
        nextBackground,
        height,
        shape = "M0,64L1440,192L1440,0L0,0Z",
        rotation = 0,
        flipX = false,
        flipY = false,
        className = ""
    }: WaveStyleSeparatorProps)
{

    const rotationClassName = `rotate-${rotation}`
    const flipXClassName = flipX? "scale-x-[-1]" : ""
    const flipYClassName = flipY? "scale-y-[-1]" : ""

    return (
        <div className="w-full overflow-hidden leading-none">
            <svg
                className={clsx("w-full", className, rotationClassName, flipXClassName, flipYClassName)}
                style={{ height: `${height}px` }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    className={nextBackground}
                    d={shape}
                />
            </svg>
        </div>
    )
}