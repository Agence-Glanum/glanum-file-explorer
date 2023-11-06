import { useState } from "react";

type stateItem = {
  isDisabled?: boolean
  checkboxValue?: boolean
  radioValue?: boolean
}

type stateItems = Array<stateItem|stateItem[]>

const useContextMenu = () => {
  const [items, setItems] = useState([
    {
        isDisabled: false,
    }, 
    [
      {
        checkboxValue: false
      },
      {
          checkboxValue: true,
          isDisabled: true
      }     
    ],
    {
        radioValue: "slot 1",
    },
    {
        radioValue: "slot 5"
    }
  ],)

  const handleContextMenu = (index: number, value: boolean|string, key: string, groupIndex?: number) => {
    const newItems: stateItems = items;
    if(!groupIndex){
      newItems[index][groupIndex][`${key}`] = value
    }
    newItems[index][`${key}`] = value

    setItems(newItems)
  };

  
  return {items, handleContextMenu}
};

export default useContextMenu;
