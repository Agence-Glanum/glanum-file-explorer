import { useState } from 'react';
import { folders } from "../data";
import { FolderInterface } from '../interfaces/file-explorer-interface';

const useFolderToggle = () => {
  const [openFolders, setOpenFolders] = useState<Array<number>>([]);

  const toggleFolder = (folderId: number): void => {
    if (openFolders.includes(folderId)) {
      setOpenFolders(openFolders.filter((id: number) => id !== folderId));
      closeSubfolders(folderId);
    } else {
      setOpenFolders([...openFolders, folderId]);
    }
  };

  const closeSubfolders = (folderId: number): void => {
    const folderToClose = findFolder(folders, folderId);
    if (folderToClose) {
      folderToClose.content
        .filter((item): item is FolderInterface => 'content' in item)
        .forEach((item) => {
          setOpenFolders((prevOpenFolders: Array<number>) =>
            prevOpenFolders.filter((id: number) => id !== item.id)
          );
          closeSubfolders(item.id);
        });
    }
  };

  const findFolder = <T extends File | FolderInterface>(
    folders: Array<T>,
    folderId: number,
  ): T | null => {
    for (const folder of folders) {
      if ('id' in folder && folder.id === folderId) {
        return folder as T;
      }
      if ('content' in folder && folder.content) {
        const result = findFolder(folder.content as Array<T>, folderId);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };
  return { openFolders, toggleFolder };
}

export default useFolderToggle;