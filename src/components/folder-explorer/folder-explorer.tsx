import { Slot } from '@radix-ui/react-slot';
import { cn } from "../../utils/cn";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
    depth?: number
}

const Item = ({ className, asChild = false, ...props }: ItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            className={cn(
                "flex border w-fit rounded cursor-pointer",
                className
            )}
            {...props}
        />
     )
}

Item.displayName = "TreeExplorerItem"

export { Item }