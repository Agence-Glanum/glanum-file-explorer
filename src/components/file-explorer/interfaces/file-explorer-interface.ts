export interface File {
    id: number;
    name: string;
    metadata: {size: string, created_at: string };
    path: string;
    type: string;
}

export interface FolderInterface {
    id: number;
    name: string;
    path: string
    content: (File | FolderInterface)[];
    type: string;
}

export interface FolderRender {
    folder?: FolderInterface;
    openFolders?: Array<number>;
    TextIcon?: JSX.Element;
    foldersIcon?: JSX.Element;
    openFolderIcon?: JSX.Element;
    imageIcon?: JSX.Element
}

export interface SubFolderExplorerInterface {
    folder: FolderInterface;
    toggleFolder?: (folderName: string) => void;
    openFolders?: Array<string>
}