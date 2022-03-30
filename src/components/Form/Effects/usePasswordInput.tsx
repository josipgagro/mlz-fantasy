import { useEffect } from "react";
import { IInputEffect } from "../../../Constants";
import { useRequiredInput } from "./useRequiredInput";

interface IPasswordInputEffect extends IInputEffect {
  samePasswordValidationCallback: () => boolean;
}

export function usePasswordInput(
  length: number = 8,
  samePw?: string
): IPasswordInputEffect {
  const {
    value,
    setValue,
    inputRef,
    validationMessage,
    setValidationMessage,
    requiredValidationCallback,
  } = useRequiredInput();

  const setValidationError = (message: string): void => {
    setValidationMessage(message);

    if (inputRef.current) {
      inputRef.current.classList.add("border-red-700");
    }
  };

  useEffect(() => {
    if (value.length > 0 && value.length < length) {
      setValidationError(
        `Password needs to have at least ${length} characters.`
      );
    } else if (samePw !== undefined && value !== samePw && value.length > 0) {
      setValidationError("Passwords are not the same.");
    } else {
      setValidationMessage("");

      if (inputRef.current) {
        inputRef.current.classList.remove("border-red-700");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, length, samePw]);

  const samePasswordValidationCallback = (): boolean => {
    if (value.length === 0) {
      return requiredValidationCallback();
    } else if (
      (value.length > 0 && value.length < length) ||
      (samePw !== undefined && value !== samePw)
    ) {
      return false;
    }

    return true;
  };

  return {
    value,
    setValue,
    validationMessage,
    inputRef,
    requiredValidationCallback,
    samePasswordValidationCallback,
  };
}
