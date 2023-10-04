import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import React from "react";

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

const GridItem = ({ className, asChild = false, ...props }: GridItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp
        className={cn(
            "border cursor-pointer",
            className
        )}
        {...props}
     />;
}

GridItem.displayName = "FolderContentExplorerItem"

export { GridItem }