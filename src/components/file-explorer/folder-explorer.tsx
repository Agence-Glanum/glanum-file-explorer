import {
  FolderExplorerInterface,
  FolderInterface,
} from "./interfaces/file-explorer-interface";
import FolderItem from "./subfolder-explorer";

const FolderExplorer = ({ folder, ...props }: FolderExplorerInterface) => {
  return (
    <div>
      <ul>
        {folder?.map((item: FolderInterface) => {
          return (
            <li key={item.id}>
              <FolderItem folder={item} {...props} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FolderExplorer;
