import { ReactNode, createContext, useContext, useMemo } from "react";
import { InternalFile } from "../root/root";
import { useTreeExplorer } from "./use-tree-explorer";

const RootContext = createContext<{folders: InternalFile[]}>({folders: []})

type RootProps = {
    children: ReactNode
}

const Root = ({children}: RootProps) => {
    const { folders } = useTreeExplorer()

    return (
        <RootContext.Provider value={{folders}}>
            {children}
        </RootContext.Provider>
    )
}

Root.displayName = "TreeExplorerRoot"

type LevelProps = {
    folders?: InternalFile[]
    children: ReactNode
}

const Level = ({folders, children}: LevelProps) => {
    const root = useContext(RootContext)

    const items = useMemo(() => {
        if (folders) {
            return folders
        }

        return root.folders
    }, [root.folders])

    return (
        <>
            {items.map((folder) => (
                <>
                    {children}
                    {folder.type === "folder" && folder.children && folder.children.length > 0 ? (
                        <div className="ml-6">
                            <Level folders={folder.children}>
                                {children}
                            </Level>
                        </div>
                    ): null}
                </>
            ))}
        </>
    )
}

Level.displayName = "TreeExplorerLevel"

type ItemProps = {
    folder: InternalFile
    onClick: (file: InternalFile) => void
}

const Item = ({onClick}: ItemProps) => {
    return (
        <div
            key={folder.id}
            className="flex mb-2 py-1 px-2 border w-fit rounded cursor-pointer"
            onClick={() => onClick(folder)}
        >
            <span className="mr-2">{folder.name}</span>
            {folder.type === "folder" ? <span>{">"}</span>: null}
        </div>
    )
}

Item.displayName = "TreeExplorerLevelItem"

export { Root, Level, Item }