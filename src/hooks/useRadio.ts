import { useContextMenuStore } from "../store/context-menu";

const useRadio = () => {
  const setItems = useContextMenuStore(
    (state) => state.setItems
  )

  const items = useContextMenuStore(
    (state) => state.items
  )
  
  const handleRadio = (index: number, value: string) => {
    const newItems = items;
    newItems[index].radioValue = value
    setItems(newItems)
  };

  return handleRadio;
};

export default useRadio;
