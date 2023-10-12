export type Item = {
    name: string,
    shortcut: string,
    disabled: boolean,
    onclick: React.MouseEventHandler
}

export type ContextMenuProps = {
    data: Item[],
    TriggerComponent: React.FC
  };