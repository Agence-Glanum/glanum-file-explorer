import { Meta, StoryFn } from "@storybook/react";
import { InternalFile } from "./root";
import * as FolderExplorer from "../folder-explorer/folder-explorer";
import * as FolderContentExplorer from "../folder-content-explorer/folder-content-explorer";
import { useFileExplorer } from "./use-file-explorer";
import clsx from "clsx";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Root",
  component: FolderExplorer.Root,
} as Meta<typeof FolderExplorer.Root>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FolderExplorer.Root> = () => { 

  const {
    folders,
    onFolderOpen,
    onFolderClick,
    update,
    isFolderOpen,
    isFolderVisible,
    getCurrentFolderContent
  } = useFileExplorer({
      defaultFiles: {files: [{
        id: "00001",
        name: "00001",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },
      {
        id: "00002",
        name: "00002",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      }], 
      id: "00000"
    }
  })

  const data = (file: InternalFile) => {
    if (file.id === "00001") {
      update({
        files: [
          {
            id: "00011",
            name: "00011",
            type: "file",
            meta: {
              parentDirId: "00001"
            }
          },
          {
            id: "00021",
            name: "00021",
            type: "folder",
            meta: {
              parentDirId: "00001"
            }
          }
        ],
        id: "00001"
      })
    }

    if (file.id === "00021") {
      update({
        files: [
          {
            id: "00121",
            name: "00121",
            type: "folder",
            meta: {
              parentDirId: "00021"
            }
          },
          {
            id: "00221",
            name: "00221",
            type: "folder",
            meta: {
              parentDirId: "00021"
            }
          },
          {
            id: "00321",
            name: "00321",
            type: "folder",
            meta: {
              parentDirId: "00021"
            }
          },
        ],
        id: "00021"
      })
    }

    if (file.id === "00321") {
      update({
        files: [
          {
            id: "01321",
            name: "01321",
            type: "folder",
            meta: {
              parentDirId: "00321"
            }
          },
        ],
        id: "00321"
      })
    }

    if (file.id === "00121") {
      update({
        files: [
          {
            id: "01121",
            name: "01121",
            type: "file",
            meta: {
              parentDirId: "00121"
            }
          },
        ],
        id: "00121"
      })
    }

    if (file.id === "00002") {
      update({
        files: [
          {
            id: "00012",
            name: "00012",
            type: "folder",
            meta: {
              parentDirId: "00002"
            }
          },
        ],
        id: "00002"
      })
    }
  }

  return (
    <div className="flex">
      <div>
          {folders.map((folder) => (
            <FolderExplorer.Item
              onDoubleClick={() => {
                data(folder)
                onFolderOpen(folder)
              }}
              onClick={() => {
                onFolderClick(folder)
              }}
              depth={folder.depth}
              className={clsx(!isFolderVisible(folder) && "hidden")}
            >
              {folder.name} 
              {folder.type === "folder" ? (
                <span>
                  {isFolderOpen(folder) ? "v" : ">"}
                </span>
              ): null}
            </FolderExplorer.Item>
          ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {getCurrentFolderContent()?.children?.map((file) => (
          <FolderContentExplorer.Item>
              {file.name} {file.type}
          </FolderContentExplorer.Item>
        )) }
      </div>
    </div>
)};

export const Root = Template.bind({});