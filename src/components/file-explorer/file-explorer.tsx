/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Folder, FolderOpen } from "lucide-react";
import { folder } from "./data";

function FileExplorer() {
  const [openFolders, setOpenFolders] = useState<any>([]);
  console.log(
    "🚀 ~ file: file-explorer.tsx:8 ~ FileExplorer ~ openFolders:",
    openFolders
  );
  const toggleFolder = (folderName: any) => {
    if (openFolders.includes(folderName)) {
      setOpenFolders(openFolders.filter((name: string) => name !== folderName));
    } else {
      setOpenFolders([...openFolders, folderName]);
    }
  };

  const renderFolder = (folder: any) => {
    const isOpen = openFolders.includes(folder.name);
    return (
      <div key={folder.name}>
        <span
          className="flex cursor-pointer"
          onClick={() => toggleFolder(folder.name)}
        >
          {isOpen ? <FolderOpen /> : <Folder />} <strong>{folder.name}</strong>
        </span>
        {isOpen && folder.content && (
          <ul className="relative pl-[20px]">
            {folder.content.map((item: any, index: any) => (
              <li key={index}>
                {item.content ? renderFolder(item) : <span>{item.name}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <ul className="">
        {folder?.map((item: any, index: any) => (
          <li key={index}>
            {item.content ? renderFolder(item) : <span>{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileExplorer;
