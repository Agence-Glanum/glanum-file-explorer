import {KeyboardEvent} from "react"
import { observer } from "@legendapp/state/react";
import { FileExplorerReturnType } from "../../../hooks/use-file-explorer";
import * as Virtualizer from "../../virtualizer/virtualizer";
import * as FolderContentExplorer from "../../folder-content-explorer/folder-content-explorer";
import * as ContextMenu from "../../context-menu/context-menu";
import { FileIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { fetchFiles, renameFile, state } from "../../../stores/mix";
import { File } from "../../../types/file";

interface MixFileGridProps extends FileExplorerReturnType {}

const MixFileGrid = observer(function MixFileGrid({
    currentFolderContent,
    updateFolder,
    selectFile,
    toggleSelectedFile,
    currentFolder,
    isFileSelected,
    hasManySelectedFiles,
    updateFile
}: MixFileGridProps) {

    const loading = state.filesState.loading.get()
    const nextUrl = state.filesState.links.next.get()
    const renaming = state.renaming.get()
    const url = state.url.get()

    const onRenamePressEnter = (e: KeyboardEvent<HTMLInputElement>, folder: File) => {
        if(e.key === 'Enter'){
            state.renaming.set(null)

            const value = (e.target as HTMLInputElement).value

            if (value === folder.name) {
                return
            }
            renameFile({
                url: `${url}/folders/${currentFolder?.id}/files/${folder.id}`,
                onSuccess: () => {},
                name: value
            })
            
            updateFile({...folder,  name: value})
            selectFile({...folder,  name: value})
        }
    }

    const onRenameClickOutside = (folder: File, value: string) => {
        state.renaming.set(null)

        if (value === folder.name) {
            return
        }

         renameFile({
            url: `${url}/folders/${currentFolder?.id}/files/${folder.id}`,
            onSuccess: () => {},
            name: value
        })

        updateFile({...folder,  name: value})
        selectFile({...folder,  name: value})
    }

    return (
        <Virtualizer.Grid
            onSrollEnd={() => {
                if (!currentFolder) {
                    return
                }

                if (loading || nextUrl === null) {
                    return
                }

                fetchFiles({
                    url: nextUrl, 
                    onSuccess: (data) => updateFolder(data, {partial: true})
                })
            }}
            columns={8}
            estimeHeight={115}
            estimateWidth={150}
            className="w-full"
        >
            {currentFolderContent.map((file) => (
                <FolderContentExplorer.GridItem
                    key={file.id}
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
                    <ContextMenu.Root>
                    <ContextMenu.Trigger asChild>
                        <div
                            title={file.name}
                            className={clsx(isFileSelected(file.id) && "outline outline-offset-2 outline-2" , "py-2 px-4 flex flex-col justify-center items-center border whitespace-nowrap rounded cursor-pointer ")} 
                        >
                        <FileIcon className="h-16 w-16 text-gray-600" />
                        {renaming?.id === file.id ? (
                            <FolderContentExplorer.RenameInput
                                type="text"
                                defaultValue={file.name}
                                onKeyUp={(e) => onRenamePressEnter(e, file)}
                                onClickOutside={(value) => onRenameClickOutside(file, value)}
                            />
                        ): (
                            <div className="font-semibold max-w-[120px] truncate">
                                {file.name}
                            </div>
                        )}
                        
                        </div>
                    </ContextMenu.Trigger>
                        <ContextMenu.Content>
                            <ContextMenu.Item
                                onClick={(e) => {
                                    e.stopPropagation()

                                    toggleSelectedFile(file)
                                }}
                            >
                                {isFileSelected(file.id) ? "Unselect": "Select"}
                            </ContextMenu.Item>
                            {!(isFileSelected(file.id) && hasManySelectedFiles) ? (
                                <ContextMenu.Item
                                    onClick={() => {
                                        state.renaming.set(file)
                                    }}
                                >
                                    Rename
                                </ContextMenu.Item>
                            ) : null}
                        </ContextMenu.Content>
                    </ContextMenu.Root>
                </FolderContentExplorer.GridItem>
            ))}
        </Virtualizer.Grid>
    )
})

export default MixFileGrid