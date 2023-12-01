import { observable } from "@legendapp/state";
import { SortingState } from "@tanstack/react-table";
import { File, FolderFiles } from "../types/file";

interface DataState { 
    links?: {
        first: string
        last: string
        prev: string|null
        next: string|null
    }
    meta?: {
        current_page: number
        from: number
        last_page: number
        links: {
            url: string|null
            label: string
            active: boolean
        }[]
        path: string
        per_page: number
        to: number
        total: number
    }
    loading: boolean
}

interface State {
    url: string
    layout: 'grid'|'list'
    renaming: File|null
    sorting: SortingState,
    foldersState: DataState,
    filesState: DataState
}

export const state = observable<State>({
    url: "",
    layout: 'list',
    renaming: null,
    sorting: [],
    foldersState: {loading: false},
    filesState: {loading: false},
})

interface fetchParams {
    url: string
    onSuccess: (data: FolderFiles) => void
}

export async function fetchFolders({url, onSuccess}: fetchParams)  {
    state.foldersState.loading.set(true)

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data = await response.json()

    state.foldersState.set({
        links: data.links,
        meta: data.meta,
        loading: false
    })

    onSuccess(data.data as FolderFiles)
}

export async function fetchFiles({url, onSuccess}: fetchParams)  {
    state.filesState.loading.set(true)

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data = await response.json()

    state.filesState.set({
        links: data.links,
        meta: data.meta,
        loading: false
    })

    onSuccess(data.data as FolderFiles)
}

export async function renameFile({url, onSuccess, name}: {name: string} & fetchParams) {

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({name})
    })

    const data = await response.json()

    onSuccess(data.data as FolderFiles)
}

export async function deleteFile({url, onSuccess}: {url: string, onSuccess?: () => void}) {

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })

    await response.json()

    onSuccess && onSuccess()
}