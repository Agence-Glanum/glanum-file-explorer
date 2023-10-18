import { produce } from "immer"
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
        if (!first) {
            const value = store.length !== 0 ? [store[0].id] : []
            setSelectedFolder(value)
            setOpenFolders(value)
            setFirst(store.length !== 0)
        }
    }, [store])

    const folders = () => {

        const arry: Array<{id: string, name: string, depth: number}> = []

        const result = produce(arry, (draft) => {

            let depth = 0

            store.forEach((folder) => {

                const folderIndex = draft.findIndex((f) => f.id === folder.id)

                if (folderIndex === -1) {
                    draft.push({id: folder.id, name: folder.name,  depth})
                }

                depth++
console.log(openFolders)
                if (openFolders.includes(folder.id ?? "")) {
                    folder
                        .files
                        .filter((file) => file.type === 'folder')
                        .forEach((subfolder) => {

                            if (folderIndex !== -1) {
                                draft.splice(folderIndex + 1, 0, {id: subfolder.id, name: subfolder.name, depth})
                            } else {
                                draft.push({id: subfolder.id, name: subfolder.name, depth})
                            }
                            
                        })
                }
            })


        })
        console.log(result)
        return result
    }

    const selectFolder = (folderId: string) => {
        setSelectedFolder((state) => {
            if (state.includes(folderId)) {
                return state
            }
            return [...state, folderId]
           
        })
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

    const isFolderOpen = (folderId: string) => {
        return openFolders.includes(folderId)
    } 

    return {
        folders,
        selectFolder,
        isFolderSelected,
        isFolderOpen,
        toggleOpenFolder
    }
}