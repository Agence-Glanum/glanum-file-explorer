/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { folders } from "./data";
import { FolderInterface } from './interfaces/file-explorer-interface';

const useFolderToggle = (initialFolders: any) => {
  const [openFolders, setOpenFolders] = useState(initialFolders);

  const toggleFolder = (folderName: string) => {
    if (openFolders.includes(folderName)) {
      setOpenFolders(openFolders.filter((name: string) => name !== folderName));
      closeSubfolders(folderName);
    } else {
      setOpenFolders([...openFolders, folderName]);
    }
  };

  const closeSubfolders = (folderName: string) => {
    const folderToClose = findFolder(folders, folderName);
    if (folderToClose) {
      folderToClose.content.forEach((item: FolderInterface) => {
        if (item.content) {
          setOpenFolders((prevOpenFolders: any) =>
            prevOpenFolders.filter((name: string) => name !== item.name)
          );
          closeSubfolders(item.name);
        }
      });
    }
  };

  const findFolder: any = (folders: any, folderName: string) => {
    for (const folder of folders) {
      if (folder.name === folderName) {
        return folder;
      }
      if (folder.content) {
        const result = findFolder(folder.content, folderName);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  return { openFolders, toggleFolder };
};

export default useFolderToggle;