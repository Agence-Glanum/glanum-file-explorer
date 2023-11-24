import { ColumnDef, Row, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import React from "react"
import { File } from "../../../types/file"
import { useVirtualizer } from "@tanstack/react-virtual"
import { observer } from "@legendapp/state/react"
import { state } from "../../../stores/mix"

interface MixFileTableProps {
    data: File[]
    fetchNextPage: () => void
}

const MixFileTable = observer(function MixFileTable({data, fetchNextPage}: MixFileTableProps) {

    const tableContainerRef = React.useRef<HTMLDivElement>(null)
  
    const sorting = state.sorting.get()
    const isLoading = state.filesState.loading.get()
    const totalCount = state.filesState.meta.total.get()

    const columns = React.useMemo<ColumnDef<File>[]>(
      () => [
        {
          accessorKey: 'name',
          cell: info => info.getValue(),
        },
      ],
      []
    )
  
    const totalFetched = data.length
  
    const fetchMoreOnBottomReached = React.useCallback(
      (containerRefElement?: HTMLDivElement | null) => {
        if (containerRefElement) {
          const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        
          if (
            scrollHeight - scrollTop - clientHeight < 300 &&
            !isLoading &&
            totalFetched < totalCount
          ) {
            fetchNextPage()
          }
        }
      },
      [isLoading, totalFetched, totalCount]
    )
  
    React.useEffect(() => {
      fetchMoreOnBottomReached(tableContainerRef.current)
    }, [fetchMoreOnBottomReached])
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
      },
      onSortingChange: (sort) => state.sorting.set(sort),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
    })
  
    const { rows } = table.getRowModel()
  
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => tableContainerRef.current,
        estimateSize: () => 45,
        overscan: 5,
    })
    const { getTotalSize, getVirtualItems } = rowVirtualizer
    const virtualRows = getVirtualItems()
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
    const paddingBottom =
      virtualRows.length > 0
        ? getTotalSize() - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0
  
    if (isLoading) {
      return <>Loading...</>
    }
  
    return (
      <div className="p-2">
        <div className="h-2" />
        <div
          className="h-[500px]"
          onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
          ref={tableContainerRef}
        >
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map(virtualRow => {
                const row = rows[virtualRow.index] as Row<File>
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
})

export default MixFileTable