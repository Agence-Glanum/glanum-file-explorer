import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuMock, ContextMenuProps, Item, ItemState } from "../../types/context-menu";

import CheckboxItem from "../common/checkbox-item";
import { ChevronRightIcon } from '@radix-ui/react-icons';
import DefaultItem from "../common/default-item";
import RadioItem from "../common/radio-item";
import useContextMenu from "../../hooks/useContextMenu";

function ContextMenuComponent({ data: mock, TriggerComponent }: ContextMenuProps) {
  const {items, handleContextMenu} = useContextMenu()

  const renderContextMenu = (mock: ContextMenuMock, item: Item, index: number) => {
    if(Array.isArray(item.groupData)){
      return (
        <>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className={item.subTriggerClasse}>
              {item.name}
              <div className={item.subTriggerContainerClasse}>
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className={item.subContentClasse}
                sideOffset={mock.sideOffset}
                alignOffset={mock.alignOffset}
              >
                 {
                    item.groupData?.map((subItem: Item, groupIndex: number) => {
                      return renderItem(subItem, index, items[index][groupIndex], groupIndex)
                    })
                  }
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </>
      )
    }
    else {
      return renderItem(item, index, items[index])

    }
  }

  const renderItem = (item: Item, index: number, state: ItemState, groupIndex: number|undefined = undefined) => {
    if (item.isItem) {
      return <DefaultItem key={item.name} item={item} index={index} groupIndex={groupIndex} state={state} handleContextMenu={handleContextMenu} />
    } else if (item.isCheckbox) {
      return <CheckboxItem key={item.name} item={item} index={index} groupIndex={groupIndex} state={state} handleContextMenu={handleContextMenu} />
    } else if (item.isRadio) {
      return <RadioItem key={item.name} item={item} index={index} groupIndex={groupIndex} state={state} handleContextMenu={handleContextMenu} />
    }
  }

 return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={mock.triggerComponentClasse}>
        <TriggerComponent />
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className={mock.contentClasse}
          sideOffset={mock.sideOffset}
          align={mock.align}
        >
            {mock.data?.map((item: Item, index: number) => {
              return renderContextMenu(mock, item, index)
            })}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export default ContextMenuComponent;
