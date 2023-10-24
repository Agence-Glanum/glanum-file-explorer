import { render } from "@testing-library/react";
import { folders } from "../data";
import FolderExplorer from "../folder-explorer";
import { FileImage, FileText, Folder, FolderOpen } from "lucide-react";

const customImageIcon: JSX.Element = (
  <FileImage color="black" strokeWidth="0.5px" />
);

const customTextIcon: JSX.Element = (
  <FileText color="black" strokeWidth="0.5px" />
);

const customOpenFolderIcon: JSX.Element = (
  <FolderOpen color="black" fill="#f79862" strokeWidth="0.5px" />
);

const customFolderIcon: JSX.Element = (
  <Folder color="black" fill="#f79862" strokeWidth="0.5px" />
);

describe("⌛  Folder explorer", () => {
  test("renders the folder explorer component", () => {
    render(
      <FolderExplorer
        folder={folders[0]}
        TextIcon={customTextIcon}
        foldersIcon={customFolderIcon}
        openFolderIcon={customOpenFolderIcon}
        imageIcon={customImageIcon}
      />
    );
  });
});
