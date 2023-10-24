import { render } from "@testing-library/react";
import { folders } from "../data";
import FolderExplorer from "../folder-explorer";

describe("⌛  Folder explorer", () => {
  test("renders the folder explorer component", () => {
    render(<FolderExplorer folder={folders[0]} />);
  });
});
