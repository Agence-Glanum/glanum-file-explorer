import { useEffect, useState } from "react";
import { useFileExplorer } from "../hooks/use-file-explorer"
import * as ContextMenu from "../components/context-menu/context-menu";
import * as FolderContentExplorer from "../components/folder-content-explorer/folder-content-explorer";
import * as Virtualizer from "../components/virtualizer/virtualizer";
import { generateFilesData, generateFolder } from "../data/data";
import * as Dropzone from "../components/dropzone/dropzone";
import { ArchiveIcon, FileIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

export const Mix: React.FC = ({url}) => {

    const [renaming, setRenaming] = useState<File|null>(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const {
        currentFolder,
        currentFolderContent,
        updateFolder,
        createTempFolder,
        updateFile,
        createTempFile,
        selectFile,
        isFileSelected,
        toggleSelectedFile,
        hasManySelectedFiles
    } = useFileExplorer({})

    useEffect(() => {
        setLoading(true)
        fetch(`${url}/folders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(async (reponse) => {
            const resultat = await reponse.json()
            updateFolder(resultat.data, {partial: true})
            setData(resultat)
            setLoading(false)
        });
    }, []);

    return (
        <div className="h-screen">
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
                        onSrollEnd={() => {
                            if (!currentFolder) {
                                return
                            }

                            if (loading || data.links.next === null) {
                                return
                            }

                            setLoading(true)

                            fetch(data.links.next, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                            .then(async (reponse) => {
                                const resultat = await reponse.json()
                                updateFolder(resultat.data, {partial: true})
                                setData(resultat)
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
                                onDoubleClick={() => {
                                    if (file.type === "folder") {
                                        setLoading(true)
                                        fetch(`${url}/folders/${file.id}/files`, {
                                            method: "GET",
                                            headers: {
                                                "Content-Type": "application/json",
                                            }
                                        })
                                        .then(async (reponse) => {
                                            const resultat = await reponse.json()
                                            updateFolder(resultat.data, {})
                                            setData(resultat)
                                            setLoading(false)
                                        })
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
                                <ContextMenu.Root>
                                <ContextMenu.Trigger asChild>
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
                                        {file.type === "folder" && !(isFileSelected(file.id) && hasManySelectedFiles) ? (
                                            <ContextMenu.Item
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setLoading(true)
                                                fetch(`${url}/folders/${file.id}/files`, {
                                                    method: "GET",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    }
                                                })
                                                .then(async (reponse) => {
                                                    const resultat = await reponse.json()
                                                    updateFolder(resultat.data, {})
                                                    setData(resultat)
                                                    setLoading(false)
                                                })
                                            }}
                                            >
                                            Open
                                            </ContextMenu.Item>
                                        ): null}
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
                        <ContextMenu.Item inset
                            onClick={() => {
                                setLoading(true)
                                fetch(`${url}/folders/${data.data.id}/files`, {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                    }
                                })
                                .then(async (reponse) => {
                                    const resultat = await reponse.json()
                                    updateFolder(resultat.data, {refresh: true})
                                    setData(resultat)
                                    setLoading(false)
                                })
                            }}
                        >
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
    )
}