import * as Virtualizer from "../components/virtualizer/virtualizer";
import * as FolderExplorer from "../components/tree-explorer/tree-explorer";
import * as FolderContentExplorer from "../components/folder-content-explorer/folder-content-explorer";
import * as Dropzone from "../components/dropzone/dropzone";
import { useFileExplorerLegacy } from "../hooks/use-file-explorer-legacy";
import { ArchiveIcon, CrumpledPaperIcon, DashboardIcon, FileIcon, InputIcon, ListBulletIcon } from "@radix-ui/react-icons";
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { useState } from "react";
import { generateFolderData } from "../data/data";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "../components/context-menu/context-menu";
export const Page: React.FC = () => {

  const [layout, setLayout] = useState<'list'|'grid'>('grid')

  const {
    folders,
    openFolder,
    openFolderFromTree,
    clickFolder,
    updateFolder,
    isFolderOpen,
    currentFolder,
    currentFolderContent,
    createTempFolder,
    updateFile,
    createTempFile,
    selectFile,
    selectedFiles,
    rename,
    startRenaming
  } = useFileExplorerLegacy({
      defaultFiles: generateFolderData()
  })

  return (
    <div className="flex p-4 h-screen bg-neutral-50">
      <Virtualizer.List className="h-full border-r border-gray-300" estimateSize={32}>
          {folders.map((folder) =>(
            <FolderExplorer.Item
              key={folder.id}
              className="h-[32px]"
            >
              <FolderExplorer.DepthIndicator depth={folder.depth} offset={7}/>
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <FolderExplorer.Content
                    onDoubleClick={() => {
                      updateFolder(generateFolderData(folder.id))
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
                        updateFolder(generateFolderData(folder.id))
                        openFolderFromTree(folder)
                      }}
                    />
                    <ArchiveIcon className="ml-1" />
                    <span className="ml-2 max-w-[75px] truncate">{folder.name}</span>
                  </FolderExplorer.Content>  
                </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => {
                        updateFolder(generateFolderData(folder.id))
                        openFolderFromTree(folder)
                      }}
                    >
                      {isFolderOpen(folder) ? "Close" : "Open"}
                    </ContextMenuItem>
                    {isFolderOpen(folder) ? (
                      <ContextMenuItem
                        onClick={() => {
                          const newfolder = createTempFolder(folder)

                          if (!newfolder) {
                            return
                          }

                          setTimeout(() => {
                            updateFile({
                              ...newfolder, 
                              sync: true,
                              metadata: {...newfolder.metadata, oldId: newfolder.id}
                            })
                          }, 3000)
                        }}
                      >
                        Create folder
                      </ContextMenuItem>
                    ) : null}
                  </ContextMenuContent>
              </ContextMenu>
            </FolderExplorer.Item>
          ))}
      </Virtualizer.List>
      <div className="px-4 h-full">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{ currentFolder?.name }</h3>
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
            <ContextMenu>
              <ContextMenuTrigger>
                <Virtualizer.Grid
                  estimeHeight={115}
                  estimateWidth={150}
                  className="w-full"
                >
                  {currentFolderContent.map((file) => (
                    <FolderContentExplorer.GridItem
                      key={file.id}
                      onDoubleClick={() => {
                        if (file.type === "folder") {
                          updateFolder(generateFolderData(file.id))
                          openFolder(file)
                        }
                      }}
                      onClick={(e) => {
                        selectFile(file)
                      }}
                      className="py-1 px-2"
                    >
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
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
                        </ContextMenuTrigger>
                          <ContextMenuContent>
                            {file.type === "folder" ? (
                              <ContextMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateFolder(generateFolderData(file.id))
                                  openFolder(file)
                                }}
                              >
                                Open
                              </ContextMenuItem>
                            ): null}
                              <ContextMenuItem
                              onClick={() => {
                                startRenaming(file)
                              }}
                            >
                              Rename
                            </ContextMenuItem>
                          </ContextMenuContent>
                      </ContextMenu>
                    </FolderContentExplorer.GridItem>
                  ))}
                </Virtualizer.Grid>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                {currentFolder !== null ? (
                  <>
                    <ContextMenuItem inset
                      onClick={() => {
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
                            metadata: {...folder.metadata, oldId: folder.id}
                          })
                        }, 3000)
                      }}
                    >
                      Create folder
                      <ContextMenuShortcut>⌘F</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                      Reload
                      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                  </>
                ) : null} 
                <ContextMenuCheckboxItem checked>
                  Show grid
                  <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Show list</ContextMenuCheckboxItem>
              </ContextMenuContent>
            </ContextMenu>
          ) : null}
          {layout === 'list' ? (
            <Virtualizer.List className="h-full w-[750px]" estimateSize={50}>
              {currentFolderContent.map((file) => (
                <FolderContentExplorer.ListItem
                  key={file.id}
                  onDoubleClick={() => {
                    if (file.type === "folder") {
                      updateFolder(generateFolderData(file.id))
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
                  {selectedFiles[0].metadata?.parentDirId}
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