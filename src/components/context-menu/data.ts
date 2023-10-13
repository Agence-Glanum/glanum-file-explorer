import { Item } from "./types/context-menu-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
//custom hook


const data: Item[] = [
    {
        name: 'item clickable',
        shortcut: 'ctrl+1',
        onclick: () => alert('item 1 clicked !'),
        disabled: false,
        isSeparated: false,
        isItem: true
    },
    {
        name: 'item checkbox',
        disabled: true,
        isSeparated: true,
        isCheckbox: true,
        checkboxValue: true
    },
    {
        name: 'item 3',
        shortcut: 'ctrl+3',
        onclick: () => null,
        disabled: false,
        isSeparated: false,
        isRadio: true,
        radioGroupName: "Slot Group",
        radioValue: "slot 1",
        radioEntries: ["slot 1", "slot 2", "slot 3"]
    }
]


export default data