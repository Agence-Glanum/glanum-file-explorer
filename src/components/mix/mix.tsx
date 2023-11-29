import { useEffect, useState } from "react";
import { useFileExplorer } from "../../hooks/use-file-explorer"
import * as Dropzone from "../dropzone/dropzone";
import { fetchFiles, fetchFolders, state } from "../../stores/mix";
import MixFileTable from "./mix-file-table/mix-file-table";
import { observer } from "@legendapp/state/react";
import MixFolderGrid from "./mix-folder-grid/mix-folder-grid";
import { Folder } from "../../types/file";
import * as Virtualizer from "../virtualizer/virtualizer";
import * as FolderContentExplorer from "../folder-content-explorer/folder-content-explorer";
import * as ContextMenu from "../context-menu/context-menu";
import { FileIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

const Mix = observer(function Mix({url}: {url: string}) {
    const [layout, setLayout] = useState<'list'|'grid'>('grid')

    const sorting = state.sorting.get()
    const next = state.filesState.links.next.get()

    const {
        currentFolder,
        currentFolderContent,
        updateFolder,
        updateFile,
        createTempFile,
        selectFile,
        isFileSelected,
        toggleSelectedFile,
        hasManySelectedFiles
    } = useFileExplorer({})

    const {
        currentFolder: currentFolderFolders,
        currentFolderContent: currentFolderFoldersContent,
        updateFolder: updateFolderFolders,
        updateFile: updateFileFolder
    } = useFileExplorer({})

    useEffect(() => {
        const sort = sorting.reduce((acc, sort, i) => 
            `${acc}${i > 0 ? ",": ""}${sort.desc ? "-" : ""}${sort.id}` 
        , '')

        fetchFiles({
            url: `${url}/folders?filter[type]=file&sort=${sort}`, 
            onSuccess: (data) => updateFolder(data, {})
        })
    }, [sorting])

    useEffect(() => {
        fetchFolders({
            url: `${url}/folders?filter[type]=folder`, 
            onSuccess: (data) => updateFolderFolders(data, {})
        })
    }, [])

    useEffect(() => {
        state.url.set(url)
    }, [url])

    return (
        <div className="h-screen container mx-auto">
            <Dropzone.Root
                className="mt-6 w-full"
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
            <div className="w-full">
                <MixFolderGrid
                    data={currentFolderFoldersContent as Folder[]}
                    updateFile={updateFileFolder}
                    currentFolder={currentFolder}
                    isFileSelected={isFileSelected}
                    hasManySelectedFiles={hasManySelectedFiles}
                    updateFiles={updateFolder}
                    updateFolders={updateFolderFolders}
                />
                <div className="mt-10">
                    <h3 className="font-semibold">Fichiers</h3>
                    {layout === "grid" ? (
                        <Virtualizer.Grid
                            onSrollEnd={() => {
                                if (!currentFolder) {
                                    return
                                }

                                if (state.filesState.loading.get() || state.filesState.links.next === null) {
                                    return
                                }

                                fetchFiles({
                                    url: next, 
                                    onSuccess: (data) => updateFolder(data, {partial: true})
                                })
                            }}
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
                                        {/* {renaming?.id === file.id ? (
                                            <FolderContentExplorer.RenameInput
                                                type="text"
                                                defaultValue={file.name}
                                                onKeyUp={(e) => {
                                                    if(e.key === 'Enter'){
                                                        setRenaming(null)
                                                        const value = e.target.value
                                                        if (value === file.name) {
                                                            return
                                                        }
                                                        fetch(`${url}/folders/${currentFolder?.id}/files/${file.id}`, {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            }, 
                                                            body: JSON.stringify({name: value})
                                                        })
                                                        
                                                        updateFile({...file,  name: value})
                                                        selectFile({...file,  name: value})
                                                    }
                                                }}
                                                onClickOutside={(value) => {
                                                    setRenaming(null)
                                                    if (value === file.name) {
                                                        return
                                                    }
                                                    fetch(`${url}/folders/${currentFolder?.id}/files/${file.id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        }, 
                                                        body: JSON.stringify({name: value})
                                                    })
                                                    updateFile({...file,  name: value})
                                                    selectFile({...file,  name: value})
                                                }}
                                            />
                                        ): ( */}
                                            <div className="font-semibold max-w-[120px] truncate">
                                                {file.name}
                                            </div>
                                        {/* )} */}
                                        
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
                                                        //setRenaming(file)
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
                    ): null}
                    {layout === 'list' ? (
                        <MixFileTable
                            data={currentFolderContent}
                            fetchNextPage={() => {
                                fetchFiles({
                                    url: next, 
                                    onSuccess: (data) => updateFolder(data, {partial: true})
                                })
                            }}
                        />
                    ): null}
                </div>
            </div>
            </Dropzone.Root>
        </div>
    )
})

export default Mix