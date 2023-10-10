import type { InternalFile } from "../components/file-explorer/use-file-explorer";
import * as Virtualizer from "../components/virtualizer/virtualizer";
import * as FolderExplorer from "../components/folder-explorer/folder-explorer";
import * as FolderContentExplorer from "../components/folder-content-explorer/folder-content-explorer";
import * as Dropzone from "../components/dropzone/dropzone";
import { useFileExplorer } from "../components/file-explorer/use-file-explorer";
import * as ContextMenu from "../components/context-menu/context-menu";
import { ArchiveIcon, CrumpledPaperIcon, DashboardIcon, FileIcon, InputIcon, ListBulletIcon } from "@radix-ui/react-icons";
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { useState } from "react";

export const Page: React.FC = () => {

  const [layout, setLayout] = useState<'list'|'grid'>('grid')

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
    updateFile,
    createTempFile,
    selectFile,
    selectedFiles,
    rename,
    startRenaming
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
            id: "00021",
            name: "00021",
            type: "folder",
            sync: true,
            meta: {
              parentDirId: "00001"
            }
          },
          {
            id: "00011",
            name: "00011",
            type: "file",
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
    <div className="flex p-4 h-screen bg-neutral-50">
      <Virtualizer.List className="h-full border-r border-gray-300" estimateSize={32}>
          {folders.map((folder) =>(
            <FolderExplorer.Item
              key={folder.id}
              className="h-[32px]"
            >
              <FolderExplorer.DepthIndicator depth={folder.depth} offset={7}/>
              <ContextMenu.Root>
                <ContextMenu.Trigger asChild>
                  <FolderExplorer.Content
                    onDoubleClick={() => {
                      data(folder)
                      openFolderFromTree(folder)
                    }}
                    onClick={() => {
                      clickFolder(folder)
                    }}
                    depth={folder.depth}
                    className="text-gray-800"
                    title={folder.name}
                  >
                    <FolderExplorer.OpenIndicator
                      open={isFolderOpen(folder)}
                      onClick={() => {
                        data(folder)
                        openFolderFromTree(folder)
                      }}
                    />
                    <ArchiveIcon className="ml-1" />
                    <span className="ml-2 max-w-[75px] truncate">{folder.name}</span>
                  </FolderExplorer.Content>  
                </ContextMenu.Trigger>
                  <ContextMenu.Content>
                    <ContextMenu.Item
                      onClick={() => {
                        data(folder)
                        openFolderFromTree(folder)
                      }}
                    >
                      {isFolderOpen(folder) ? "Close" : "Open"}
                    </ContextMenu.Item>
                    {isFolderOpen(folder) ? (
                      <ContextMenu.Item
                        onClick={() => {
                          const newfolder = createTempFolder(folder)

                          if (!newfolder) {
                            return
                          }

                          setTimeout(() => {
                            updateFile({
                              ...newfolder, 
                              sync: true,
                              meta: {...newfolder.meta, oldId: newfolder.id}
                            })
                          }, 3000)
                        }}
                      >
                        Create folder
                      </ContextMenu.Item>
                    ) : null}
                  </ContextMenu.Content>
              </ContextMenu.Root>
            </FolderExplorer.Item>
          ))}
      </Virtualizer.List>
      <div className="px-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{ getCurrentFolder()?.name }</h3>
          <div>
            <TogglePrimitive.Root 
              className="h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-800"
              pressed={layout === 'grid'}
              onPressedChange={() => setLayout('grid')}
            >
              <DashboardIcon className="h-4 w-4" />
            </TogglePrimitive.Root>
            <TogglePrimitive.Root
              className="ml-1 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-800"
              pressed={layout === 'list'}
              onPressedChange={() => setLayout('list')}
            >
              <ListBulletIcon className="h-4 w-4" />
            </TogglePrimitive.Root>
          </div>
          
        </div>
        
        <Dropzone.Root
          className="mt-6"
          onNewFiles={(files) => {
            const currentFolder = getCurrentFolder()

            if (!currentFolder) {
              return
            }

            files.map((file) => {
              createTempFile(currentFolder, file.name)
            })
            
          }}
        >
          <Dropzone.Overlay className="flex items-center justify-center">
            Upload
          </Dropzone.Overlay>
          {layout === 'grid' ? (
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <Virtualizer.Grid
                  estimeHeight={115}
                  estimateWidth={150}
                  className="w-full"
                >
                  {getCurrentFolderContent().map((file) => (
                    <FolderContentExplorer.GridItem
                      key={file.id}
                      onDoubleClick={() => {
                        if (file.type === "folder") {
                          data(file)
                          openFolder(file)
                        }
                      }}
                      onClick={(e) => {
                        selectFile(file)
                      }}
                      className="py-1 px-2"
                    >
                      <ContextMenu.Root>
                        <ContextMenu.Trigger asChild>
                          <div title={file.name} className="py-2 px-4 flex flex-col justify-center items-center border whitespace-nowrap rounded cursor-pointer ">
                            {file.type === "folder" ? (
                              <ArchiveIcon className="h-16 w-16 text-gray-600" />
                            ): null}
                            {file.type === "file" ? (
                              <FileIcon className="h-16 w-16 text-gray-600" />
                            ): null}
                            {file.renaming ? (
                              <FolderContentExplorer.RenameInput
                                type="text"
                                defaultValue={file.name}
                                onKeyUp={(e) => {
                                  if(e.key === 'Enter'){
                                    rename({...file, name: e.target.value})
                                  }
                                }}
                                onClickOutside={(value) => {
                                  rename({...file, name: value})
                                }}
                              />
                            ): (
                              <div className="font-semibold max-w-[120px] truncate">
                                {file.name}
                              </div>
                            )}
                          
                          </div>
                        </ContextMenu.Trigger>
                          <ContextMenu.Content>
                            {file.type === "folder" ? (
                              <ContextMenu.Item
                                onClick={(e) => {
                                  e.stopPropagation()
                                  data(file)
                                  openFolder(file)
                                }}
                              >
                                Open
                              </ContextMenu.Item>
                            ): null}
                              <ContextMenu.Item
                              onClick={() => {
                                startRenaming(file)
                              }}
                            >
                              Rename
                            </ContextMenu.Item>
                          </ContextMenu.Content>
                      </ContextMenu.Root>
                    </FolderContentExplorer.GridItem>
                  ))}
                </Virtualizer.Grid>
              </ContextMenu.Trigger>
              <ContextMenu.Content className="w-48">
                {getCurrentFolder() !== null ? (
                  <>
                    <ContextMenu.Item inset
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
                      <ContextMenu.Shortcut>⌘F</ContextMenu.Shortcut>
                    </ContextMenu.Item>
                    <ContextMenu.Item inset>
                      Reload
                      <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
                    </ContextMenu.Item>
                    <ContextMenu.Separator />
                  </>
                ) : null} 
                <ContextMenu.CheckboxItem checked>
                  Show grid
                  <ContextMenu.Shortcut>⌘⇧B</ContextMenu.Shortcut>
                </ContextMenu.CheckboxItem>
                <ContextMenu.CheckboxItem>Show list</ContextMenu.CheckboxItem>
              </ContextMenu.Content>
            </ContextMenu.Root>
          ) : null}
          {layout === 'list' ? (
            <Virtualizer.List className="h-full w-[750px]" estimateSize={50}>
              {getCurrentFolderContent().map((file) => (
                <FolderContentExplorer.ListItem
                  key={file.id}
                  onDoubleClick={() => {
                    if (file.type === "folder") {
                      data(file)
                      openFolder(file)
                    }
                  }}
                  onClick={(e) => {
                    selectFile(file)
                  }}
                  className="justify-between"
                >
                  <div className="flex items-center">
                    {file.type === "folder" ? (
                      <ArchiveIcon className="h-6 w-6 text-gray-600" />
                    ): null}
                    {file.type === "file" ? (
                      <FileIcon className="h-6 w-6 text-gray-600" />
                    ): null}
                    {file.renaming ? (
                      <FolderContentExplorer.RenameInput
                        type="text"
                        defaultValue={file.name}
                        onKeyUp={(e) => {
                          if(e.key === 'Enter'){
                            rename({...file, name: e.target.value})
                          }
                        }}
                        onClickOutside={(value) => {
                          rename({...file, name: value})
                        }}
                        className="ml-2"
                      />
                    ): (
                      <div className="ml-2 font-semibold max-w-[120px] truncate">
                        {file.name}
                      </div>
                    )}
                  </div>
                  <div
                    className="h-9 px-3 py-2 border border-gray-200 bg-transparent shadow-sm hover:bg-gray-100 hover:text-gray-800 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => startRenaming(file)}
                  >
                      <InputIcon className="h-4 w-4" />
                  </div>
                </FolderContentExplorer.ListItem>
              ))}
            </ Virtualizer.List>
          ) : null}
          
        </Dropzone.Root>
      </div>
      <div className="border-l border-gray-300">
        <div className="p-6 pt-0">
            {selectedFiles.length === 0 ? (
              <div className="text-center">
                <CrumpledPaperIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun fichier sélectionné</h3>
                <p className="mt-1 text-sm text-gray-500">Naviguez et sélectionnez un fichier pour voir plus d'informations.</p>
            </div>
            ): null}
            {selectedFiles.length === 1 ? (
              <div className="flex flex-col space-y-1.5 p-6">
                 {selectedFiles[0].type === "folder" ? (
                    <ArchiveIcon className="h-16 w-16 text-gray-600" />
                  ): null}
                    {selectedFiles[0].type === "file" ? (
                    <FileIcon className="h-16 w-16 text-gray-600" />
                  ): null}
                <h3 className="font-semibold leading-none tracking-tight">
                  {selectedFiles[0].name}
                </h3>
                <p className="text-sm text-gray-300">
                  {selectedFiles[0].meta?.parentDirId}
                </p>
              </div>
            ): null}
            {selectedFiles.length > 1 ? (
              <>Beaucou^p</>
            ): null}
        </div>
      </div>
    </div>
  )
}