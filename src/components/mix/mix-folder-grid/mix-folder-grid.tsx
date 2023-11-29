import { observer } from "@legendapp/state/react";
import * as ContextMenu from "../../context-menu/context-menu";
import * as FolderContentExplorer from "../../folder-content-explorer/folder-content-explorer";
import { ArchiveIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { File, Folder, FolderFiles } from "../../../types/file";
import { fetchFiles, fetchFolders, renameFile, state } from "../../../stores/mix";
import { KeyboardEvent } from "react";

interface MixFolderGridProps {
    data: Folder[]
    updateFile: (file: File) => void
    currentFolder: FolderFiles|null
    isFileSelected: (file: string) => boolean
    hasManySelectedFiles: boolean
    updateFolders: (folder: FolderFiles, {}) => void
    updateFiles: (folder: FolderFiles, {}) => void
}

const MixFolderGrid = observer(function MixFolderGrid({
    data,
    updateFile,
    currentFolder,
    isFileSelected, 
    hasManySelectedFiles,
    updateFolders,
    updateFiles
}: MixFolderGridProps) {

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
    }

    const onOpenFolder = (folder: File) => {
        fetchFiles({
            url: `${url}/folders/${folder.id}/files?filter[type]=file`, 
            onSuccess: (data) => updateFiles(data, {})
        })
      
        fetchFolders({
            url: `${url}/folders/${folder.id}/files?filter[type]=folder`, 
            onSuccess: (data) => updateFolders(data, {})
        })
    }

    return (
        <div>
            <h3 className="font-semibold">Dossiers</h3>
            <div className="mt-2 grid grid-cols-5 gap-6">
                {data.map((folder) => (
                    <ContextMenu.Root>
                        <ContextMenu.Trigger asChild>
                            <div key={folder.id} className="p-3 border border-gray-300 rounded">
                                <div className="w-full flex justify-between gap-3">
                                    <ArchiveIcon className="w-8 h-8 text-gray-300" />
                                    {renaming?.id === folder.id ? (
                                        <FolderContentExplorer.RenameInput
                                            type="text"
                                            defaultValue={folder.name}
                                            onKeyUp={(e) => onRenamePressEnter(e, folder)}
                                            onClickOutside={(value) => onRenameClickOutside(folder, value)}
                                        />
                                    ): (
                                        <span className="text-xl font-semibold">{folder.name}</span>
                                    )}
                                    
                                    <DotsVerticalIcon className="w-6 h-6 text-gray-300"/>
                                </div>
                            </div>
                        </ContextMenu.Trigger>
                        <ContextMenu.Content>
                            <ContextMenu.Item
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onOpenFolder(folder)
                                }}
                            >
                                Open
                            </ContextMenu.Item>
                            {!(isFileSelected(folder.id) && hasManySelectedFiles) ? (
                                <ContextMenu.Item
                                    onClick={() => {
                                        state.renaming.set(folder)
                                    }}
                                >
                                    Rename
                                </ContextMenu.Item>
                            ) : null}
                        </ContextMenu.Content>
                    </ContextMenu.Root>
                ))}
            </div>
        </div>
    )
})

export default MixFolderGrid