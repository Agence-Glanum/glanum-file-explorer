import { useState } from 'react';
import { folders } from "../data";
import { FolderInterface } from '../interfaces/file-explorer-interface';

const useFolderToggle = () => {
  const [openFolders, setOpenFolders] = useState<Array<string>>([]);

  const toggleFolder = (folderName: string): void => {
    if (openFolders.includes(folderName)) {
      setOpenFolders(openFolders.filter((name: string) => name !== folderName));
      closeSubfolders(folderName);
    } else {
      setOpenFolders([...openFolders, folderName]);
    }
  };

  const closeSubfolders = (folderName: string): void => {
    const folderToClose = findFolder(folders, folderName);
    if (folderToClose) {
      folderToClose.content
        .filter((item): item is FolderInterface => 'content' in item)
        .forEach((item) => {
          setOpenFolders((prevOpenFolders: Array<string>) =>
            prevOpenFolders.filter((name: string) => name !== item.name)
          );
          closeSubfolders(item.name);
        });
    }
  };

  const findFolder = <T extends File | FolderInterface>(
    folders: Array<T>,
    folderName: string
  ): T | null => {
    for (const folder of folders) {
      if (folder.name === folderName) {
        return folder;
      }
      if ('content' in folder && folder.content) {
        const result = findFolder(folder.content as Array<T>, folderName);
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