import { useContext, useMemo } from "react"
import { InternalFile, RootContext, searchTree } from "../root/root"

const FolderExplorer = ({onClickedDirectory}: {onClickedDirectory: (file: InternalFile) => void}) => {
    const root = useContext(RootContext)

    const folder = useMemo<InternalFile|null>(() => {
        let folder = null

        root.files.some((file) => {
            folder = searchTree(file, root.current)

            return folder !== null
        })
        
        return folder
    }, [root.current])

    const onClick = (file: InternalFile) => {
        onClickedDirectory && onClickedDirectory(file)
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {folder?.children?.map((file) => (
                <div className="border p-4" key={file.id} onClick={() => onClick(file)}>
                    <span>{file.name}</span>
                    <span>{file.type}</span>
                </div>
            ))}
        </div>
    )
}

FolderExplorer.displayName = "FolderExplorer"

export { FolderExplorer }