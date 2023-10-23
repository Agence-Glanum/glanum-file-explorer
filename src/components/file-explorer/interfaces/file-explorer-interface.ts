export interface File {
    name: string;
}

export interface FolderInterface {
    id: number;
    name: string;
    content: (File | FolderInterface)[];
}

export interface FolderExplorerInterface {
    folder: Array<FolderInterface>;
    toggleFolder: (folderName: string) => void;
    openFolders: Array<string>
}

export interface SubFolderExplorerInterface {
    folder: FolderInterface;
    toggleFolder: (folderName: string) => void;
    openFolders: Array<string>
}