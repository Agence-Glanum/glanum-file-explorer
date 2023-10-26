import { useEffect, useState } from "react"
import { produce } from "immer"
import { v4 } from "uuid"
import { FolderFiles, File } from "../types/file"
import { convertToInternalFiles } from "../utils/convert-to-internal-files"

type Props = {
    defaultFolder: FolderFiles,
}

export function useFileExplorer({defaultFolder}: Props) {
    const [store, setStore] = useState<Array<FolderFiles>>([])
    const [currentFolderId, setCurrentFolderId] = useState<string|null>(null)
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])

    useEffect(() => {
        setStore(produce((store) => {
            store.push(convertToInternalFiles(defaultFolder))
        }))
        setCurrentFolderId(defaultFolder.id)
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

            const childIndex = store.findIndex((folder) => folder.id === updatedFolder.meta?.parentDirId)

            if (childIndex !== -1) {
                store.splice(childIndex + 1, 0, convertToInternalFiles(updatedFolder))
                return
            }

            const parentIndex = store.findIndex((folder) => folder.meta?.parentDirId === updatedFolder.id)

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

    const selectFile = (file: File|File[]) => {
        const files = Array.isArray(file) ? file : [file]

        setSelectedFiles(files)
    }

    const updateFile = (file: File) => {
        setStore(produce((draft) => {
            const id = file.meta?.oldId ?? file.id

            const foundFolder = draft.find((folder) => folder.id === file.meta?.parentDirId)

            if (!foundFolder) {
                return
            }

            const foundFile = foundFolder.files.find((file) => file.id === id)
            
            if (foundFile) {
                Object.assign(foundFile, file)
            }
        }))
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
            meta: {
                parentDirId: parentFolder.id,
                ...(defaultFile?.meta ?? {})
            },
            
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
        selectFile
    }
}