import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuItemProps } from "../../types/context-menu";

function DefaultItem({key, item, state}: ContextMenuItemProps) {
    return (
        <>
            <ContextMenu.Item
                key={key}
                disabled={state?.isDisabled ?? true}
                onClick={item.onclick}
                className={item.itemClasse}
            >
                {item.name} <div className="RightSlot">{item.shortcut}</div>
            </ContextMenu.Item>
            {item.isSeparated ? <ContextMenu.Separator className={item.separatorClasse} /> : null }
        </>
    
    );
}

export default DefaultItem;
