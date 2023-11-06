import { ContextMenuMock } from "../types/context-menu";

const contextMenuMock: ContextMenuMock = {
    triggerComponentClasse: "block border-2 border-white border-dashed text-white rounded text-[15px] select-none py-[45px] w-[300px] text-center",
    contentClasse: "min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]",
    sideOffset: 5,
    align: "end",
    data: [
        {
            name: 'item clickable 1',
            shortcut: 'ctrl+1',
            onclick: () => alert('item 1 clicked !'),
            disabled: false,
            isSeparated: false,
            isItem: true,
            itemClasse: "group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
        },
        {
            name: "More Tools",
            subTriggerClasse: "group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1",
            subTriggerContainerClasse: "ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8",
            subContentClasse: "min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]",
            sideOffset: 2,
            alignOffset: -5,
            groupData: [
                {
                    name: 'item checkbox 1',
                    disabled: true,
                    isSeparated: true,
                    separatorClasse: "h-[1px] bg-violet6 m-[5px]",
                    isCheckbox: true,
                    checkboxClasse: "group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                },
                {
                    name: 'item checkbox 2',
                    disabled: true,
                    isSeparated: false,
                    separatorClasse: "h-[1px] bg-violet6 m-[5px]",
                    isCheckbox: true,
                    checkboxClasse: "group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"         
                }
            ],
        },
        {
            name: 'item radio 1',
            shortcut: 'ctrl+3',
            onclick: () => null,
            disabled: false,
            isSeparated: false,
            isRadio: true,
            radioClasse: "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
            radioGroupName: "Slot Group 1",
            labelGroupClasse: "pl-[25px] text-xs leading-[25px] text-mauve11",
            radioEntries: ["slot 1", "slot 2", "slot 3"],
            itemIndicator: "absolute left-0 w-[25px] inline-flex items-center justify-center"
        },
        {
            name: 'item radio 2',
            shortcut: 'ctrl+3',
            onclick: () => null,
            disabled: false,
            isSeparated: false,
            isRadio: true,
            radioClasse: "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
            radioGroupName: "Slot Group 2",
            labelGroupClasse: "pl-[25px] text-xs leading-[25px] text-mauve11",
            radioEntries: ["slot 4", "slot 5", "slot 6"],
            itemIndicator: "absolute left-0 w-[25px] inline-flex items-center justify-center"
        }
    ]
}


export default contextMenuMock