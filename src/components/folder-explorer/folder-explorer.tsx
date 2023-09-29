import { ReactElement, cloneElement, useRef } from "react";
import { Slot } from '@radix-ui/react-slot';
import { cn } from "../../utils/cn";
import { useVirtualizer } from "@tanstack/react-virtual";
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

                    return (
                        <div
                            key={virtualRow.index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                                ...row.props.style
                            }}
                        >
                            {cloneElement(row)}
                        </div>
                    )
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

export { Root, Item }