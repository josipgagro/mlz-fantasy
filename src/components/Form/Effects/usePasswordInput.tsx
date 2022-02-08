import { useEffect } from "react";
import { IInputEffect } from "../Constants";
import { useRequiredInput } from "./useRequiredInput";

export function usePasswordInput(
  length: number = 8,
  samePw?: string
): IInputEffect {
  const {
    value,
    setValue,
    inputRef,
    validationMessage,
    setValidationMessage,
    requiredValidationCallback,
  } = useRequiredInput();

  useEffect(() => {
    const setValidationError = (message: string): void => {
      setValidationMessage(message);

      if (inputRef.current) {
        inputRef.current.classList.add("border-red-700");
      }
    };

    if (value.length > 0 && value.length < length) {
      setValidationError(
        `Password needs to have at least ${length} characters.`
      );
    } else if (samePw !== undefined && value !== samePw && value.length > 0) {
      setValidationError("Passwords are not identical.");
    } else {
      setValidationMessage("");

      if (inputRef.current) {
        inputRef.current.classList.remove("border-red-700");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, length, samePw]);

  return {
    value,
    setValue,
    validationMessage,
    inputRef,
    requiredValidationCallback,
  };
}
