import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

const generateFilesData = (parentFolderId: string) => {
    return [...Array(100).keys()].map(() => {

        return faker.helpers.weightedArrayElement([
            {weight: 20, value: {
                id: uuidv4(),
                name: faker.system.commonFileName(),
                type: 'folder',
                path: [{id: "", name: ""}],
                root: faker.helpers.weightedArrayElement([
                    {weight: 20, value: false}, 
                    {weight: 80, value: true}
                ]),
                sync: true,
                meta: {
                    parentDirId: parentFolderId
                }
            }}, 
            {weight: 80, value: {
                id: uuidv4(),
                name: faker.system.commonFileName(),
                type: 'file',
                sync: true,
                meta: {
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
    child?: Object
}

const generateFolder = ({folderId, parentFolderId, child}: GenerateFolder) => {
    const id = folderId ?? uuidv4()
    const parentId = parentFolderId ?? uuidv4()

    const files = child ? [child, ...generateFilesData(id)] : generateFilesData(id)

    return {
        id: id,
        name: faker.system.commonFileName(),
        type: 'folder',
        path: [{id: "", name: ""}],
        root: faker.helpers.weightedArrayElement([
            {weight: 20, value: false}, 
            {weight: 80, value: true}
        ]),
        sync: true,
        files,
        meta: {
            parentDirId: parentId
        }
    }
}



export { generateFolderData, generateFolder }