import { useRef, useState, Dispatch, SetStateAction, useEffect } from "react";
import { IInputEffect } from "../../../Constants";

interface IRequiredInput extends IInputEffect {
  setValidationMessage: Dispatch<SetStateAction<string>>;
}

export function useRequiredInput(): IRequiredInput {
  const [value, setValue] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      inputRef.current?.classList.contains("border-red-700") &&
      value.length > 0
    ) {
      inputRef.current?.classList.remove("border-red-700");
      setValidationMessage("");
    }
  }, [value]);

  const requiredValidationCallback = (): boolean => {
    if (value.length === 0) {
      setValidationMessage("Required field.");
      inputRef?.current?.classList.add("border-red-700");
      return false;
    } else {
      setValidationMessage("");
      inputRef?.current?.classList.remove("border-red-700");
    }

    return true;
  };

  return {
    value,
    setValue,
    validationMessage,
    setValidationMessage,
    inputRef,
    requiredValidationCallback,
  };
}
