import { Meta, StoryFn } from "@storybook/react";
import { InternalFile, Root as RootComponent } from "./root";
import * as TreeExplorer from "../tree-explorer/tree-explorer";
import { useState } from "react";
import { FolderExplorer } from "../folder-explorer/folder-explorer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Root",
  component: RootComponent,
} as Meta<typeof RootComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof RootComponent> = () => { 
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
            type: "folder"
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
            type: "folder"
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
        type: "folder"
      }], id: "mmmm"}}
      updatedFiles={newFiles}
      // updatedFiles={null}
    >
      <div className="flex">
        <div>
          <TreeExplorer.Root>
              <TreeExplorer.Level>
                <TreeExplorer.Item onClick={} />
              </TreeExplorer.Level>
          </TreeExplorer.Root>
        </div>
        <div className="pl-6">
          <FolderExplorer onClickedDirectory={(file) => data(file)} />
        </div>
      </div>
    </RootComponent>
)};

export const Root = Template.bind({});