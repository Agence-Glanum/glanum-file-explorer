import "../../styles/style.css"

import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuItemProps } from "../../types/context-menu";
import { DotFilledIcon } from "@radix-ui/react-icons";

function RadioItem({key, item, index, state, handleContextMenu}: ContextMenuItemProps) {
    return (
        <>
            <ContextMenu.Label className="ContextMenuLabel">
                {item.radioGroupName}
            </ContextMenu.Label>
            <ContextMenu.RadioGroup
                key={key}
                value={state.radioValue}
                onValueChange={(value) => {
                    handleContextMenu(index, value, "radioValue")
                }}
            >
            {item.radioEntries?.map((entry: string) => {
                return (
                <ContextMenu.RadioItem
                    className="ContextMenuRadioItem"
                    value={entry}
                    key={entry}
                >
                    <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                        <DotFilledIcon />
                    </ContextMenu.ItemIndicator>
                    {entry}
                </ContextMenu.RadioItem>
                )
            })}
            </ContextMenu.RadioGroup>
            {item.isSeparated ? <ContextMenu.Separator className="ContextMenuSeparator" /> : null }
        </>
    
    );
}

export default RadioItem;



