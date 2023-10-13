import { ArchiveIcon, FileIcon } from "@radix-ui/react-icons";
import * as ContextMenu from "../components/context-menu/context-menu";
import { useFileExplorerV2 } from "../components/file-explorer/use-file-explorer-v2";
import * as FolderContentExplorer from "../components/folder-content-explorer/folder-content-explorer";
import * as Virtualizer from "../components/virtualizer/virtualizer";
import { generateFolder } from "../data/data";
import { useFolderExplorerV2 } from "../components/folder-explorer/use-folder-explorer-v2";
import * as FolderExplorer from "../components/folder-explorer/folder-explorer";

export const V2: React.FC = () => {

    const {
        currentFolder,
        currentFolderContent,
        openFolder,
        updateFolder,
        clickFolder,
        store
    } = useFileExplorerV2({
        defaultFolder: generateFolder({canRoot: true})
    })

    const { folders } = useFolderExplorerV2({ store })
    
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
                            // updateFolder(generateFolderData(folder.id))
                            // openFolderFromTree(folder)
                        }}
                        onClick={() => {
                            clickFolder(folder.id)
                        }}
                        depth={folder.depth}
                        className="text-gray-800"
                        title={folder.name}
                        >
                        {/* <FolderExplorer.OpenIndicator
                            open={isFolderOpen(folder)}
                            onClick={() => {
                            // updateFolder(generateFolderData(folder.id))
                            // openFolderFromTree(folder)
                            }}
                        /> */}
                        <ArchiveIcon className="ml-1" />
                        <span className="ml-2 max-w-[75px] truncate">{folder.name}</span>
                        </FolderExplorer.Content>  
                    </ContextMenu.Trigger>
                        <ContextMenu.Content>
                        <ContextMenu.Item
                            onClick={() => {
                            // updateFolder(generateFolderData(folder.id))
                            // openFolderFromTree(folder)
                            }}
                        >
                            {/* {isFolderOpen(folder) ? "Close" : "Open"} */}
                        </ContextMenu.Item>
                        {/* {isFolderOpen(folder) ? (
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
                        ) : null} */}
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
                            onClick={() => {
                                updateFolder(
                                    currentFolder.meta?.parentDirId,
                                    generateFolder({
                                    folderId: currentFolder.meta?.parentDirId,
                                    child: currentFolder,
                                    canRoot: true
                                    })
                                )
                                openFolder(currentFolder.meta?.parentDirId)
                            }}
                        >Back</button>
                    ): null}
                </div>
                
            </div>
            
           
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
                                updateFolder(file.id, generateFolder({
                                    folderId: file.id, 
                                    parentFolderId: file.meta?.parentDirId
                                }))
                                openFolder(file.id)
                            }
                            }}
                            onClick={(e) => {
                            //selectFile(file)
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
                                            //rename({...file, name: e.target.value})
                                        }
                                    }}
                                    onClickOutside={(value) => {
                                        //rename({...file, name: value})
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
                                        updateFolder(file.id, generateFolder({
                                            folderId: file.id, 
                                            parentFolderId: file.meta?.parentDirId,
                                            baseFolder: {
                                                name: file.name
                                            }
                                        }))
                                        openFolder(file.id)
                                    }}
                                    >
                                    Open
                                    </ContextMenu.Item>
                                ): null}
                                    <ContextMenu.Item
                                    onClick={() => {
                                        //startRenaming(file)
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
                        // onClick={() => {
                        // if (!currentFolder) {
                        //     return
                        // }
                        // const folder = createTempFolder(currentFolder)

                        // if (!folder) {
                        //     return
                        // }

                        // setTimeout(() => {
                        //     updateFile({
                        //     ...folder, 
                        //     sync: true,
                        //     meta: {...folder.meta, oldId: folder.id}
                        //     })
                        // }, 3000)
                        // }}
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
        </div>
    </div>
    )
}