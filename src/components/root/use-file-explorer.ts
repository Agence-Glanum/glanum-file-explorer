import { produce } from "immer"
import { useEffect, useMemo, useState } from "react"

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

type TreeInternalFile = InternalFile & {depth: number|undefined}

const traverse = (folder: Array<InternalFile>, depth?: undefined|number): Array<TreeInternalFile> => {

    if (typeof depth == 'number'){
        depth++;
    } else {
        depth = 0;
    }

    return folder.reduce<Array<TreeInternalFile>>(function(result,next){
        result.push({...next, depth});
        if(next.children){
          result = result.concat(traverse(next.children.filter((file) => file.type === "folder"), depth));  
        }
        return result;
      },[]);
};


export function useFileExplorer({defaultFiles}: Props) {

    const [files, setFiles] = useState(convertToInternalFiles(defaultFiles.files))
    const [openFolders, setOpenFolders] = useState<Array<string>>([])

    const folders = useMemo(() => {
        return files
            .filter((file) => file.type === "folder")
            .map((file) => traverse([file]))
            .flat()
    }, [files])

    const onFolderClick = (folder: InternalFile) => {
        setOpenFolders(produce((oldOpenFolders) => {
            var index = oldOpenFolders.indexOf(folder.id);
            if (index === -1) {
                oldOpenFolders.push(folder.id);
            } else {
                oldOpenFolders.splice(index, 1);
            }
        }))
    }

    const update = (updatedFiles: FolderFiles) => {
        if (updatedFiles && updatedFiles.files.length > 0) {
            setFiles(produce((oldFiles) => {
                oldFiles.forEach((file) => {
                    const parentFolder = searchTree(file, updatedFiles.id)

                    if (parentFolder) {
                        setOpenFolders(produce((oldOpenFolders) => {
                            oldOpenFolders.push(parentFolder.id)
                        }))
                        parentFolder.children = convertToInternalFiles(updatedFiles.files)
                    }
                })}
            ))
        }
    }

    const isFolderOpen = (folder: TreeInternalFile) => {
        return openFolders.includes(folder.meta?.parentDirId) || (folder.depth ?? 0) === 0
    }

    return  {
        files,
        folders,
        onFolderClick,
        isFolderOpen,
        update
    }
}