import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { Folder, File } from '../types/file';

const generateFilesData = (parentFolderId: string, folderWeight: number = 20): (File|Folder)[] => {
    return [...Array(100).keys()].map(() => {

        if (folderWeight <= 0) {
            return {
                id: uuidv4(),
                name: faker.system.commonFileName(),
                type: 'file',
                sync: true,
                metadata: {
                    parentDirId: parentFolderId
                }
            }
        }

        return faker.helpers.weightedArrayElement([
            {weight: folderWeight, value: {
                id: uuidv4(),
                name: faker.system.commonFileName(),
                type: 'folder',
                root: false,
                sync: true,
                metadata: {
                    parentDirId: parentFolderId
                }
            }}, 
            {weight: 100 - folderWeight, value: {
                id: uuidv4(),
                name: faker.system.commonFileName(),
                type: 'file',
                sync: true,
                metadata: {
                    parentDirId: parentFolderId
                }
            }}
        ])
    }).sort((file) => file.type === 'folder' ? -1 : 1)
}

const generateFolderData = (parentFolderId?: string) => {
    const id = parentFolderId ?? uuidv4()
    return {
        files: generateFilesData(id),
        id
    }
}

type GenerateFolder = {
    folderId?: string 
    parentFolderId?: string
    child?: File|Folder
    baseFolder?: any
    canRoot?: boolean
}

const generateFolder = ({folderId, parentFolderId, child, baseFolder, canRoot = false}: GenerateFolder) => {
    const id = folderId ?? uuidv4()
    const parentId = parentFolderId ?? uuidv4()

    const files = child ? [child, ...generateFilesData(id)] : generateFilesData(id)

    const root = canRoot ? faker.helpers.weightedArrayElement([
                {weight: 20, value: true}, 
                {weight: 80, value: false}
            ]) : false

    return {
        ...{
            id,
            name: faker.system.commonFileName(),
            type: 'folder',
            root,
            sync: true,
            files,
            metadata: {
                parentDirId: parentId
            }
        },
        ...baseFolder
    }
}



export { generateFilesData, generateFolderData, generateFolder }