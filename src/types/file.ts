export type File = {
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

export interface Folder extends File {
    type: 'folder'
    root: boolean
}

export interface FolderFiles extends Folder {
    files: Array<File>
}