import { ComponentMeta, ComponentStory } from "@storybook/react";

import ContextmenuComponent from "./context-menu";
import { TriggerComponent } from "./trigger-component";
import data from "./data";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Contextmenu",
  component: ContextmenuComponent,
} as ComponentMeta<typeof ContextmenuComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContextmenuComponent> = () => <ContextmenuComponent  data={data} TriggerComponent={TriggerComponent}/>;

export const ContextMenu = Template.bind({});
ContextMenu.args = {
  data,
  TriggerComponent: TriggerComponent
}