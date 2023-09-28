import { ReactElement, cloneElement, useRef } from "react";
import { Slot } from '@radix-ui/react-slot';
import { cn } from "../../utils/cn";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../context-menu/context-menu";

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
    estimateSize?: number
    children: ReactElement[]|ReactElement
}

const Root = ({className, estimateSize = 35, children, ...props}: RootProps) => {

    const parentRef = useRef(null)

    const rows = Array.isArray(children) ? children : [children]

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
        overscan: 5,
    })

    return (
        <div
            ref={parentRef}
            className={cn(
                "h-96 w-40 overflow-auto",
                className
            )}
            {...props}
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const row = rows[virtualRow.index]

                    return cloneElement(row, {
                        key: virtualRow.index, 
                        style: {
                            position: 'absolute',
                            top: 0,
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                            ...row.props.style
                        }
                    })
                })}
            </div>
        </div>
    )
}

Root.displayName = "TreeExplorerRoot"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
    depth?: number
}

const Item = ({ className, asChild = false,...props }: ItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Comp
                    className={cn(
                        "flex mb-2 py-1 px-2 border w-fit rounded cursor-pointer",
                        className
                    )}
                    {...props}
                />
                </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem>Subscription</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
     )
}

Item.displayName = "TreeExplorerItem"

export { Root, Item }