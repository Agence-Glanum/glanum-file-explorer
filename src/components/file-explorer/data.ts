const start = performance.now();
import { File, FolderInterface } from "./interfaces/file-explorer-interface";
import { faker } from '@faker-js/faker';

export const folders: Array<FolderInterface> = [];

const extension: Array<string> = ['txt', 'jpg', 'pdf'];

const generateRandomId = (): number => {
    return Math.floor(Math.random() * 10000000);
};

const generateRandomFolderName = (): string => {
    return `folder${generateRandomId()}`;
};

const generateRandomFileName = (): string => {
    const randomExtension: string = extension[Math.floor(Math.random() * extension.length)];
    return faker.system.commonFileName(randomExtension);
};

const getFileType = (name: string) => {
    if (name.endsWith(".jpg")) {
        return "image";
    } else if (name.endsWith(".txt")) {
        return "text";
    } else if (name.endsWith(".pdf")) {
        return "pdf"
    }
    return "folder";
};

const generateFolder = (name: string, depth: number, maxDepth: number) => {
    if (depth > maxDepth) {
        return [];
    }
    const folderId: number = generateRandomId();
    const type: string = getFileType(name);

    const generateFiles = () => {
        const content: Array<File> = [];
        for(let i = 0; i < 3; i++) {
            const fileName: string = generateRandomFileName()
            const file: File = {id: generateRandomId(), name: fileName, metadata: {size: "10 ko", created_at: "23/10/2023" }, path: `/path/file${fileName}`, type: getFileType(fileName)}
            content.push(file)
        }
        return content
    }
    
    const folder: FolderInterface = {
        id: folderId,
        name: name,
        path: `/path/${name}`,
        type: type,
        content: generateFiles()
    };

    const subfolder: Array<FolderInterface> = generateFolder(
        generateRandomFolderName(),
        depth + 1,
        maxDepth
    );

    if (subfolder.length > 0) {
        const folderName: string = generateRandomFolderName();
        folder.content.push({
            id: generateRandomId(),
            name: folderName,
            path: `/path/${folderName}`,
            content: subfolder,
            type: getFileType(folderName)
        });
    }
    return [folder];
};

const generateCompleteStructure = (numFolders: number): Array<FolderInterface> => {
    const structure: Array<FolderInterface> = [];

    for (let i = 1; i <= numFolders; i++) {
        const folder: Array<FolderInterface> = generateFolder(`folder${i}`, 1, 7);
        structure.push(...folder);
    }

    return structure;
};

const additionalFolders: Array<FolderInterface> = generateCompleteStructure(5000);

folders.push(...additionalFolders);

const end = performance.now();
const duration = end - start
console.log(`La génération de l'arborescence à duré : ${Math.trunc(duration / 1000)} secondes`)
