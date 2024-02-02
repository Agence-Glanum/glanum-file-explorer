import { observer } from "@legendapp/state/react";
import * as FolderContentExplorer from "../../folder-content-explorer/folder-content-explorer";
import { ArchiveIcon, DotsVerticalIcon, ResetIcon } from "@radix-ui/react-icons";
import { File, FolderFiles } from "../../../types/file";
import { fetchFiles, fetchFolders, renameFile, state } from "../../../stores/mix";
import { KeyboardEvent } from "react";
import { FileExplorerReturnType } from "../../../hooks/use-file-explorer";
import { Skeleton } from "../../skeleton/skeleton";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../../context-menu/context-menu";

interface MixFolderGridProps extends FileExplorerReturnType {
    updateFiles: (folder: FolderFiles, {}) => void
}

const MixFolderGrid = observer(function MixFolderGrid({
    currentFolderContent,
    updateFile,
    currentFolder,
    isFileSelected,
    hasManySelectedFiles,
    updateFolder,
    updateFiles,
    focusFolder,
    folderExists
}: MixFolderGridProps) {

    const renaming = state.renaming.get()
    const url = state.url.get()
    const loading = state.foldersState.loading.get()

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

        if (folderExists(folder.id)) {
            focusFolder(folder.id)
            return
        }

        fetchFiles({
            url: `${url}/folders/${folder.id}/files?filter[type]=file`,
            onSuccess: (data) => updateFiles(data, {})
        })

        fetchFolders({
            url: `${url}/folders/${folder.id}/files?filter[type]=folder`,
            onSuccess: (data) => updateFolder(data, {})
        })
    }

    const goBack = () => {
        const parent = currentFolder?.metadata?.parentDirId
        if (!parent) {
            return
        }
        focusFolder(parent)
    }

    return (
        <div>
            <h3 className="font-semibold">Dossiers</h3>
            <div className="mt-2 grid grid-cols-5 gap-6">
                {!currentFolder?.root && !loading ? (
                    <div className="p-3 border border-gray-300 rounded select-none cursor-pointer" onDoubleClick={goBack}>
                        <div className="w-full flex gap-3">
                            <ResetIcon className="w-8 h-8 text-gray-300" />
                            <span className="text-xl font-semibold">Retour</span>
                        </div>
                    </div>
                ): null}
                {currentFolderContent.map((folder) => (
                    <ContextMenu>
                        <ContextMenuTrigger asChild>
                            <div
                                key={folder.id}
                                className="p-3 border border-gray-300 rounded select-none cursor-pointer"
                                onDoubleClick={(e) => {
                                    e.stopPropagation()
                                    onOpenFolder(folder)
                                }}
                            >
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
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onOpenFolder(folder)
                                }}
                            >
                                Open
                            </ContextMenuItem>
                            {!(isFileSelected(folder.id) && hasManySelectedFiles) ? (
                                <ContextMenuItem
                                    onClick={() => {
                                        state.renaming.set(folder)
                                    }}
                                >
                                    Rename
                                </ContextMenuItem>
                            ) : null}
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
                {loading && currentFolderContent.length === 0 ? [...Array(15).keys()].map(() => (
                    <Skeleton className="h-[50px]"/>
                )): null}
            </div>
        </div>
    )
})

export default MixFolderGrid
