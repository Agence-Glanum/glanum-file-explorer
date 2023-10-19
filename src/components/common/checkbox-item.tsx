import "../../styles/style.css"

import * as ContextMenu from "@radix-ui/react-context-menu";

import { CheckIcon } from "@radix-ui/react-icons";
import { ContextMenuItemProps } from "../../types/context-menu-type";
import useCheckbox from "../../hooks/useCheckbox";

function CheckboxItem({key, item, index, state}: ContextMenuItemProps) {
  const handleCheckbox = useCheckbox(index, !state.checked);
    return (
        <>
        <ContextMenu.CheckboxItem
            className="ContextMenuCheckboxItem"
            key={key}
            checked={state.checked}
            onCheckedChange={() => {
                handleCheckbox()
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
