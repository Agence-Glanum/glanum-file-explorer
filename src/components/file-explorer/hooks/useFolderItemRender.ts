import { FolderRender } from "../interfaces/file-explorer-interface";

const useFolderItemRender = ({ ...props }: FolderRender, openFolders: Array<number>) => {

  const {
    folder,
    TextIcon,
    foldersIcon,
    openFolderIcon,
    imageIcon,
  } = props;

  const isOpen: boolean = openFolders!.includes(folder!.id);
  const isImage = (name: string): boolean => name.split(".")[1] === "jpg";

  const renderFileIcon = (fileName: string): JSX.Element => {
    if (isImage(fileName)) {
      return imageIcon;
    } else {
      return TextIcon;
    }
  };

  const folderIcon: JSX.Element = isOpen ? (
    openFolderIcon
  ) : (
    foldersIcon
  );

  return { isOpen, renderFileIcon, folderIcon };
};

export default useFolderItemRender;