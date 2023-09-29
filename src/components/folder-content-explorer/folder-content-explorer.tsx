import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import { ReactElement, cloneElement, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
    estimateSize?: number
    children: ReactElement[]|ReactElement
}

const Root = ({className, estimateSize = 75, children}: RootProps) => {

    const parentRef = useRef(null)

    const rows = Array.isArray(children) ? children : [children]

    const column = 5

    const rowVirtualizer = useVirtualizer({
        count: Math.ceil(rows.length / column),
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
        overscan: 5,
    })

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: column,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
        overscan: 5,
    })

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `500px`,
          width: `500px`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <React.Fragment key={virtualRow.index}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                const row = rows[virtualRow.index + virtualColumn.index]

                if (!row) {
                    return null
                }

                return (
                    <div
                        key={virtualColumn.index}
                        className={
                            virtualColumn.index % 2
                            ? virtualRow.index % 2 === 0
                                ? 'ListItemOdd'
                                : 'ListItemEven'
                            : virtualRow.index % 2
                            ? 'ListItemOdd'
                            : 'ListItemEven'
                        }
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: `${virtualColumn.size}px`,
                            height: `${virtualRow.size}px`,
                            transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                        }}
                    >
                        {cloneElement(row)}
                    </div>
                )})}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

const Item = ({ className, asChild = false, ...props }: ItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp
        className={cn(
            "border cursor-pointer",
            className
        )}
        {...props}
     />;
}

Item.displayName = "FolderContentExplorerItem"

export { Root, Item }