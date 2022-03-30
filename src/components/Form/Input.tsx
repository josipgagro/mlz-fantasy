import {
  forwardRef,
  ChangeEvent,
  HTMLProps,
  useState,
  ForwardedRef,
} from "react";
import EyeIcon from "../Global/Icons/EyeIcon";
import EyeSlashIcon from "../Global/Icons/EyeSlashIcon";

interface ICustomInputProps extends HTMLProps<HTMLInputElement> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validationMsg?: string;
}

const iconStyle: string = "absolute right-1 bottom-1 text-slate-800";

export default forwardRef(
  (
    props: ICustomInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [inputType, setInputType] = useState<string>(props.type || "text");

    const handleInputTypeChange = (): void => {
      inputType === "password"
        ? setInputType("text")
        : setInputType("password");
    };

    return (
      <div className={props.className}>
        {props.label && (
          <label
            htmlFor={props.id}
            className="flex justify-between items-baseline mb-1"
          >
            <span>{props.label}:</span>
            {props.validationMsg && (
              <span className="text-red-700 text-xs">
                {props.validationMsg}
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            value={props.value}
            name={props.name}
            id={props.id}
            ref={ref}
            onChange={props.onChange}
            className={`h-8 w-full pb-1 border-solid border-b-2 text-black focus:outline-none ${
              props.disabled ? "text-gray-400" : ""
            }`}
          />
          {props.type === "password" && (
            <button
              className={iconStyle}
              type="button"
              onClick={handleInputTypeChange}
            >
              {inputType === "password" ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
      </div>
    );
  }
);
