import { produce } from "immer"
import { FolderFiles } from "../file-explorer/use-file-explorer-v2"

type FolderExplorerV2Props = {
    store: Array<FolderFiles>
}

export function useFolderExplorerV2({store}: FolderExplorerV2Props) {

    const folders = () => {

        const arry: Array<{id: string, name: string, depth: number}> = []

        const result = produce(arry, (draft) => {

            let depth = 0

            store.forEach((folder) => {

                const folderIndex = draft.findIndex((f) => f.id === folder.id)

                if (folderIndex === -1) {
                    draft.push({id: folder.id, name: folder.name, depth})
                }

                depth++

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
            })


        })
        console.log(result)
     return result
    }

    return {
        folders
    }
}