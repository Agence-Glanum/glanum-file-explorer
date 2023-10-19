import { Item } from "../types/context-menu-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
//custom hook


const contextMenuMock: Item[] = [
    {
        name: 'item clickable 1',
        shortcut: 'ctrl+1',
        onclick: () => alert('item 1 clicked !'),
        disabled: false,
        isSeparated: false,
        isItem: true
    },
    {
        name: 'item checkbox 1',
        disabled: true,
        isSeparated: true,
        isCheckbox: true,
    },
    {
        name: 'item checkbox 2',
        disabled: true,
        isSeparated: true,
        isCheckbox: false,
    
    },
    {
        name: 'item radio 1',
        shortcut: 'ctrl+3',
        onclick: () => null,
        disabled: false,
        isSeparated: false,
        isRadio: true,
        radioGroupName: "Slot Group 1",
        radioEntries: ["slot 1", "slot 2", "slot 3"]
    },
    {
        name: 'item radio 2',
        shortcut: 'ctrl+3',
        onclick: () => null,
        disabled: false,
        isSeparated: false,
        isRadio: true,
        radioGroupName: "Slot Group 2",
        radioEntries: ["slot 4", "slot 5", "slot 6"]
    }
]


export default contextMenuMock