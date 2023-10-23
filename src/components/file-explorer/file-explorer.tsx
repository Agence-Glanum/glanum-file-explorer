/* eslint-disable @typescript-eslint/no-explicit-any */
import { folders } from "./data";
import {
  FolderInterface,
  FolderRender,
} from "./interfaces/file-explorer-interface";
import FolderExplorer from "./folder-explorer";

const FileExplorer = ({
  TextIcon,
  foldersIcon,
  openFolderIcon,
  imageIcon,
}: any) => {
  const props: FolderRender = {
    TextIcon,
    foldersIcon,
    openFolderIcon,
    imageIcon,
  };

  return (
    <div>
      <ul>
        {folders?.map((item: FolderInterface) => {
          return (
            <li key={item.id}>
              <FolderExplorer folder={item} {...props} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FileExplorer;
