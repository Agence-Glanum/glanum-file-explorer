import { Slot } from '@radix-ui/react-slot';
import { cn } from "../../utils/cn";
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

type IconElement = IconProps & React.RefAttributes<SVGSVGElement>
interface OpenIncatorProps extends IconElement {
    open: boolean
}

const OpenIndicator = ({ className, open, ...props }: OpenIncatorProps) => {
    return (
        <ChevronRightIcon
            className={cn(
                "transition",
                open ? "rotate-90": "rotate-0",
                className
            )}
            {...props}
        />
    )
}


OpenIndicator.displayName = "TreeExplorerOpenIndicator"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
   
}

const Item = ({ className, asChild = false, ...props }: ItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            className={cn(
                "relative",
                className
            )}
            {...props}
        />
     )
}

Item.displayName = "TreeExplorerItem"

type DepthIndicatorProps = {
    className?: string | undefined
    depth?: number
    offset?: number
}

const DepthIndicator = ({ className, depth = 0, offset = 15}: DepthIndicatorProps) => {
    return (
        <>
            {[...Array(depth).keys()].map((depth) => (
                <div
                    key={depth}
                    className={cn(
                        "absolute top-[1px] bottom-[1px] border-l border-dashed border-gray-300 ",
                        className
                    )}
                    style={{left: offset * depth}}
                />
            ))}
        </>
    )
}

DepthIndicator.displayName = "TreeExplorerDepthIndicator"

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
    depth?: number
    offset?: number
}

const Content = ({ className, depth = 0, offset = 15, asChild = false, ...props }: ContentProps) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
        <Comp
            className={cn(
                "absolute top-[2px] bottom-[2px] flex border w-fit rounded cursor-pointer",
                className
            )}
            style={{left: offset * depth}}
            {...props}
        />
    )
}

Content.displayName = "TreeExplorerContent"


export { Item, DepthIndicator, Content, OpenIndicator }