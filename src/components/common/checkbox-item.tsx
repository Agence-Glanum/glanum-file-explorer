import * as ContextMenu from "@radix-ui/react-context-menu";

import { CheckIcon } from "@radix-ui/react-icons";
import { ContextMenuItemProps } from "../../types/context-menu";

function CheckboxItem({key, item, index, state, handleContextMenu}: ContextMenuItemProps) {
    return (
        <>
        <ContextMenu.CheckboxItem
            className={item.checkboxClasse}
            key={key}
            checked={state.checkboxValue}
            onCheckedChange={() => {
                handleContextMenu(index, !state.checkboxValue, "checkboxValue")
            }}
            disabled={state.isDisabled}
        >
            <ContextMenu.ItemIndicator className={item.itemIndicator}>
                <CheckIcon />
            </ContextMenu.ItemIndicator>
            {item.name}
        </ContextMenu.CheckboxItem>
        {item.isSeparated ? <ContextMenu.Separator className={item.separatorClasse} /> : null }
        </>
    
    );
}

export default CheckboxItem;
