import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

const Item = ({ className, asChild = false,...props }: ItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp
        className={cn(
            "border p-4",
            className
        )}
        {...props}
     />;
}

Item.displayName = "FolderContentExplorerItem"

export { Item }