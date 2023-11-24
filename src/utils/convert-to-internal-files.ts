import { FolderFiles } from "../types/file"

export const convertToInternalFiles = (folder: FolderFiles): FolderFiles => {
    return {
        ...folder,
        files: folder.files.map((file) => {
            return {...file, renaming: false}
        })
    }
}