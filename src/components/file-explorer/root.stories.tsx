import { Meta, StoryFn } from "@storybook/react";
import { InternalFile } from "./use-file-explorer";
import * as Virtualizer from "../virtualizer/virtualizer";
import * as FolderExplorer from "../folder-explorer/folder-explorer";
import * as FolderContentExplorer from "../folder-content-explorer/folder-content-explorer";
import { useFileExplorer } from "./use-file-explorer";
import { ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../context-menu/context-menu";
import { ContextMenu } from "@radix-ui/react-context-menu";
import clsx from "clsx";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Root",
  component: FolderExplorer.Item,
} as Meta<typeof FolderExplorer.Item>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FolderExplorer.Item> = () => { 

  const {
    folders,
    openFolder,
    openFolderFromTree,
    clickFolder,
    updateFolder,
    isFolderOpen,
    getCurrentFolder,
    getCurrentFolderContent,
    createTempFolder,
    updateFile
  } = useFileExplorer({
      defaultFiles: {files: [{
        id: "00001",
        name: "00001",
        sync: true,
        type: "folder",
        meta: {
          parentDirId: "00000"
        }
      },
      {
        id: "00002",
        name: "00002",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00003",
        name: "00003",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00004",
        name: "00004",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00005",
        name: "00005",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00006",
        name: "00006",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00007",
        name: "00007",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00008",
        name: "00008",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      },{
        id: "00009",
        name: "00009",
        type: "folder",
        sync: true,
        meta: {
          parentDirId: "00000"
        }
      }], 
      id: "00000"
    }
  })

  const data = (file: InternalFile) => {
    if (file.id === "00001") {
      updateFolder({
        files: [
          {
            id: "00011",
            name: "00011",
            type: "file",
            sync: true,
            meta: {
              parentDirId: "00001"
            }
          },
          {
            id: "00021",
            name: "00021",
            type: "folder",
            sync: true,
            meta: {
              parentDirId: "00001"
            }
          }
        ],
        id: "00001"
      })
    }

    if (file.id === "00021") {
      updateFolder({
        files: [
          {
            id: "00121",
            name: "00121",
            type: "folder",
            sync: true,
            meta: {
              parentDirId: "00021"
            }
          },
          {
            id: "00221",
            name: "00221",
            type: "folder",
            sync: true,
            meta: {
              parentDirId: "00021"
            }
          },
          {
            id: "00321",
            name: "00321",
            type: "folder",
            sync: true,
            meta: {
              parentDirId: "00021"
            }
          },
        ],
        id: "00021"
      })
    }

    if (file.id === "00321") {
      updateFolder({
        files: [
          {
            id: "01321",
            name: "01321",
            type: "folder",
            sync: true,
            meta: {
              parentDirId: "00321"
            }
          },
        ],
        id: "00321"
      })
    }

    if (file.id === "00121") {
      updateFolder({
        files: [
          {
            id: "01121",
            name: "01121",
            type: "file",
            sync: true,
            meta: {
              parentDirId: "00121"
            }
          },
        ],
        id: "00121"
      })
    }

    if (file.id === "00002") {
      updateFolder({
        files: [
          {
            id: "00012",
            name: "00012",
            type: "folder",
            sync: true,
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
      <Virtualizer.List estimateSize={40}>
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
              className="mb-2"
            >
               <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div className="py-1 px-2">
                    {folder.name} 
                    {folder.type === "folder" ? (
                      <span>
                        {isFolderOpen(folder) ? "v" : ">"}
                      </span>
                      ): null}
                  </div>
                </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => {
                        data(folder)
                        openFolderFromTree(folder)
                      }}
                    >
                      {isFolderOpen(folder) ? "Close" : "Open"}
                    </ContextMenuItem>
                  </ContextMenuContent>
              </ContextMenu>
            </FolderExplorer.Item>
          ))}
      </Virtualizer.List>
      <div>
        <h3>{ getCurrentFolder()?.name }</h3>
        <ContextMenu>
          <ContextMenuTrigger>
            <Virtualizer.Grid>
              {getCurrentFolderContent().map((file) => (
                <FolderContentExplorer.GridItem
                  key={file.id}
                  onDoubleClick={() => {
                    if (file.type === "folder") {
                      data(file)
                      openFolder(file)
                    }
                  }}
                  className={clsx(!file.sync && "bg-red-500")}
                >
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div className="py-1 px-2">
                        {file.name} {file.type}
                      </div>
                    </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem
                          onClick={() => {
                            data(file)
                            openFolder(file)
                          }}
                        >
                          Open
                        </ContextMenuItem>
                      </ContextMenuContent>
                  </ContextMenu>
                  
                </FolderContentExplorer.GridItem>
              ))}
            </Virtualizer.Grid>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                const currentFolder = getCurrentFolder()
                if (!currentFolder) {
                  return
                }
                const folder = createTempFolder(currentFolder)

                if (!folder) {
                  return
                }

                setTimeout(() => {
                  updateFile({
                    ...folder, 
                    sync: true,
                    meta: {...folder.meta, oldId: folder.id}
                  })
                }, 3000)
              }}
            >
              Create folder
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
)};

export const Root = Template.bind({});