import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuProps, Item } from "./types/context-menu-type";

/*
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
*/



function ContextMenuComponent({data, TriggerComponent}: ContextMenuProps) {
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
            {
                data?.map((item: Item) => {
                    return (
                        <ContextMenu.Item
                            key={item.name}
                            disabled={item.disabled}
                            onClick={item.onclick}
                            className="ContextMenuItem"
                            >
                            {item.name} <div className="RightSlot">{item.shortcut}</div>
                        </ContextMenu.Item>
                    )
                })
            }
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    );
}

export default ContextMenuComponent;
