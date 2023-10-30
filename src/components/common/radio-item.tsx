import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuItemProps } from "../../types/context-menu";
import { DotFilledIcon } from "@radix-ui/react-icons";

function RadioItem({key, item, index, state, handleContextMenu}: ContextMenuItemProps) {
    return (
        <>
            <ContextMenu.Label className={item.labelGroupClasse}>
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
                    className={item.radioClasse}
                    value={entry}
                    key={entry}
                >
                    <ContextMenu.ItemIndicator className={item.itemIndicator}>
                        <DotFilledIcon />
                    </ContextMenu.ItemIndicator>
                    {entry}
                </ContextMenu.RadioItem>
                )
            })}
            </ContextMenu.RadioGroup>
            {item.isSeparated ? <ContextMenu.Separator className={item.separatorClasse} /> : null }
        </>
    
    );
}

export default RadioItem;



