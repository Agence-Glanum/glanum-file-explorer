/* eslint-disable @typescript-eslint/no-explicit-any */
import { Folder, FolderOpen } from "lucide-react";

const FolderExplorer = ({ folder, toggleFolder, openFolders }: any) => {
  const renderFolder = (folder: any) => {
    const isOpen = openFolders?.includes(folder.name);
    return (
      <div key={folder.name}>
        <span
          className="flex cursor-pointer"
          onClick={() => toggleFolder(folder.name)}
        >
          {isOpen ? (
            <FolderOpen color="black" fill="#f79862" />
          ) : (
            <Folder color="black" fill="#f79862" />
          )}{" "}
          <strong>{folder.name}</strong>
        </span>
        {isOpen && folder.content && (
          <ul className="relative pl-[20px]">
            {folder.content.map((item: string | any, index: number) => (
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
    <div>
      <ul>
        {folder?.map((item: string | any, index: number) => (
          <li key={index}>
            {item.content ? renderFolder(item) : <span>{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderExplorer;
