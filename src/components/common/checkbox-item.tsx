import "../../styles/style.css"

import * as ContextMenu from "@radix-ui/react-context-menu";

import { CheckIcon } from "@radix-ui/react-icons";
import { ContextMenuItemProps } from "../../types/context-menu";

function CheckboxItem({key, item, index, state, handleContextMenu}: ContextMenuItemProps) {
    console.log("in child : ", state, handleContextMenu)
    return (
        <>
        <ContextMenu.CheckboxItem
            className="ContextMenuCheckboxItem"
            key={key}
            checked={state.checked}
            onCheckedChange={() => {
                handleContextMenu(index, !state.checked, "checked")
            }}
            disabled={state.isDisabled}
        >
            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                <CheckIcon />
            </ContextMenu.ItemIndicator>
            {item.name}
        </ContextMenu.CheckboxItem>
        {item.isSeparated ? <ContextMenu.Separator className="ContextMenuSeparator" /> : null }
        </>
    
    );
}

export default CheckboxItem;
