import { folder } from "./data";
import { useState } from "react";
import FolderExplorer from "./folder-explorer";

function FileExplorer() {
  const [openFolders, setOpenFolders] = useState<Array<string>>([]);
  const toggleFolder = (folderName: string) => {
    if (openFolders.includes(folderName)) {
      setOpenFolders(openFolders.filter((name: string) => name !== folderName));
    } else {
      setOpenFolders([...openFolders, folderName]);
    }
  };
  return (
    <div>
      <FolderExplorer
        folder={folder}
        toggleFolder={toggleFolder}
        openFolders={openFolders}
      />
    </div>
  );
}

export default FileExplorer;
