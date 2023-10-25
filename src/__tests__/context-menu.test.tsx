import ContextMenuComponent from "../components/context-menu/context-menu";
import { TriggerComponent } from "../components/context-menu/trigger-component";
import data from "../mock/context-menu";
import { render } from "@testing-library/react";

describe("ContextMenu", () => {
    test("renders the ContextMenu component", () => {
      render(<ContextMenuComponent data={data} TriggerComponent={TriggerComponent} />);
    });
});