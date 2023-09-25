import { useContext, useMemo } from "react"
import { InternalFile, RootContext } from "../root/root"

export function useTreeExplorer() {
    const root = useContext(RootContext)

    const folders = useMemo(() => {
        return root.files.filter((file) => file.type === "folder")
    }, [root.files])

    return {
        folders
    }
}