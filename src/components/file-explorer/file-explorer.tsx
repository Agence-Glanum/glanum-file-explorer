/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { folders } from "./data";
import FolderExplorer from "./folder-explorer";
import { FolderInterface } from "./interfaces/file-explorer-interface";

function FileExplorer() {
  const [openFolders, setOpenFolders] = useState<Array<string>>([]);

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
          setOpenFolders((prevOpenFolders) =>
            prevOpenFolders.filter((name) => name !== item.name)
          );
          closeSubfolders(item.name);
        }
      });
    }
  };

  const findFolder = (folders: any, folderName: string) => {
    for (const folder of folders) {
      if (folder.name === folderName) {
        return folder;
      }
      if (folder.content) {
        const result: FolderInterface = findFolder(folder.content, folderName);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const props = {
    folder: folders,
    toggleFolder,
    openFolders,
  };

  return (
    <div>
      <FolderExplorer {...props} />
    </div>
  );
}

export default FileExplorer;
