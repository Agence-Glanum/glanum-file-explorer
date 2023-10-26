
import { Meta,  StoryFn } from "@storybook/react";
import * as TreeExplorer from "./tree-explorer";
import clsx from "clsx";
import { ArchiveIcon } from "@radix-ui/react-icons";

type ItemProps = {
  open: boolean
  title: string
  selected: boolean
}

const Item = ({open, title, selected}: ItemProps) => {
  return (
    <TreeExplorer.Item className="h-8">
      <TreeExplorer.Content
        depth={0}
        className={clsx(
          selected && "bg-gray-100 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600",
            "text-gray-800"
        )}
        title={title}
    >
        <TreeExplorer.OpenIndicator
            open={open}
        />
        <ArchiveIcon className="ml-1" />
        <span className="ml-2 max-w-[75px] truncate">{title}</span>
      </TreeExplorer.Content>  
    </TreeExplorer.Item>
  )
} 


export default {
    title: "Tree Explorer Item",
    component: Item,
} satisfies Meta<typeof Item>;
  
  // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Item> = (args) => <Item {...args}/>

export const Default = Template.bind({});
Default.args = {
  open: false,
  title: "Item",
  selected: false
}

export const Open = Template.bind({});
Open.args = {
  open: true,
  title: "Item",
  selected: false
}

export const Selected = Template.bind({});
Selected.args = {
  open: false,
  title: "Item",
  selected: true
}