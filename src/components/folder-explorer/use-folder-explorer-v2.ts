import { FolderFiles } from "../file-explorer/use-file-explorer-v2"
import { useEffect, useState } from "react"

type FolderExplorerV2Props = {
    store: Array<FolderFiles>
}

export function useFolderExplorerV2({store}: FolderExplorerV2Props) {
    const [selectedFolder, setSelectedFolder] = useState<Array<string>>([])
    const [openFolders, setOpenFolders] = useState<Array<string>>([])
    const [first, setFirst] = useState(false)

    useEffect(() => {
        if (!first && store.length !== 0) {
            const parentDirId = store[0].meta?.parentDirId ?? ""

            setSelectedFolder([store[0].id])
            setOpenFolders([store[0].id, parentDirId])
            setFirst(true)
        }
    }, [store])

    const folders = () => {

        const draft: Array<{id: string, name: string, parent: Array<string>, depth: number}> = []
        
        let depth = 0

        for(let i = 0; i < store.length; ++i) {
            const folder = store[i]
        
            if (depth === 0) {
                draft.push({
                    id: folder.id,
                    name: folder.name, 
                    parent: [folder.meta?.parentDirId ?? ""], 
                    depth
                })
            }

            depth++

            let folderIndex = draft.findIndex((f) => f.id === folder.id)

            const parentFolder = draft[folderIndex]

            if (!parentFolder) {
                continue
            }

            let amountFolder = 1

            const folders = folder
                .files
                .filter((file) => file.type === 'folder')

            const folderDepth = parentFolder.depth + 1 

            for(let y = 0; y < folders.length; ++y) {
                const subfolder = folders[y]

                const parent = parentFolder.parent ? 
                    [...parentFolder.parent, folder.id] :
                    [folder.id]

                if (!parent.every((openFolder) => openFolders.includes(openFolder))) {
                    continue
                }

                if (folderIndex !== -1) {
                    draft.splice(folderIndex + amountFolder, 0, {
                        id: subfolder.id, 
                        name: subfolder.name, 
                        parent, 
                        depth: folderDepth
                    })
                } else {
                    draft.push({
                        id: subfolder.id,
                        name: subfolder.name,
                        parent, 
                        depth: folderDepth
                    })
                }

                amountFolder++
            }
            
        }

        return draft
    }

    const selectFolder = (folderId: string) => {
        setSelectedFolder([folderId])
    }

    const isFolderSelected = (folderId: string) => {
        return selectedFolder.includes(folderId)
    }

    const toggleOpenFolder = (folderId: string) => {
        setOpenFolders((state) => {
            return state.includes(folderId)
            ? state.filter(id => id !== folderId)
            : [ ...state, folderId ]; 
        })
    }

    const openFolder = (folderId: string) => {
        setOpenFolders((state) => {
            if (state.includes(folderId)) {
                return state
            }

            return [...state, folderId]
        })
    }

    const isFolderOpen = (folderId: string) => {
        return openFolders.includes(folderId)
    } 

    return {
        folders,
        selectFolder,
        isFolderSelected,
        isFolderOpen,
        toggleOpenFolder,
        openFolder,
    }
}