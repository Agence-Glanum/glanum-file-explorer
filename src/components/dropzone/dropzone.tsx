import { cn } from "../../utils/cn";
import { useDropzone } from "react-dropzone";
import { useCallback, useMemo } from "react";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean
    depth?: number
}

const Overlay = ({ className, asChild = false, ...props }: OverlayProps) => {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            className={cn(
                "absolute top-0 bottom-0 right-0 left-0 bg-gray-200/20",
                className
            )}
            {...props}
        />
     )
}

Overlay.displayName = "DropzoneOverlay"

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
    onNewFiles: (files: any) => void
}

const Root = ({ className, children, onNewFiles, ...props }: RootProps) => {

    const onDrop = useCallback(acceptedFiles => {
        onNewFiles(acceptedFiles)
    }, [onNewFiles])
      
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: true})

    const overlayComp = useMemo(() => {
        if (!Array.isArray(children)) {
            return null
        }

        return children.find((children) => 
            children.type.displayName === Overlay.displayName
        ) ?? null
    }, [children])

    const rest = useMemo(() => {
        if (!Array.isArray(children)) {
            return children
        }

        return children.filter((children) => 
            children.type.displayName !== Overlay.displayName
        )
    }, [children])

    return (
        <div
            className={cn(
                "relative flex border w-fit rounded",
                className
            )}
            {...getRootProps()}
            {...props}
        >
            {isDragActive ? overlayComp : null}
            <input {...getInputProps()} />
            {rest}
        </div>
     )
}

Root.displayName = "DropzoneRoot"

export { Root, Overlay }