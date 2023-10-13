import { useEffect, useState } from "react";

const useRadio = (value: string) => {
  const [radioValue, setRadioValue] = useState("slot 1");

  useEffect(() => {
    console.log("check new value : ", value)
    setRadioValue(value)
  }, [value]);

  return [radioValue, setRadioValue];
};

export default useRadio;
