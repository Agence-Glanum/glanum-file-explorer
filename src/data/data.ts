import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

const generateFilesData = (parentFolderId: string) => {
    return [...Array(100).keys()].map(() => ({
        id: uuidv4(),
        name: faker.system.commonFileName(),
        sync: true,
        type: faker.helpers.weightedArrayElement([
            {weight: 20, value: 'folder'}, 
            {weight: 80, value: 'file'}
        ]),
        meta: {
          parentDirId: parentFolderId
        }
    })).sort((file) => file.type === 'folder' ? -1 : 1)
}

const generateFolderData = (parentFolderId?: string) => {
    const id = parentFolderId ?? uuidv4()
    return {
        files: generateFilesData(id),
        id
    }
}



export { generateFolderData }