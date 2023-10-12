import { Item } from "./types/context-menu-type";

/* eslint-disable @typescript-eslint/no-explicit-any */

const data: Item[] = [
    {
        name: '1',
        shortcut: '1',
        onclick: () => alert('1'),
        disabled: false
    },
    {
        name: '2',
        shortcut: '2',
        onclick: () => alert('2'),
        disabled: true
    },
    {
        name: '3',
        shortcut: '3',
        onclick: () => null,
        disabled: false
    }
]


export default data