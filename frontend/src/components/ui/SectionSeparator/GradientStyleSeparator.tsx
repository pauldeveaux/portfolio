import clsx from "clsx";


export interface GradientSeparatorProps{
    bgClassName: string;
    maskBgClassName?: string;
}

export default function GradientStyleSeparator({bgClassName, maskBgClassName} : GradientSeparatorProps){
    return (
        <div className="relative bottom-0 w-full h-20">
            <div className={clsx("bottom-0 left-0 w-full h-20", bgClassName)}/>
            {maskBgClassName && (
                <div className={clsx("absolute inset-0 pointer-events-none", maskBgClassName)}/>
            )}
        </div>
    )
}