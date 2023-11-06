import * as ContextMenu from "@radix-ui/react-context-menu";

import { ContextMenuProps, Item } from "../../types/context-menu";

import CheckboxItem from "../common/checkbox-item";
import { ChevronRightIcon } from '@radix-ui/react-icons';
import DefaultItem from "../common/default-item";
import RadioItem from "../common/radio-item";
import useContextMenu from "../../hooks/useContextMenu";

function ContextMenuComponent({ data: mock, TriggerComponent }: ContextMenuProps) {
  const {items, handleContextMenu} = useContextMenu()
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
                            if (subItem.isItem) {
                              return <DefaultItem key={subItem.name} item={subItem} index={index} groupIndex={groupIndex} state={items[index][groupIndex]} handleContextMenu={handleContextMenu} />
                            } else if (subItem.isCheckbox) {
                              return <CheckboxItem key={subItem.name} item={subItem} index={index} groupIndex={groupIndex} state={items[index][groupIndex]} handleContextMenu={handleContextMenu} />
                            } else if (subItem.isRadio) {
                              return <RadioItem key={subItem.name} item={subItem} index={index} groupIndex={groupIndex} state={items[index][groupIndex]} handleContextMenu={handleContextMenu} />
                            }
                          })
                        }
                      </ContextMenu.SubContent>
                    </ContextMenu.Portal>
                  </ContextMenu.Sub>
                </>
              )
            }
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
