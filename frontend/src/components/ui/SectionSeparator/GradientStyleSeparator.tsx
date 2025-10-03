import clsx from "clsx";


export interface GradientSeparatorProps {
    bgClassName: string;
    maskBgClassName?: string;
    height?: number;
}

export default function GradientStyleSeparator({bgClassName, maskBgClassName, height = 20}: GradientSeparatorProps) {
    const heightClassName = `h-${height}`

    return (
        <div className={"relative bottom-0 w-full h-20"}>
            <div className={clsx("bottom-0 left-0 w-full h-full", bgClassName)}/>
            {maskBgClassName && (
                <div className={clsx("absolute inset-0 pointer-events-none", heightClassName, maskBgClassName)}/>
            )}
        </div>
    )
}