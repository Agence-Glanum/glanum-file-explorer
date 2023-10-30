import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuProps, Item } from "../../types/context-menu";

import CheckboxItem from "../common/checkbox-item";
import DefaultItem from "../common/default-item";
import RadioItem from "../common/radio-item";
import useContextMenu from "../../hooks/useContextMenu";

function ContextMenuComponent({ data, TriggerComponent }: ContextMenuProps) {
  const {items, handleContextMenu} = useContextMenu()
 return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={data.triggerComponentClasse}>
        <TriggerComponent />
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className={data.contentClasse}
          sideOffset={5}
          align="end"
        >
          {data.mock?.map((item: Item, index: number) => {
            if (item.isItem) {
              return <DefaultItem key={item.name} item={item} index={index} state={items[index]} handleContextMenu={handleContextMenu} />
            } else if (item.isCheckbox) {
              return <CheckboxItem key={item.name} item={item} index={index} state={items[index]} handleContextMenu={handleContextMenu} />
            } else if (item.isRadio) {
              return <RadioItem key={item.name} item={item} index={index} state={items[index]} handleContextMenu={handleContextMenu} />
            }
          })}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export default ContextMenuComponent;
