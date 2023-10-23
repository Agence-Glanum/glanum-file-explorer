export interface File {
    id: number;
    name: string;
    metadata: {size: string, created_at: string }
}

export interface FolderInterface {
    id: number;
    name: string;
    content: (File | FolderInterface)[];
}

export interface FolderRender {
    folder?: FolderInterface;
    openFolders?: Array<string>;
    TextIcon: JSX.Element;
    foldersIcon: JSX.Element;
    openFolderIcon: JSX.Element;
    imageIcon: JSX.Element
}
export interface SubFolderExplorerInterface {
    folder: FolderInterface;
    toggleFolder?: (folderName: string) => void;
    openFolders?: Array<string>
}