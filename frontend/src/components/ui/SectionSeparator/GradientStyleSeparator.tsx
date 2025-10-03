import clsx from "clsx";


export interface GradientSeparatorProps{
    firstColorClassName: string;
    secondColorClassName: string;
}

export default function GradientStyleSeparator({firstColorClassName, secondColorClassName} : GradientSeparatorProps){

    const bgClassName = `bg-gradient-to-b from-${firstColorClassName} to-${secondColorClassName}`

    return (
        <div className={clsx("bottom-0 left-0 w-full h-20", bgClassName)}></div>
    )
}