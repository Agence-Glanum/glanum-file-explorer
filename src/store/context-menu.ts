import { ItemState } from "../types/context-menu-type"
import { create } from "zustand"

interface ContextMenuState {
    items: ItemState[]
    setItems: (items: ItemState[]) => void
}

const useContextMenuStore = create<ContextMenuState>()((set) => ({
  items: [
    {
        isDisabled: false,
    },
    {
        checked: false
    },
    {
        checked: true,
        isDisabled: true
    },
    {
        radioValue: "slot 1",
    },
    {
        radioValue: "slot 5"
    }
  ],
  setItems: (items: ItemState[]) => set(() => ({ items })),
}))

export { useContextMenuStore }