import { observable } from "@legendapp/state";
import { SortingState } from "@tanstack/react-table";

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
    sorting: SortingState,
    foldersState: DataState,
    filesState: DataState
}

export const state = observable<State>({ 
    sorting: [],
    foldersState: {loading: false},
    filesState: {loading: false},
})

interface fetchParams {
    url: string
    onSuccess: (data: any[]) => void
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
        ...data.links,
        ...data.meta,
        loading: false
    })

    onSuccess(data.data)
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
        ...data.links,
        ...data.meta,
        loading: false
    })

    onSuccess(data.data)
}