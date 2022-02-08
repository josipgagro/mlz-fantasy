import { Dispatch, SetStateAction, RefObject } from "react";

export const EmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type FormServerError = { title: string; message: string };

export interface IInputEffect {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  validationMessage: string;
  inputRef: RefObject<HTMLInputElement>;
  requiredValidationCallback: () => boolean;
}
