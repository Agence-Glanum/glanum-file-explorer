import { useState } from "react";

const useContextMenu = () => {
  const [items, setItems] = useState([
    {
        isDisabled: false,
    },
    {
        checkboxValue: false
    },
    {
        checkboxValue: true,
        isDisabled: true
    },
    {
        radioValue: "slot 1",
    },
    {
        radioValue: "slot 5"
    }
  ],)

  const handleContextMenu = (index: number, value: boolean|string, key: string) => {
    const newItems = items;
    newItems[index][`${key}`] = value
    setItems(newItems)
  };

  
  return {items, handleContextMenu}
};

export default useContextMenu;
