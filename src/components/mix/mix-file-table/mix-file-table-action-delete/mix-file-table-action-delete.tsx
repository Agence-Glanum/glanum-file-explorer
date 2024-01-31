import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../dropdown-menu/dropdown-menu";
import { Button } from "../../../button/button";
import { File } from "../../../../types/file";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../alert-dialog/alert-dialog";
import { deleteFile } from "../../../../stores/mix";

interface MixFileTableActionDeleteProps {
    file: File
    url: string
    removeFile: (file: File) => void
}

export default function MixFileTableActionDelete({file, url, removeFile}: MixFileTableActionDeleteProps) {

    const [open, setOpen] = useState(false)

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the file from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                deleteFile({
                                    url: `${url}/folders/${file.metadata?.parentDirId}/files/${file.id}`
                                })
                                removeFile(file)
                            }}
                        >
                            <AlertDialogAction asChild>
                                <button type="submit">Submit</button>
                            </AlertDialogAction>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                        <DotsVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                    <DropdownMenuItem className="text-destructive gap-2" onSelect={() => setOpen(true)}>
                        Delete <TrashIcon className="w-4 h-4" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}