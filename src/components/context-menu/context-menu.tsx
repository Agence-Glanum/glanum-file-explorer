import "./styles.css"

import * as ContextMenu from "@radix-ui/react-context-menu";

import { CheckIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { ContextMenuProps, Item } from "./types/context-menu-type";

import useCheckbox from "./hooks/useCheckbox";
import useRadio from "./hooks/useRadio";

function ContextMenuComponent({ data, TriggerComponent }: ContextMenuProps) {
  const [radioValue, setRadioValue] = useRadio("slot 1");
  const [checked, handleCheckbox] = useCheckbox(false);
  
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="ContextMenuTrigger">
        <TriggerComponent />
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="ContextMenuContent"
          sideOffset={5}
          align="end"
        >
          {data?.map((item: Item) => {
            if (item.isItem) {
              return (
                <>
                  <ContextMenu.Item
                    key={item.name}
                    disabled={item.disabled}
                    onClick={item.onclick}
                    className="ContextMenuItem"
                  >
                    {item.name} <div className="RightSlot">{item.shortcut}</div>
                  </ContextMenu.Item>
                  {item.isSeparated ? <ContextMenu.Separator className="ContextMenuSeparator" /> : null }
                </>
                
                
              )
            } else if (item.isCheckbox) {
              return (
                <>
                  <ContextMenu.CheckboxItem
                    className="ContextMenuCheckboxItem"
                    checked={checked}
                    onCheckedChange={handleCheckbox}
                  >
                    <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                      <CheckIcon />
                    </ContextMenu.ItemIndicator>
                    {item.name}
                  </ContextMenu.CheckboxItem>
                  {item.isSeparated ? <ContextMenu.Separator className="ContextMenuSeparator" /> : null }
                </>
              )
            } else if (item.isRadio) {
              return (
                <>
                  <ContextMenu.Label className="ContextMenuLabel">
                    {item.radioGroupName}
                  </ContextMenu.Label>
                  <ContextMenu.RadioGroup
                    value={radioValue}
                    onValueChange={(e) => {
                      setRadioValue(e)
                    }}
                  >
                    {item.radioEntries?.map((entry) => {
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
              ) 
            }
          })}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export default ContextMenuComponent;
