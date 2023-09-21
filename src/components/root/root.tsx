import { ReactNode, createContext, useEffect, useState } from 'react'

type File = {
    id: string
    type: string
    name: string
    meta?: {
        url?: string
        parentDirId?: string
        thumbnail?: string
    }
}

type DirectoryFiles = {
    files: File[]
    id: string
}

export interface InternalFile extends File {
    children?: InternalFile[]
}

type RootProps = {
    defaultFiles: DirectoryFiles,
    updatedFiles: DirectoryFiles|null
    children: ReactNode|ReactNode[]
}

const convertToInternalFiles = (files: File[]) => {
    return files.map((file) => {
        if (file.type !== "directory") {
            return file
        }

        return {
            ...file,
            children: []
        }
    })
}

export function searchTree(file: InternalFile, fileId: string): InternalFile|null {
    if(file.id === fileId){
         return file
    }
    
    if (file.children){
         let i
         let result = null

         for(i=0; result === null && i < file.children.length; i++){
              result = searchTree(file.children[i], fileId)
         }

         return result
    }

    return null;
}

export const RootContext = createContext<{files: InternalFile[], current: string}>({files: [], current: ""})

const Root = ({defaultFiles, updatedFiles, children}: RootProps) => {
    const [files, setFiles] = useState(convertToInternalFiles(defaultFiles.files))

    useEffect(() => {
        if (updatedFiles && updatedFiles.files.length > 0) {
            setFiles((oldFiles) => oldFiles.map((file) => {
                const parentDirectory = searchTree(file, updatedFiles.id)

                if (parentDirectory)  {
                    parentDirectory.children = convertToInternalFiles(updatedFiles.files)
                }
                
                return file
            }))
        }
    }, [updatedFiles, setFiles])

    const setCurrent = (updatedFiles: DirectoryFiles|null, defaultDirectory: DirectoryFiles) => {
        if (!updatedFiles) {
            return defaultDirectory.id
        }

        return updatedFiles.id
    }
    
    return (
        <RootContext.Provider value={{files, current: setCurrent(updatedFiles, defaultFiles)}}>
            {children}
        </RootContext.Provider>
    )
}

Root.displayName = "Root"

export { Root }