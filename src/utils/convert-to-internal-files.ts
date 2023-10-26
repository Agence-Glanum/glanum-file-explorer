import { FolderFiles, InternalFolderFiles } from "../types/file"

export const convertToInternalFiles = (folder: FolderFiles): InternalFolderFiles => {
    return {
        ...folder,
        files: folder.files.map((file) => {
            return {...file, renaming: false}
        })
    }
}