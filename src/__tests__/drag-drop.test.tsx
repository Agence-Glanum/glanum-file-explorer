// import components drag & fileE & more ?
// import data

import { render } from "@testing-library/react";

describe("DragDrop", () => {
    test("renders the Drag and drop component", () => {
      render(<DragDropComponent data={data} FileExplorer={FileExplorer} />);
    });
});