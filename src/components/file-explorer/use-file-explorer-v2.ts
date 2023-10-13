import { useEffect, useState } from "react"
import HashTable from "../../utils/hash-table"
import { produce } from "immer"

export type File = {
    id: string
    type: string
    name: string
    sync: boolean
    meta?: {
        url?: string
        parentDirId: string
        thumbnail?: string
        oldId?: string
    }
}

export interface Folder extends File {
    type: string
    path: Array<{
        id: string
        name: string
    }>
    root: boolean
}

export interface FolderFiles extends Folder {
    files: Array<File>
}

type Props = {
    defaultFolder: FolderFiles,
}


export interface InternalFile extends File {
    children?: InternalFile[]
    renaming: boolean
}

const convertToInternalFiles = (files: File[]) => {
    return files.map((file) => {
        if (file.type !== "folder") {
            return {...file, renaming: false}
        }

        return {
            ...file,
            children: [],
            renaming: false
        }
    })
}

export function useFileExplorerV2({defaultFolder}: Props) {
    const [store, setStore] = useState<Array<Folder>>([])
    const [currentFolderId, setCurrentFolderId] = useState<string|null>(null)
    const [openFolders, setOpenFolders] = useState<Array<string>>([])
    const [selectedFiles, setSelectedFiles] = useState<Array<InternalFile>>([])

    useEffect(() => {
        setStore(produce((store) => {
            store.push(defaultFolder)
        }))
        setCurrentFolderId(defaultFolder.id)
        setOpenFolders([defaultFolder.id])
    }, [])

    const openFolder = (id: string) => {
        // setOpenFolders(produce((draft) => {
        //     const index = draft.indexOf(folder.id)

        //     if(index === -1) {
        //         draft.push(folder.id)
        //     }

        //     const parentFolder = folder.meta?.parentDirId ? store.get(folder.meta?.parentDirId) : null

        //     if (parentFolder) {
        //         const index = draft.indexOf(parentFolder.id)

        //         if(index === -1) {
        //             draft.push(parentFolder.id)
        //         }
        //     }
        // }))
        // setSelectedFiles([])
        setCurrentFolderId(id)
    }

    const updateFolder = (folderId: string, updatedFolder: FolderFiles) => {
        setStore(produce((store) => {
            if (store.find(((folder) => folder.id === folderId))) {
                return 
            }

            const childIndex = store.findIndex((folder) => folder.id === updatedFolder.meta?.parentDirId)

            if (childIndex !== -1) {
                store.splice(childIndex + 1, 0, updatedFolder)
                return
            }

            const parentIndex = store.findIndex((folder) => folder.meta?.parentDirId === updatedFolder.id)

            if (parentIndex !== -1) {
                store.splice(parentIndex - 1, 0, updatedFolder)
                return
            }

            store.push(updatedFolder)
        }))
    }

    const clickFolder = (folderId: string) => {
        setSelectedFiles([])
        setCurrentFolderId(folderId)
    }

    const currentFolder = store.find(((folder) => folder.id === currentFolderId)) ?? null

    const currentFolderContent = currentFolder ? (currentFolder as FolderFiles).files ?? [] : []

    return {
        currentFolder,
        currentFolderContent,
        openFolder,
        updateFolder,
        clickFolder,
        store
    }
}