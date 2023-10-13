export type Item = {
    name: string,
    shortcut?: string,
    disabled?: boolean,
    onclick?: React.MouseEventHandler,
    isSeparated?: boolean,
    isItem?: boolean,
    isCheckbox?: boolean,
    isRadio?: boolean,
    radioGroupName?: string,
    checkboxValue?: boolean,
    radioValue?: string,
    radioEntries?: string[] | undefined
}

export type ContextMenuProps = {
    data: Item[],
    TriggerComponent: React.FC
  };