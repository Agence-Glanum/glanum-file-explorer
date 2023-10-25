import { ComponentMeta, ComponentStory } from "@storybook/react";

import DragDropComponent from "./drag-drop";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Dragdrop",
  component: DragDropComponent,
} as ComponentMeta<typeof DragDropComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DragDropComponent> = () => <DragDropComponent />;

export const DragDrop = Template.bind({});
DragDrop.args = {}