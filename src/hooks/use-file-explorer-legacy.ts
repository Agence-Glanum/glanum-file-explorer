import { produce } from "immer"
import { useCallback, useMemo, useState } from "react"
import { v4 } from "uuid"

type File = {
    id: string
    type: string
    name: string
    sync: boolean
    metadata?: {
        url?: string
        parentDirId: string
        thumbnail?: string
        oldId?: string
    }
}


type FolderFiles = {
    files: File[]
    id: string
}

export interface InternalFile extends File {
    children?: InternalFile[]
    renaming: boolean
}


type Props = {
    defaultFiles: FolderFiles,
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

type TreeInternalFile = InternalFile & {depth: number|undefined, parent: Array<string>}

const traverse = (
    folder: Array<InternalFile>, 
    depth?: undefined|number, 
    parent?: undefined|Array<string>
): Array<TreeInternalFile> => {

    if (typeof depth === 'number'){
        depth++;
    } else {
        depth = 0;
    }

    if (Array.isArray(parent) && folder.length !== 0){
        parent = [...parent, folder[0].metadata?.parentDirId ?? ""]
    } else {
        parent = [];
    }

    return folder.reduce<Array<TreeInternalFile>>(function(result,next){
        result.push({...next, depth, parent: [...parent as Array<string>]});
        if(next.children){
          result = result.concat(traverse(next.children.filter((file) => file.type === "folder"), depth, parent));  
        }
        return result;
      },[])
}

const generateId = () => {
    return v4()
}

export function useFileExplorerLegacy({defaultFiles}: Props) {

    const [files, setFiles] = useState(convertToInternalFiles(defaultFiles.files))
    const [openFolders, setOpenFolders] = useState<Array<string>>([])
    const [currentFolderId, setCurrentFolderId] = useState<string|null>(null)
    const [selectedFiles, setSelectedFiles] = useState<Array<InternalFile>>([])
    const [renaming, setRenaming] = useState<InternalFile|null>(null)

    const isFolderVisible = (folder: TreeInternalFile) => {
        return  folder.parent.every(id => openFolders.includes(id)) || (folder.depth ?? 0) === 0
    }

    const searchInFiles = (search: string|null, localFiles?: Array<InternalFile>): InternalFile|null => {
        if (!search) {
            return null
        }

        const searchable = localFiles ? localFiles : files

        let file: InternalFile|null = null

        searchable.some((tree) => {
            const found = searchTree(tree, search)

            if (found) {
                file = found
                return true
            }
            return false
        })

        return file
    }

    const openFolderFromTree = (folder: TreeInternalFile) => {
        setOpenFolders(produce((draft) => {
            const index = draft.indexOf(folder.id)
            if (index === -1) {
                draft.push(folder.id)
            } else {
                draft.splice(index, 1)
            }
        }))
        setSelectedFiles([])
        setCurrentFolderId(folder.id)
    }

    const openFolder = (folder: InternalFile) => {
        setOpenFolders(produce((draft) => {
            const index = draft.indexOf(folder.id)

            if(index === -1) {
                draft.push(folder.id)
            }

            const parentFolder = searchInFiles(folder.metadata?.parentDirId ?? "")

            if (parentFolder) {
                const index = draft.indexOf(parentFolder.id)

                if(index === -1) {
                    draft.push(parentFolder.id)
                }
            }
        }))
        setSelectedFiles([])
        setCurrentFolderId(folder.id)
    }

    const clickFolder = (folder: TreeInternalFile) => {
        setSelectedFiles([])
        setCurrentFolderId(folder.id)
    }

    const updateFolder = (updatedFiles: FolderFiles) => {
        if (updatedFiles && updatedFiles.files.length > 0) {
            setFiles(produce((draft) => {
                const parentFolder = searchInFiles(updatedFiles.id, draft)

                if (parentFolder && parentFolder.children?.length === 0) {
                    parentFolder.children = convertToInternalFiles(updatedFiles.files)
                }
            }))
        }
    }

    const updateFile = (file: InternalFile) => {
        setFiles(produce((draft) => {
            const id = file.metadata?.oldId ?? file.id

            const foundFile = searchInFiles(id, draft)

            if (foundFile) {
                Object.assign(foundFile, file)
            }
        }))
    }

    const isFolderOpen = (folder: TreeInternalFile) => {
        return openFolders.includes(folder.id)
    }

    const createTempFolder = (parentFolder: InternalFile, defaultName: string = "New Folder") => {
        if (parentFolder.type !== "folder") {
            return
        }

        if (!parentFolder.sync) {
            return
        }

        const newFolder = {
            id: generateId(),
            type: "folder",
            name: defaultName,
            sync: false,
            renaming: true,
            metadata: {
                parentDirId: parentFolder.id
            },
            children: []
        }

        setFiles(produce((draft) => {
            const folder = searchInFiles(parentFolder.id, draft)

            if (folder && folder.children) {
                folder.children.push(newFolder)
            }
        }))

        return newFolder
    }

    const createTempFile = (
        parentFolder: InternalFile, 
        defaultName: string = "New file", 
        type: string = "file"
    ) => {
        if (parentFolder.type !== "folder") {
            return
        }

        if (!parentFolder.sync) {
            return
        }

        const newFolder = {
            id: generateId(),
            type: type,
            name: defaultName,
            sync: false,
            renaming: true,
            metadata: {
                parentDirId: parentFolder.id
            },
            children: []
        }

        setFiles(produce((draft) => {
            const folder = searchInFiles(parentFolder.id, draft)

            if (folder && folder.children) {
                folder.children.push(newFolder)
            }
        }))

        return newFolder
    }

    const selectFile = (file: InternalFile|InternalFile[]) => {
        const files = Array.isArray(file) ? file : [file]

        setSelectedFiles(files)
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

    const folders = files
        .filter((file) => file.type === "folder")
        .map((file) => traverse([file]))
        .flat()
        .filter((folder) => isFolderVisible(folder))

    const currentFolder = searchInFiles(currentFolderId ?? null)

    const currentFolderContent = currentFolder ? (currentFolder as InternalFile).children ?? [] : [] 

    return  {
        files,
        folders,
        openFolder,
        openFolderFromTree,
        isFolderVisible,
        isFolderOpen,
        clickFolder,
        currentFolder,
        currentFolderContent,
        updateFolder,
        updateFile,
        createTempFile,
        createTempFolder,
        selectFile,
        selectedFiles,
        rename,
        startRenaming,
    }
}