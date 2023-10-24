import { ArchiveIcon, CrumpledPaperIcon, FileIcon } from "@radix-ui/react-icons";
import * as ContextMenu from "../components/context-menu/context-menu";
import { useFileExplorerV2 } from "../components/file-explorer/use-file-explorer-v2";
import * as FolderContentExplorer from "../components/folder-content-explorer/folder-content-explorer";
import * as Virtualizer from "../components/virtualizer/virtualizer";
import { generateFolder } from "../data/data";
import { useFolderExplorerV2 } from "../components/folder-explorer/use-folder-explorer-v2";
import * as FolderExplorer from "../components/folder-explorer/folder-explorer";
import * as Dropzone from "../components/dropzone/dropzone";
import clsx from "clsx";

export const V2: React.FC = () => {

    const {
        currentFolder,
        currentFolderContent,
        updateFolder,
        focusFolder,
        store,
        startRenaming,
        rename,
        createTempFolder,
        updateFile,
        createTempFile,
        selectedFiles,
        selectFile
    } = useFileExplorerV2({
        defaultFolder: generateFolder({canRoot: true})
    })

    const {
        folders,
        selectFolder,
        isFolderSelected,
        toggleOpenFolder,
        isFolderOpen,
        openFolder
    } = useFolderExplorerV2({ store })
    
    return (
        <div className="flex p-4 h-screen bg-neutral-50">
            <Virtualizer.List className="h-full border-r border-gray-300" estimateSize={32}>
                {folders().map((folder) =>(
                <FolderExplorer.Item
                    key={folder.id}
                    className="h-[32px]"
                >
                    <FolderExplorer.DepthIndicator depth={folder.depth} offset={7}/>
                    <ContextMenu.Root>
                    <ContextMenu.Trigger asChild>
                        <FolderExplorer.Content
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
                            <FolderExplorer.OpenIndicator
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
                        </FolderExplorer.Content>  
                    </ContextMenu.Trigger>
                        <ContextMenu.Content>
                        <ContextMenu.Item
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
                        </ContextMenu.Item>
                        {isFolderOpen(folder.id) ? (
                            <ContextMenu.Item
                            onClick={() => {
                                const newfolder = createTempFolder(folder.id)
    
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
            <div className="px-4 h-full">
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold">{ currentFolder?.name }</h3>
                <div>
                    {!currentFolder?.root ? (
                        <button
                            onClick={async () => {
                                const folder = generateFolder({
                                    folderId: currentFolder?.meta?.parentDirId,
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
                <ContextMenu.Root>
                    <ContextMenu.Trigger>
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
                                    updateFolder(generateFolder({
                                        folderId: file.id, 
                                        parentFolderId: file.meta?.parentDirId,
                                        baseFolder: {
                                            name: file.name
                                        }
                                    }), {})
                                    selectFolder(file.id)
                                    openFolder(file.id)   
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
                                                rename({...file, name: e.target.value })
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
                                            updateFolder(generateFolder({
                                                folderId: file.id, 
                                                parentFolderId: file.meta?.parentDirId,
                                                baseFolder: {
                                                    name: file.name
                                                }
                                            }), {})
                                            selectFolder(file.id)
                                            openFolder(file.id)
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
                    {currentFolder !== null ? (
                        <>
                        <ContextMenu.Item inset
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