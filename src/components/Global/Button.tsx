import { HTMLProps } from "react";

interface IButton extends HTMLProps<HTMLButtonElement> {
  btnStyle?: string;
  type?: "submit" | "button" | "reset";
}

enum btnStyles {
  primary = "h-10 px-4 rounded text-white bg-red-500 hover:bg-red-600 transition-colors duration-300",
  secondary = "h-10 px-4 rounded text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300",
  link = "h-10 text-green-600 bg-none hover:text-green-500 transition-colors duration-200",
}

export default function Button(props: IButton): JSX.Element {
  const { btnStyle, ...properties } = props;
  const styling: string = btnStyle
    ? btnStyles[btnStyle as keyof typeof btnStyles]
    : btnStyles["primary"];

  return (
    <button
      className={`${styling} ${
        props.disabled
          ? "bg-slate-400 cursor-not-allowed hover:!bg-slate-400"
          : ""
      }`}
      {...properties}
    >
      {props.children}
    </button>
  );
}
