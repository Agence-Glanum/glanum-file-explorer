import { useState } from "react";

const useCheckbox = (initialState = false) => {
  const [checked, setChecked] = useState(initialState);

  const handleCheckbox = () => setChecked(!checked);

  return [
    checked,
    handleCheckbox
  ]
};

export default useCheckbox;
