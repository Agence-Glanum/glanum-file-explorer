export type Item = {
    name: string
    shortcut?: string
    disabled?: boolean
    onclick?: React.MouseEventHandler
    isSeparated?: boolean
    isItem?: boolean
    isCheckbox?: boolean
    isRadio?: boolean
    radioGroupName?: string
    radioEntries?: string[] | undefined
}

export type ContextMenuProps = {
    data: Item[]
    TriggerComponent: React.FC
  }

  export type ContextMenuItemProps = {
    key: string
    item: Item
    index: number
    state: ItemState
  }

  export type ItemState = {
    isDisabled?: boolean
    checked?: boolean
    radioValue?: string
  }