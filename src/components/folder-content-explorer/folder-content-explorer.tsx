import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import React, { useEffect, useImperativeHandle, useRef } from "react";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

const ListItem = ({ className, asChild = false, ...props }: ListItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp
        className={cn(
            "w-full flex items-center text-gray-800 cursor-pointer",
            className
        )}
        {...props}
     />
}

ListItem.displayName = "FolderContentExplorerListItem"

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
}

const GridItem = ({ className, asChild = false, ...props }: GridItemProps) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp
        className={cn(
            "text-gray-800",
            className
        )}
        {...props}
     />
}

GridItem.displayName = "FolderContentExplorerGridItem"

interface RenameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onClickOutside?: (value: string) => void
}

const RenameInput =  React.forwardRef<HTMLInputElement, RenameInputProps>(({ className, onClickOutside, ...props }, ref) => {
    
    const innerRef = useRef<HTMLInputElement>(null)
    
    useImperativeHandle(ref, () => {
        return innerRef.current as HTMLInputElement ?? {}
      }, [])

    useEffect(() => {
        if(innerRef) {
            setTimeout(() => {
                innerRef.current?.select()
            }, 100)
        }
    }, [])

    useEffect(() => {
        function handleClickOutside(event: any) {
          if (innerRef && innerRef.current && !innerRef.current.contains(event.target)) {
            onClickOutside && onClickOutside(innerRef.current.value)
          }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }, [innerRef])

    return (
        <input
            className={cn(
                "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={innerRef}
            {...props}
        />
     )
})

RenameInput.displayName = "FolderContentExplorerRenameInput"

export { ListItem, GridItem, RenameInput }