import { useEffect, useState } from "react";
import { useFileExplorer } from "../../hooks/use-file-explorer"
import * as Dropzone from "../dropzone/dropzone";
import { fetchFiles, fetchFolders, state } from "../../stores/mix";
import MixFileTable from "./mix-file-table/mix-file-table";
import { observer } from "@legendapp/state/react";
import MixFolderGrid from "./mix-folder-grid/mix-folder-grid";
import MixFileGrid from "./mix-file-grid/mix-file-grid";
import MixFileToolbar from "./mix-file-toolbar/mix-file-toolbar";

const Mix = observer(function Mix({url}: {url: string}) {
    const sorting = state.sorting.get()
    const layout = state.layout.get()

    const filesExplorer = useFileExplorer({})

    const foldersExplorer = useFileExplorer({})

    useEffect(() => {
        const sort = sorting.reduce((acc, sort, i) => 
            `${acc}${i > 0 ? ",": ""}${sort.desc ? "-" : ""}${sort.id}` 
        , '&sort=')

        fetchFiles({
            url: `${url}/folders?filter[type]=file${sorting.length === 0 ? '' : sort}`, 
            onSuccess: (data) => filesExplorer.updateFolder(data, {refresh: true})
        })
    }, [sorting])

    useEffect(() => {
        fetchFolders({
            url: `${url}/folders?filter[type]=folder`, 
            onSuccess: (data) => foldersExplorer.updateFolder(data, {refresh: true})
        })
    }, [])

    useEffect(() => {
        state.url.set(url)
    }, [url])

    const onFileDropped = (files: Array<any>) => {
        const currenFolder = filesExplorer.currentFolder
        if (!currenFolder) {
            return
        }

        files.map((file) => {
            filesExplorer.createTempFile(currenFolder.id, {name: file.name})
        })
    }

    return (
        <div className="h-screen container mx-auto">
            <Dropzone.Root
                className="mt-6 w-full"
                onNewFiles={onFileDropped}
            >
                <Dropzone.Overlay className="flex items-center justify-center">
                    Upload
                </Dropzone.Overlay>
            <div className="w-full">
                <MixFolderGrid
                    {...foldersExplorer}
                    updateFiles={filesExplorer.updateFolder}
                />
                <div className="mt-10">
                    <MixFileToolbar />

                    {layout === "grid" ? (
                        <MixFileGrid {...filesExplorer} />
                    ): null}
                    {layout === 'list' ? (
                        <MixFileTable {...filesExplorer} />
                    ): null}
                </div>
            </div>
            </Dropzone.Root>
        </div>
    )
})

export default Mix