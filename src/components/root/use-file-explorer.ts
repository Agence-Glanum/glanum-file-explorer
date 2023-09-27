import { produce } from "immer"
import { useCallback, useEffect, useMemo, useState } from "react"

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


type FolderFiles = {
    files: File[]
    id: string
}

export interface InternalFile extends File {
    children?: InternalFile[]
}


type Props = {
    defaultFiles: FolderFiles,
}

const convertToInternalFiles = (files: File[]) => {
    return files.map((file) => {
        if (file.type !== "folder") {
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
        parent.push(folder[0].meta?.parentDirId);
    } else {
        parent = [];
    }

    return folder.reduce<Array<TreeInternalFile>>(function(result,next){
        result.push({...next, depth, parent: [...parent]});
        if(next.children){
          result = result.concat(traverse(next.children.filter((file) => file.type === "folder"), depth, parent));  
        }
        return result;
      },[]);
};


export function useFileExplorer({defaultFiles}: Props) {

    const [files, setFiles] = useState(convertToInternalFiles(defaultFiles.files))
    const [openFolders, setOpenFolders] = useState<Array<string>>([])
    const [currentFolderId, setCurrentFolderId] = useState<string|null>(null)

    const folders = useMemo(() => {
        return files
            .filter((file) => file.type === "folder")
            .map((file) => traverse([file]))
            .flat()
    }, [files])

    const onFolderOpen = useCallback((folder: TreeInternalFile) => {
        setOpenFolders(produce((oldOpenFolders) => {
            var index = oldOpenFolders.indexOf(folder.id)
            if (index === -1) {
                oldOpenFolders.push(folder.id)
            } else {
                oldOpenFolders.splice(index, 1)
            }
        }))
        setCurrentFolderId(folder.id)
    }, [])

    const onFolderClick = useCallback((folder: TreeInternalFile) => {
        setCurrentFolderId(folder.id)
    }, [])

    const update = useCallback((updatedFiles: FolderFiles) => {
        if (updatedFiles && updatedFiles.files.length > 0) {
            setFiles(produce((draft) => {
                draft.forEach((file) => {
                    const parentFolder = searchTree(file, updatedFiles.id)

                    if (parentFolder && parentFolder.children?.length === 0) {
                        parentFolder.children = convertToInternalFiles(updatedFiles.files)
                    }
                })}
            ))
        }
    }, [setOpenFolders])

    const isFolderVisible = useCallback((folder: TreeInternalFile) => {
        return  folder.parent.every(id => openFolders.includes(id)) || (folder.depth ?? 0) === 0
    }, [openFolders])

    const isFolderOpen = useCallback((folder: TreeInternalFile) => {
        return openFolders.includes(folder.id)
    }, [openFolders])

    const getCurrentFolderContent = useCallback(() => {
        let currentFolder: InternalFile|null = null

        files.forEach((file) => {
            const parentFolder = searchTree(file, currentFolderId)

            if (parentFolder) {
                currentFolder = parentFolder
            }
        })

        return currentFolder
    }, [files, currentFolderId])

    return  {
        files,
        folders,
        onFolderOpen,
        isFolderVisible,
        isFolderOpen,
        onFolderClick,
        getCurrentFolderContent,
        update
    }
}