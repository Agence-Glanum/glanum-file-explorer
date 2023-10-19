import { useContextMenuStore } from "../store/context-menu";

const useCheckbox = (index: number, value: boolean) => {
  const setItems = useContextMenuStore(
    (state) => state.setItems
  )

  const items = useContextMenuStore(
    (state) => state.items
  )

  const handleCheckbox = () => {
    const newItems = items;
    newItems[index].checked = value
    setItems(newItems)
  };

  
  return handleCheckbox
};

export default useCheckbox;
