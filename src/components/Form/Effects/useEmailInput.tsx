import { useEffect } from "react";
import { EmailRegex, IInputEffect } from "../Constants";
import { useRequiredInput } from "./useRequiredInput";

export function useEmailInput(): IInputEffect {
  const {
    value,
    setValue,
    inputRef,
    validationMessage,
    setValidationMessage,
    requiredValidationCallback,
  } = useRequiredInput();

  useEffect(() => {
    if (!EmailRegex.test(value) && value.length > 0) {
      setValidationMessage("Email format is not correct.");
      inputRef?.current?.classList.add("border-red-700");
    } else {
      setValidationMessage("");
      inputRef?.current?.classList.remove("border-red-700");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    value,
    setValue,
    validationMessage,
    inputRef,
    requiredValidationCallback,
  };
}
