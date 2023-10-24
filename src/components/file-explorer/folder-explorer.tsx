import {
  File,
  FolderInterface,
  FolderRender,
} from "./interfaces/file-explorer-interface";
import useFolderToggle from "./hooks/useToggleFolder";
import useFolderItemRender from "./hooks/useFolderItemRender";

const FolderExplorer = ({
  folder,
  TextIcon,
  foldersIcon,
  openFolderIcon,
  imageIcon,
}: FolderRender) => {
  const props: FolderRender = {
    folder,
    TextIcon,
    foldersIcon,
    openFolderIcon,
    imageIcon,
  };
  const { openFolders, toggleFolder } = useFolderToggle();
  const { isOpen, renderFileIcon, folderIcon } = useFolderItemRender(
    { ...props },
    openFolders
  );

  return (
    <div key={folder!.name}>
      <span
        className="flex cursor-pointer select-none"
        onClick={() => toggleFolder(folder!.id)}
      >
        {folderIcon} <strong>{folder!.name}</strong>
      </span>
      {folder!.content && isOpen && (
        <ul className="relative pl-[20px]">
          {folder!.content.map((item: File | FolderInterface) => {
            return (
              <li key={item.id}>
                {"content" in item ? (
                  <FolderExplorer
                    folder={item}
                    openFolders={openFolders}
                    TextIcon={TextIcon}
                    foldersIcon={foldersIcon}
                    openFolderIcon={openFolderIcon}
                    imageIcon={imageIcon}
                  />
                ) : (
                  <span className="flex">
                    {renderFileIcon(item.name)}
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default FolderExplorer;
