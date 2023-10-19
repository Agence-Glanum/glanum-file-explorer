import { ComponentMeta, ComponentStory } from "@storybook/react";
import PreviewEx from "./previewEx";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Preview",
  component: PreviewEx,
} as ComponentMeta<typeof PreviewEx>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PreviewEx> = () => <PreviewEx />;

export const PreviewT = Template.bind({});
PreviewT.args = {
  label: "Explore",
};
