import { useEffect, useState } from "react";
import { useFileExplorer } from "../../hooks/use-file-explorer"
import * as ContextMenu from "../context-menu/context-menu";
import * as FolderContentExplorer from "../folder-content-explorer/folder-content-explorer";
import * as Virtualizer from "../virtualizer/virtualizer";
import * as Dropzone from "../dropzone/dropzone";
import { ArchiveIcon, DotsVerticalIcon, FileIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { fetchFiles, fetchFolders, state } from "../../stores/mix";
import MixFileTable from "./mix-file-table/mix-file-table";
import { observer } from "@legendapp/state/react";

const Mix = observer(function Mix({url}: {url: string}) {

    const [renaming, setRenaming] = useState<File|null>(null)
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
        fetchFiles({
            url: `${url}/folders?filter[type]=file`, 
            onSuccess: (data) => updateFolder(data, {})
        })
    }, [])

    useEffect(() => {
        fetchFolders({
            url: `${url}/folders?filter[type]=folder`, 
            onSuccess: (data) => updateFolderFolders(data, {})
        })
    }, [])

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
                <div>
                    <h3 className="font-semibold">Dossiers</h3>
                    <div className="mt-2 grid grid-cols-5 gap-6">
                        {currentFolderFoldersContent.map((folder) => (
                            <ContextMenu.Root>
                                <ContextMenu.Trigger asChild>
                                    <div key={folder.id} className="p-3 border border-gray-300 rounded">
                                        <div className="w-full flex justify-between gap-3">
                                            <ArchiveIcon className="w-8 h-8 text-gray-300" />
                                            {renaming?.id === folder.id ? (
                                                <FolderContentExplorer.RenameInput
                                                    type="text"
                                                    defaultValue={folder.name}
                                                    onKeyUp={(e) => {
                                                        if(e.key === 'Enter'){
                                                            setRenaming(null)
                                                            const value = e.target.value
                                                            if (value === folder.name) {
                                                                return
                                                            }
                                                            fetch(`${url}/folders/${currentFolderFolders?.id}/files/${folder.id}`, {
                                                                method: "PUT",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                }, 
                                                                body: JSON.stringify({name: value})
                                                            })
                                                            
                                                            updateFileFolder({...folder,  name: value})
                                                        }
                                                    }}
                                                    onClickOutside={(value) => {
                                                        setRenaming(null)
                                                        if (value === folder.name) {
                                                            return
                                                        }
                                                        fetch(`${url}/folders/${currentFolder?.id}/files/${folder.id}`, {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            }, 
                                                            body: JSON.stringify({name: value})
                                                        })
                                                        updateFileFolder({...folder,  name: value})
                                                    }}
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
                                            // setLoading(true)
                                            // fetch(`${url}/folders/${folder.id}/files?filter[type]=file`, {
                                            //     method: "GET",
                                            //     headers: {
                                            //         "Content-Type": "application/json",
                                            //     }
                                            // })
                                            // .then(async (reponse) => {
                                            //     const resultat = await reponse.json()
                                            //     updateFolder(resultat.data, {})
                                            //     setFiles(resultat)
                                            //     setLoading(false)
                                            // })

                                            // fetch(`${url}/folders/${folder.id}/files?filter[type]=folder`, {
                                            //     method: "GET",
                                            //     headers: {
                                            //         "Content-Type": "application/json",
                                            //     }
                                            // })
                                            // .then(async (reponse) => {
                                            //     const resultat = await reponse.json()
                                            //     updateFolderFolders(resultat.data, {})
                                            //     setFolders(resultat)
                                            // })
                                        }}
                                    >
                                        Open
                                    </ContextMenu.Item>
                                    {!(isFileSelected(folder.id) && hasManySelectedFiles) ? (
                                        <ContextMenu.Item
                                            onClick={() => {
                                                setRenaming(folder)
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
                <div className="mt-10">
                    <h3 className="font-semibold">Fichiers</h3>
                    {/* <Virtualizer.Grid
                        onSrollEnd={() => {
                            if (!currentFolder) {
                                return
                            }

                            if (loading || files.links.next === null) {
                                return
                            }

                            setLoading(true)

                            fetch(files.links.next, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                            .then(async (reponse) => {
                                const resultat = await reponse.json()
                                updateFolder(resultat.data, {partial: true})
                                setFiles(resultat)
                                setLoading(false)
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
                                    {renaming?.id === file.id ? (
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
                                                    setRenaming(file)
                                                }}
                                            >
                                                Rename
                                            </ContextMenu.Item>
                                        ) : null}
                                    </ContextMenu.Content>
                                </ContextMenu.Root>
                            </FolderContentExplorer.GridItem>
                        ))}
                    </Virtualizer.Grid> */}
                    <MixFileTable
                        data={currentFolderContent}
                        fetchNextPage={() => {
                            fetchFiles({
                                url: next, 
                                onSuccess: (data) => updateFolder(data, {partial: true})
                            })
                        }}
                    />
                </div>
            </div>
            </Dropzone.Root>
        </div>
    )
})

export default Mix