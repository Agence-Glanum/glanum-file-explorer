import { useEffect, useState } from "react"
import { produce } from "immer"
import { v4 } from "uuid"
import { FolderFiles, File, Folder } from "../types/file"
import { convertToInternalFiles } from "../utils/convert-to-internal-files"

type Props = {
    defaultFolder?: FolderFiles,
}

export function useFileExplorer({defaultFolder}: Props) {
    const [store, setStore] = useState<Array<FolderFiles>>([])
    const [currentFolderId, setCurrentFolderId] = useState<string|null>(null)
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])

    useEffect(() => {
        if (defaultFolder) {
            setStore(produce((store) => {
                store.push(convertToInternalFiles(defaultFolder))
            }))
            setCurrentFolderId(defaultFolder.id)
        }
    }, [])


    const focusFolder = async (folderId: string) => {
        setSelectedFiles([])
        setCurrentFolderId(folderId)
    }

    const updateFolder = async (updatedFolder: FolderFiles, {refresh = false, partial = false}) => {
        setStore(produce((store) => {
            const folderIndex = store.findIndex((folder) => folder.id === updatedFolder.id)

            if (folderIndex !== -1) {

                if (refresh) {
                    store.splice(0, 1, convertToInternalFiles(updatedFolder))
                    return
                }

                if (partial) {
                    store[folderIndex].files.push(...convertToInternalFiles(updatedFolder).files)
                }

                return 
            }

            const childIndex = store.findIndex((folder) => folder.id === updatedFolder.metadata?.parentDirId)

            if (childIndex !== -1) {
                store.splice(childIndex + 1, 0, convertToInternalFiles(updatedFolder))
                return
            }

            const parentIndex = store.findIndex((folder) => folder.metadata?.parentDirId === updatedFolder.id)

            if (parentIndex !== -1) {
                if (parentIndex === 0) {
                    store.splice(0, 0, convertToInternalFiles(updatedFolder))
                    return
                }
                store.splice(parentIndex - 1, 0, convertToInternalFiles(updatedFolder))
                return
            }

            store.push(convertToInternalFiles(updatedFolder))
        }))
        await focusFolder(updatedFolder.id)
    }

    const updateFile = (file: File) => {
        setStore((draft) => {
            const id = file.metadata?.oldId ?? file.id

            return draft.map((folder) => {
                const foundFolder = folder.id === file.metadata?.parentDirId

                if (!foundFolder) {
                    return folder
                }

                const files = folder.files.map((f) => {
                    const foundFile = f.id === id
    
                    if (!foundFile) {
                        return f
                    }

                    return {
                        ...f,
                        ...file
                    }
                })

                return {
                    ...folder,
                    files
                }
            })
        })
    }

    const selectFile = (file: File|File[]) => {
        const files = Array.isArray(file) ? file : [file]

        setSelectedFiles(files)
    }

    const toggleSelectedFile = (file: File) => {
        setSelectedFiles((state) => {
            const foundFile = state.find((stateFile)  => stateFile.id === file.id)

            if (foundFile) {
                return state.filter((stateFile)  => stateFile.id !== file.id)
            }
            
            return [...state, file]
        })
    }

    const createTempFile = (
        parentFolderId: string,
        defaultFile?: Partial<File>
    ) => {
        const parentFolder = store.find((folder) => folder.id === parentFolderId)

        if (!parentFolder) {
            return
        }

        if (!parentFolder.sync) {
            return
        }

        const newFile = {
            id: v4(),
            type: defaultFile?.type ?? 'file',
            name: defaultFile?.name ?? 'New File',
            sync: defaultFile?.sync ?? false,
            ...(defaultFile ?? {}),
            metadata: {
                parentDirId: parentFolder.id,
                ...(defaultFile?.metadata ?? {})
            },
            created_at: new Date(),
            updated_at: null
        }

        setStore(produce((draft) => {
            const foundFolder = draft.find((folder) => folder.id === parentFolder.id)

            if (!foundFolder) {
                return
            }

            foundFolder.files.splice(0, 0, newFile)     
        }))


        return newFile
    }

    const createTempFolder = (parentFolder: string, defaultFolder?: Partial<File>) => {        
        return createTempFile(
            parentFolder, {
            name:  "New Folder",
            ...(defaultFolder ?? {}),
            type: 'folder'
         })
    }

    const isFileSelected = (fileId: string) => {
        return selectedFiles.find((selectFile) => selectFile.id === fileId) !== undefined
    }

    const removeFile = (file: File) => {
        setStore((draft) => {
            const id = file.metadata?.oldId ?? file.id

            return draft.map((folder) => {
                const foundFolder = folder.id === file.metadata?.parentDirId

                if (!foundFolder) {
                    return folder
                }

                const files = folder.files.filter((f) => f.id !== id)

                return {
                    ...folder,
                    files
                }
            })
        })
    }

    const folderExists = (folder: File) => {
        return store.find((f) => f.id === folder.id) !== undefined
    }

    const hasManySelectedFiles = selectedFiles.length > 1

    const currentFolder = store.find(((folder) => folder.id === currentFolderId)) ?? null

    const currentFolderContent = currentFolder ? (currentFolder as FolderFiles).files ?? [] : []

    return {
        currentFolder,
        currentFolderContent,
        updateFolder,
        focusFolder,
        store,
        updateFile,
        createTempFolder,
        createTempFile,
        selectedFiles,
        selectFile,
        isFileSelected,
        hasManySelectedFiles,
        toggleSelectedFile,
        removeFile,
        folderExists
    }
}

export type FileExplorerReturnType = ReturnType<typeof useFileExplorer>