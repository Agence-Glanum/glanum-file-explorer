import { observer } from "@legendapp/state/react";
import { ToggleGroup, ToggleGroupItem } from "../../toggle-group/toggle-group";
import { DashboardIcon, TextAlignLeftIcon } from "@radix-ui/react-icons";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipProvider } from "../../tooltip/tooltip";
import { state } from "../../../stores/mix";

const MixFileToolbar = observer(function MixFileToolbar() {

    const layout = state.layout.get()

    const onLayoutChange = (value: string) => {
        if (value === "") {
            return
        }
        state.layout.set(value as "list"|"grid")
    }

    return (
        <div className="mb-2 flex justify-between">
            <h3 className="font-semibold">Fichiers</h3>
            <ToggleGroup type="single" value={layout} onValueChange={onLayoutChange}>
                    <ToggleGroupItem value="grid" aria-label="Grid layout" className="p-0">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="h-full w-full flex items-center justify-center px-3">
                                        <DashboardIcon className="w-4 h-4" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Grid layout</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List layout" className="p-0">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="h-full w-full flex items-center justify-center px-3">
                                        <TextAlignLeftIcon className="w-4 h-4" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>List layout</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
})

export default MixFileToolbar