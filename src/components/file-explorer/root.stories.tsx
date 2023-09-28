import { Meta, StoryFn } from "@storybook/react";
import { InternalFile } from "./use-file-explorer";
import * as FolderExplorer from "../folder-explorer/folder-explorer";
import * as FolderContentExplorer from "../folder-content-explorer/folder-content-explorer";
import { useFileExplorer } from "./use-file-explorer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Root",
  component: FolderExplorer.Root,
} as Meta<typeof FolderExplorer.Root>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FolderExplorer.Root> = () => { 

  const {
    folders,
    openFolder,
    openFolderFromTree,
    clickFolder,
    update,
    isFolderOpen,
    getCurrentFolder,
    getCurrentFolderContent,
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
      },{
        id: "00003",
        name: "00003",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00004",
        name: "00004",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00005",
        name: "00005",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00006",
        name: "00006",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00007",
        name: "00007",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00008",
        name: "00008",
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00009",
        name: "00009",
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
      <FolderExplorer.Root>
          {folders.map((folder) =>(
            <FolderExplorer.Item
              key={folder.id}
              onDoubleClick={() => {
                data(folder)
                openFolderFromTree(folder)
              }}
              onClick={() => {
                clickFolder(folder)
              }}
              style={{left: 15 * (folder.depth ?? 0)}}
            >
              {folder.name} 
              {folder.type === "folder" ? (
                <span>
                  {isFolderOpen(folder) ? "v" : ">"}
                </span>
              ): null}
            </FolderExplorer.Item>
          ))}
      </FolderExplorer.Root>
      <div>
        <h3>{ getCurrentFolder()?.name }</h3>
        <div className="grid grid-cols-4 gap-4">
          {getCurrentFolderContent().map((file) => (
            <FolderContentExplorer.Item key={file.id} onDoubleClick={() => {
              if (file.type === "folder") {
                data(file)
                openFolder(file)
              }
            }}>
                {file.name} {file.type}
            </FolderContentExplorer.Item>
          ))}
        </div>
      </div>
    </div>
)};

export const Root = Template.bind({});