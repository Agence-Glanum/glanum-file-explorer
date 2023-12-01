import { ArchiveIcon, CrumpledPaperIcon, FileIcon } from "@radix-ui/react-icons";
import { useFileExplorer } from "../hooks/use-file-explorer";
import * as FolderContentExplorer from "../components/folder-content-explorer/folder-content-explorer";
import * as Virtualizer from "../components/virtualizer/virtualizer";
import { generateFilesData, generateFolder } from "../data/data";
import { useTreeExplorer } from "../hooks/use-tree-explorer";
import * as TreeExplorer from "../components/tree-explorer/tree-explorer";
import * as Dropzone from "../components/dropzone/dropzone";
import { File } from "../types/file"
import clsx from "clsx";
import { useState } from "react";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "../components/context-menu/context-menu";

export const V2: React.FC = () => {

    const [renaming, setRenaming] = useState<File|null>(null)

    const {
        currentFolder,
        currentFolderContent,
        updateFolder,
        focusFolder,
        store,
        createTempFolder,
        updateFile,
        createTempFile,
        selectedFiles,
        selectFile,
        isFileSelected,
        toggleSelectedFile,
        hasManySelectedFiles
    } = useFileExplorer({
        defaultFolder: generateFolder({canRoot: true})
    })

    const {
        folders,
        selectFolder,
        isFolderSelected,
        toggleOpenFolder,
        isFolderOpen,
        openFolder
    } = useTreeExplorer({ store })
    
    return (
        <div className="flex p-4 h-screen bg-neutral-50">
            <Virtualizer.List className="h-full border-r border-gray-300" estimateSize={32}>
                {folders().map((folder) =>(
                <TreeExplorer.Item
                    key={folder.id}
                    className="h-[32px]"
                >
                    <TreeExplorer.DepthIndicator depth={folder.depth} offset={7}/>
                    <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <TreeExplorer.Content
                            onDoubleClick={() => {
                                updateFolder(generateFolder({
                                    folderId: folder.id, 
                                    parentFolderId: folder.parent[folder.parent.length - 1],
                                    baseFolder: {
                                        name: folder.name
                                    }
                                }), {})
                                toggleOpenFolder(folder.id)
                                selectFolder(folder.id)
                            }}
                            onClick={() => {
                                focusFolder(folder.id)
                                selectFolder(folder.id)
                            }}
                            depth={folder.depth}
                            className={clsx(
                                isFolderSelected(folder.id) && "bg-gray-100 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600",
                                "text-gray-800"
                            )}
                            title={folder.name}
                        >
                            <TreeExplorer.OpenIndicator
                                open={isFolderOpen(folder.id)}
                                onClick={() => {
                                    updateFolder(generateFolder({
                                        folderId: folder.id, 
                                        parentFolderId: folder.parent[folder.parent.length - 1],
                                        baseFolder: {
                                            name: folder.name
                                        }
                                    }), {})
                                    selectFolder(folder.id)
                                    toggleOpenFolder(folder.id)
                                }}
                            />
                            <ArchiveIcon className="ml-1" />
                            <span className="ml-2 max-w-[75px] truncate">{folder.name}</span>
                        </TreeExplorer.Content>  
                    </ContextMenuTrigger>
                        <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => {
                                updateFolder(generateFolder({
                                    folderId: folder.id, 
                                    parentFolderId: folder.parent[folder.parent.length - 1],
                                    baseFolder: {
                                        name: folder.name
                                    }
                                }), {})
                                toggleOpenFolder(folder.id)
                                selectFolder(folder.id)
                            }}
                        >
                            {isFolderOpen(folder.id) ? "Close" : "Open"}
                        </ContextMenuItem>
                        {isFolderOpen(folder.id) ? (
                            <ContextMenuItem
                            onClick={() => {
                                const newfolder = createTempFolder(folder.id)
    
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
                </TreeExplorer.Item>
                ))}
            </Virtualizer.List>
            <div className="px-4 h-full">
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold">{ currentFolder?.name }</h3>
                <div>
                    {!currentFolder?.root ? (
                        <button
                            onClick={async () => {
                                const folder = generateFolder({
                                    folderId: currentFolder?.metadata?.parentDirId,
                                    child: currentFolder ?? undefined,
                                    canRoot: true
                                })

                                updateFolder(folder, {})
                                selectFolder(folder.id)
                                openFolder(folder?.meta?.parentDirId ?? "")
                            }}
                        >Back</button>
                    ): null}
                </div>
                
            </div>
            
            <Dropzone.Root
                className="mt-6"
                onNewFiles={(files) => {
                    if (!currentFolder) {
                    return
                    }

                    files.map((file) => {
                        createTempFile(currentFolder.id, {name: file.name})
                    })
                    
                }}
            >
                <Dropzone.Overlay className="flex items-center justify-center">
                    Upload
                </Dropzone.Overlay>
                <ContextMenu>
                    <ContextMenuTrigger>
                    <Virtualizer.Grid
                        onSrollEnd={() => {
                            if (!currentFolder) {
                                return
                            }

                            updateFolder({
                                ...currentFolder,
                                files: generateFilesData(currentFolder?.id, 0)}, 
                                {partial: true}
                            )
                        }}
                        estimeHeight={115}
                        estimateWidth={150}
                        className="w-full"
                    >
                        {currentFolderContent.map((file) => (
                            <FolderContentExplorer.GridItem
                                key={file.id}
                                onDoubleClick={() => {
                                if (file.type === "folder") {
                                    updateFolder(generateFolder({
                                        folderId: file.id, 
                                        parentFolderId: file.metadata?.parentDirId,
                                        baseFolder: {
                                            name: file.name
                                        }
                                    }), {})
                                    selectFolder(file.id)
                                    openFolder(file.id)   
                                }
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    
                                    if (e.ctrlKey) {
                                        toggleSelectedFile(file)
                                        return
                                    }
                                    selectFile(file)
                                }}
                                className="py-1 px-2"
                            >
                                <ContextMenu>
                                <ContextMenuTrigger asChild>
                                    <div
                                        title={file.name}
                                        className={clsx(isFileSelected(file.id) && "outline outline-offset-2 outline-2" , "py-2 px-4 flex flex-col justify-center items-center border whitespace-nowrap rounded cursor-pointer ")}
                                        
                                    >
                                    {file.type === "folder" ? (
                                        <ArchiveIcon className="h-16 w-16 text-gray-600" />
                                    ): null}
                                    {file.type === "file" ? (
                                        <FileIcon className="h-16 w-16 text-gray-600" />
                                    ): null}
                                    {renaming?.id === file.id ? (
                                        <FolderContentExplorer.RenameInput
                                        type="text"
                                        defaultValue={file.name}
                                        onKeyUp={(e) => {
                                            if(e.key === 'Enter'){
                                                updateFile({...file,  name: e.target.value})
                                                setRenaming(null)
                                                selectFile({...file,  name: e.target.value})
                                            }
                                        }}
                                        onClickOutside={(value) => {
                                            updateFile({...file,  name: value})
                                            setRenaming(null)
                                            selectFile({...file,  name: value})
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
                                        <ContextMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation()

                                                toggleSelectedFile(file)
                                            }}
                                        >
                                            {isFileSelected(file.id) ? "Unselect": "Select"}
                                        </ContextMenuItem>
                                        {file.type === "folder" && !(isFileSelected(file.id) && hasManySelectedFiles) ? (
                                            <ContextMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                updateFolder(generateFolder({
                                                    folderId: file.id, 
                                                    parentFolderId: file.metadata?.parentDirId,
                                                    baseFolder: {
                                                        name: file.name
                                                    }
                                                }), {})
                                                selectFolder(file.id)
                                                openFolder(file.id)
                                            }}
                                            >
                                            Open
                                            </ContextMenuItem>
                                        ): null}
                                        {!(isFileSelected(file.id) && hasManySelectedFiles) ? (
                                            <ContextMenuItem
                                                onClick={() => {
                                                    setRenaming(file)
                                                }}
                                            >
                                                Rename
                                            </ContextMenuItem>
                                        ) : null}
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
                                const folder = createTempFolder(currentFolder.id)

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