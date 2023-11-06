export type Item = {
    name: string
    shortcut?: string
    disabled?: boolean
    onclick?: React.MouseEventHandler
    isSeparated?: boolean
    separatorClasse?: string
    isItem?: boolean
    itemClasse?: string
    isCheckbox?: boolean
    checkboxClasse?: string
    isRadio?: boolean
    radioClasse?: string
    radioGroupName?: string
    labelGroupClasse?: string
    radioEntries?: string[] | undefined
    itemIndicator?: string
    subTriggerClasse?: string
    subTriggerContainerClasse?: string
    subContentClasse?: string
    sideOffset?: number
    alignOffset?: number
    groupData?: Item[]
}

export type ContextMenuProps = {
    data: ContextMenuMock
    TriggerComponent: React.FC
  }

export type ContextMenuItemProps = {
  key: string
  item: Item
  index: number
  groupIndex?: number
  state: ItemState
  handleContextMenu: HandleContextMenu
}

type HandleContextMenu = (index: number,  value: boolean|string, key: string, subIndex?: number) => void

export type ItemState = {
  isDisabled?: boolean
  checkboxValue?: boolean
  radioValue?: string
}

export type ContextMenuMock = {
  data?: Item[]
  triggerComponentClasse: string
  contentClasse: string  
  sideOffset: number
  alignOffset?: number
  align: string
}