import { ComponentMeta, ComponentStory } from "@storybook/react";

import ContextMenuMock from "../../mock/context-menu";
import ContextmenuComponent from "./context-menu";
import { TriggerComponent } from "./trigger-component";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Contextmenu",
  component: ContextmenuComponent,
} as ComponentMeta<typeof ContextmenuComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContextmenuComponent> = () => <ContextmenuComponent  data={ContextMenuMock} TriggerComponent={TriggerComponent}/>;

export const ContextMenu = Template.bind({});
ContextMenu.args = {
  data: ContextMenuMock,
  TriggerComponent: TriggerComponent
}