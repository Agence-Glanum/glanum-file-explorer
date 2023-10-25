import { useVirtualizer } from "@tanstack/react-virtual"
import React, { cloneElement, useEffect } from "react"
import { ReactElement, useRef } from "react"
import { cn } from "../../utils/cn"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    estimateWidth?: number
    estimeHeight?: number
    columns?: number
    onSrollEnd?: () => void
    children: ReactElement[]|ReactElement
}

const Grid = ({
    className,
    columns = 5,
    estimateWidth = 75,
    estimeHeight = 75,
    onSrollEnd,
    children,
    ...props
}: GridProps) => {

    const parentRef = useRef(null)

    const rows = Array.isArray(children) ? children : [children]
    const rowCount = Math.ceil(rows.length / columns)


    const rowVirtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimeHeight,
        overscan: 5,
    })

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: columns,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateWidth,
        overscan: 5,
    })

    useEffect(() => {
        if (!onSrollEnd) {
            return
        }

        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

        if (!lastItem) {
          return
        }
    
        if (lastItem.index >= rowCount - 1 ) {
            onSrollEnd()
        }
    }, [rowVirtualizer.getVirtualItems()])

  return (
    <>
      <div
        ref={parentRef}
        className={cn(
            "h-[500px] w-[500px] overflow-auto",
            className
        )}
        {...props}
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
                const row = rows[(virtualRow.index * columns) + virtualColumn.index]

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

Grid.displayName = "VirtualizerGrid"

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    estimateSize?: number
    children: ReactElement[]|ReactElement
}


const List = ({className, estimateSize = 35, children, ...props}: ListProps) => {

    const parentRef = useRef(null)

    const rows = Array.isArray(children) ? children : [children]
    const count = rows.length + 1

    const rowVirtualizer = useVirtualizer({
        count,
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

                    if (!row) {
                        return null
                    }

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
                            className="w-full flex items-center"
                        >
                            {cloneElement(row)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

List.displayName = "VirtualizerList"

export { Grid, List }
