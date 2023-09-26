import { ReactNode } from "react";
import { Slot } from '@radix-ui/react-slot';
import { cn } from "../../utils/cn";

type RootProps = {
    children: ReactNode|ReactNode[]
}

const Root = ({children}: RootProps) => {

    return (
        {children}
    )
}

Root.displayName = "TreeExplorerRoot"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
    depth?: number
}

const Item = ({ depth = 0, className, asChild = false,...props }: ItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp
        className={cn(
            "flex mb-2 py-1 px-2 border w-fit rounded cursor-pointer",
            className
        )}
        style={{marginLeft: 15 * depth}}
        {...props}
     />;
}

Item.displayName = "TreeExplorerItem"

export { Root, Item }