import { ComponentMeta, ComponentStory } from "@storybook/react";
import Fileexplorer from "./file-explorer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Fileexplorer",
  component: Fileexplorer,
} as ComponentMeta<typeof Fileexplorer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Fileexplorer> = () => <Fileexplorer />;

export const FileExplorer = Template.bind({});
FileExplorer.args = {
  label: "Explore",
};
