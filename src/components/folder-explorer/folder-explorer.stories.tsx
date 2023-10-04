
import { StoryFn } from "@storybook/react";
import * as FolderExplorer from "../folder-explorer/folder-explorer";

export default {
    title: "Folder Explorer Item",
    component: FolderExplorer.Item,
  } as Meta<typeof FolderExplorer.Item>;
  
  // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FolderExplorer.Item> = () => { 
    return <FolderExplorer.Item>Item</FolderExplorer.Item>
}

export const Item = Template.bind({});