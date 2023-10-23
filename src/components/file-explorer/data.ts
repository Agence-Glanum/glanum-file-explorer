import { FolderInterface } from "./interfaces/file-explorer-interface";

export const folders: Array<FolderInterface> = [];

const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000000000);
};

const generateRandomFolderName = () => {
    return `folder${generateRandomId()}`;
};
const generateFolder = (name: string, depth: number, maxDepth: number) => {
    if (depth > maxDepth) {
        return [];
    }

    const folderId = generateRandomId();
    const folder: FolderInterface = {
        id: folderId,
        name: name,
        content: [
            {id: generateRandomId(), name: `file${depth}.txt`, metadata: {size: "10 ko", created_at: "23/10/2023" } },
            {id: generateRandomId(), name: `file${depth}.jpg`, metadata: {size: "10 ko", created_at: "23/10/2023" } },
            {id: generateRandomId(), name: `file${depth}.pdf`, metadata: {size: "10 ko", created_at: "23/10/2023" } },
        ],
    };

    const subfolder: Array<FolderInterface> = generateFolder(
        generateRandomFolderName(),
        depth + 1,
        maxDepth
    );

    if (subfolder.length > 0) {
        folder.content.push({
            id: generateRandomId(),
            name: generateRandomFolderName(),
            content: subfolder,
        });
    }
    return [folder];
};

const generateCompleteStructure = (numFolders: number) => {
    const structure = [];

    for (let i = 1; i <= numFolders; i++) {
        const folder = generateFolder(`folder${i}`, 1, 7);
        structure.push(...folder);
    }

    return structure;
};

const additionalFolders = generateCompleteStructure(1);

folders.push(...additionalFolders);


