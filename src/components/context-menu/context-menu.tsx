import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuProps, Item } from "../../types/context-menu-type";

import CheckboxItem from "../common/checkbox-item";
import DefaultItem from "../common/default-item";
import RadioItem from "../common/radio-item";
import { useContextMenuStore } from "../../store/context-menu";

function ContextMenuComponent({ data: mock, TriggerComponent }: ContextMenuProps) {
  const itemsState = useContextMenuStore((state) => state.items)

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
          {mock?.map((item: Item, index: number) => {
            if (item.isItem) {
              return <DefaultItem key={item.name} item={item} index={index} state={itemsState[index]} />
            } else if (item.isCheckbox) {
              return <CheckboxItem key={item.name} item={item} index={index} state={itemsState[index]} />
            } else if (item.isRadio) {
              return <RadioItem key={item.name} item={item} index={index} state={itemsState[index]} />
            }
          })}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export default ContextMenuComponent;
