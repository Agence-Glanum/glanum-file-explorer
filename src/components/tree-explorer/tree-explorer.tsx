import { useContext } from "react";
import { InternalFile, RootContext } from "../root/root";

const Level = ({files, onClick}) => {
    return (
        <>
            {files.filter((file) => file.type === "directory").map((file) => (
                <>
                    <div
                        key={file.id}
                        className="flex mb-2 py-1 px-2 border w-fit rounded cursor-pointer"
                        onClick={() => onClick(file)}
                    >
                        <span className="mr-2">{file.name}</span>
                        {file.type === "directory" ? <span>{">"}</span>: null}
                    </div>
                    {file.type === "directory" && file.children.length > 0 ? (
                        <div className="ml-6">
                            <Level files={file.children} onClick={onClick} />
                        </div>
                    ): null}
                </>
            ))}
        </>
    )
}

const TreeExplorer = ({onClickedDirectory}: {onClickedDirectory: (file: InternalFile) => void}) => {
    const root = useContext(RootContext)

    const onClick = (file: InternalFile) => {
        onClickedDirectory && onClickedDirectory(file)
    }

    return (
        <>
            <Level files={root.files}  onClick={onClick}/>
        </>
    )
}

TreeExplorer.displayName = "TreeExplorer"

export { TreeExplorer }