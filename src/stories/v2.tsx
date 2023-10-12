import { ArchiveIcon, FileIcon } from "@radix-ui/react-icons";
import * as ContextMenu from "../components/context-menu/context-menu";
import { useFileExplorerV2 } from "../components/file-explorer/use-file-explorer-v2";
import * as FolderContentExplorer from "../components/folder-content-explorer/folder-content-explorer";
import * as Virtualizer from "../components/virtualizer/virtualizer";
import { generateFolder } from "../data/data";

export const V2: React.FC = () => {

    const {
        currentFolder,
        currentFolderContent,
        openFolder,
        updateFolder
    } = useFileExplorerV2({
        defaultFolder: generateFolder({})
    })
    
    return (
        <>
            {currentFolder?.root ? (
                 <button
                    onClick={() => {
                        updateFolder(
                            currentFolder.meta?.parentDirId,
                            generateFolder({
                               folderId: currentFolder.meta?.parentDirId,
                               child: currentFolder
                            })
                        )
                        openFolder(currentFolder.meta?.parentDirId)
                    }}
                >Back</button>
            ): null}
           
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
                                            parentFolderId: file.meta?.parentDirId
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
        </>
    )
}