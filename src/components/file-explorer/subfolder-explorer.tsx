/* eslint-disable @typescript-eslint/no-explicit-any */
import { Folder, FolderOpen, FileText, FileImage } from "lucide-react";
import { SubFolderExplorerInterface } from "./interfaces/file-explorer-interface";

const FolderItem = ({ folder, ...props }: SubFolderExplorerInterface) => {
  const isOpen = props.openFolders?.includes(folder.name);
  const isImage = (name: string) => name.split(".")[1] === "jpg";

  const folderIcon = isOpen ? (
    <FolderOpen color="black" fill="#f79862" strokeWidth={"0.5px"} />
  ) : (
    <Folder color="black" fill="#f79862" strokeWidth={"0.5px"} />
  );

  const renderContent = folder.content && isOpen && (
    <ul className="relative pl-[20px]">
      {folder.content.map((item: any) => {
        return (
          <li key={item.id}>
            {item.content ? (
              <FolderItem folder={item} {...props} />
            ) : (
              <span className="flex">
                {isImage(item.name) ? (
                  <FileImage color="black" strokeWidth={1} />
                ) : (
                  <FileText color="black" strokeWidth={1} />
                )}
                {item.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div key={folder.name}>
      <span
        className="flex cursor-pointer"
        onClick={() => props.toggleFolder(folder.name)}
      >
        {folderIcon} <strong>{folder.name}</strong>
      </span>
      {renderContent}
    </div>
  );
};

export default FolderItem;
