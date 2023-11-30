import { Row, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import React from "react"
import { File } from "../../../types/file"
import { useVirtualizer } from "@tanstack/react-virtual"
import { observer } from "@legendapp/state/react"
import { fetchFiles, state } from "../../../stores/mix"
import { FileExplorerReturnType } from "../../../hooks/use-file-explorer"
import { Skeleton } from "../../skeleton/skeleton"

interface MixFileTableProps extends FileExplorerReturnType {}

const MixFileTable = observer(function MixFileTable({currentFolderContent, updateFolder}: MixFileTableProps) {

    const tableContainerRef = React.useRef<HTMLDivElement>(null)
  
    const sorting = state.sorting.get()
    const isLoading = state.filesState.loading.get()
    const totalCount = state.filesState.meta.total.get()

    const columnHelper = createColumnHelper<File>()

    const columns = [
        columnHelper.accessor('name', {
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('updated_at', {
          cell: info => info.getValue(),
        }),
    ]
  
    const totalFetched = currentFolderContent.length
    const nextUrl = state.filesState.links.next.get()
  
    const fetchMoreOnBottomReached = React.useCallback(
      (containerRefElement?: HTMLDivElement | null) => {
        if (containerRefElement) {
          const { scrollHeight, scrollTop, clientHeight } = containerRefElement
          if (
            scrollHeight - scrollTop - clientHeight < 300 &&
            !isLoading &&
            totalFetched < totalCount
          ) {
            fetchFiles({
                url: nextUrl, 
                onSuccess: (data) => updateFolder(data, {partial: true})
            })
          }
        }
      },
      [isLoading, totalFetched, totalCount, nextUrl]
    )
  
    React.useEffect(() => {
      fetchMoreOnBottomReached(tableContainerRef.current)
    }, [fetchMoreOnBottomReached])
  
    const table = useReactTable({
      data: currentFolderContent,
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
  
    return (
      <>
        <div className="mt-1 space-y-2">
          {isLoading && currentFolderContent.length === 0? [...Array(15).keys()].map(() => (
            <Skeleton className="h-[50px] w-full"/>
          )): null}
        </div>
        <div
          className="h-[500px] overflow-auto"
          onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
          ref={tableContainerRef}
        >
          <table className="table-fixed w-full">
            <thead className="sticky top-0">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-50 border-y border-gray-200">
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                        className="p-3 text-xl text-left"
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
                        <td key={cell.id} className="p-5 border-b border-gray-200">
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
      </>
      
    )
})

export default MixFileTable