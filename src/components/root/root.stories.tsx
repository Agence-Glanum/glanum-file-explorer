import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InternalFile, Root as RootComponent } from "./root";
import { TreeExplorer } from "../tree-explorer/tree-explorer";
import { useState } from "react";
import { FolderExplorer } from "../folder-explorer/folder-explorer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Root",
  component: RootComponent,
} as ComponentMeta<typeof RootComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RootComponent> = () => { 
  const [newFiles, setNewFiles] = useState(null)

  const data = (file: InternalFile) => {
    if (file.id === "fzfe") {
      setNewFiles({
        files: [
          {
            id: "rrrrr",
            name: "Child",
            type: "file"
          },
          {
            id: "fjdozjf",
            name: "dir",
            type: "directory"
          }
        ],
        id: "fzfe"
      })
    }

    if (file.id === "fjdozjf") {
      setNewFiles({
        files: [
          {
            id: "jhjpljhp",
            name: "Dir 2",
            type: "directory"
          },
        ],
        id: "fjdozjf"
      })
    }

    if (file.id === "jhjpljhp") {
      setNewFiles({
        files: [
          {
            id: "jhjpljhp",
            name: "Child 2",
            type: "file"
          },
        ],
        id: "jhjpljhp"
      })
    }
  }

  return (
    <RootComponent 
      defaultFiles={{files: [{
        id: "fzfe",
        name: "Test",
        type: "directory"
      }], id: "mmmm"}}
      updatedFiles={newFiles}
      // updatedFiles={null}
    >
      <div className="flex">
        <div>
          <TreeExplorer onClickedDirectory={(file) => data(file)} />
        </div>
        <div className="pl-6">
          <FolderExplorer onClickedDirectory={(file) => data(file)} />
        </div>
      </div>
    </RootComponent>
)};

export const Root = Template.bind({});