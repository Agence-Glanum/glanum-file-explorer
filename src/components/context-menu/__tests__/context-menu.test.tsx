import ContextMenuComponent from "../context-menu";
import { TriggerComponent } from "../trigger-component";
import data from "../../../mock/context-menu";
import { render } from "@testing-library/react";

describe("ContextMenu", () => {
    test("renders the ContextMenu component", () => {
      render(<ContextMenuComponent data={data} TriggerComponent={TriggerComponent} />);
    });
});