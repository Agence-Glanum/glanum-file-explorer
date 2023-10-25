import { useEffect, useState } from "react"
import HashTable from "../../utils/hash-table"
import { produce } from "immer"
import { v4 } from "uuid"

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

export interface InternalFile extends File {
    renaming: boolean
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

export interface InternalFolderFiles extends Folder {
    files: Array<InternalFile>
}

type Props = {
    defaultFolder: FolderFiles,
}


type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };

const convertToInternalFiles = (folder: FolderFiles): InternalFolderFiles => {
    return {
        ...folder,
        files: folder.files.map((file) => {
            return {...file, renaming: false}
        })
    }
}

export function useFileExplorerV2({defaultFolder}: Props) {
    const [store, setStore] = useState<Array<InternalFolderFiles>>([])
    const [currentFolderId, setCurrentFolderId] = useState<string|null>(null)
    const [selectedFiles, setSelectedFiles] = useState<Array<InternalFile>>([])
    const [renaming, setRenaming] = useState<InternalFile|null>(null)

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

    const selectFile = (file: InternalFile|InternalFile[]) => {
        const files = Array.isArray(file) ? file : [file]

        setSelectedFiles(files)
    }

    const updateFile = (file: InternalFile) => {
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

    const startRenaming = (file: InternalFile) => {
        if (renaming !== null) {
            return
        }

        updateFile({...file, renaming: true})
        setRenaming(file)
    }

    const rename = (file: InternalFile) => {
        if (!file.renaming) {
            return
        }

        updateFile({...file, renaming: false})
        setRenaming(null)
        selectFile(file)
    }

    const createTempFile = (
        parentFolderId: string,
        defaultFile?: Partial<InternalFile>
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
            renaming: defaultFile?.renaming ?? false,
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

            foundFolder.files.push(newFile)     
        }))


        return newFile
    }

    const createTempFolder = (parentFolder: string, defaultFolder?: Partial<InternalFile>) => {        
        return createTempFile(
            parentFolder, {
            name:  "New Folder",
            ...(defaultFolder ?? {}),
            type: 'folder'
         })
    }

    const currentFolder = store.find(((folder) => folder.id === currentFolderId)) ?? null

    const currentFolderContent = currentFolder ? (currentFolder as InternalFolderFiles).files ?? [] : []

    return {
        currentFolder,
        currentFolderContent,
        updateFolder,
        focusFolder,
        store,
        updateFile,
        startRenaming,
        rename,
        createTempFolder,
        createTempFile,
        selectedFiles,
        selectFile
    }
}