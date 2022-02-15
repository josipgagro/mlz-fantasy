import { HTMLProps } from "react";

interface IButton extends HTMLProps<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
  type?: "submit" | "button" | "reset";
}

enum variants {
  primary = "h-10 px-4 rounded text-white bg-alfa-200 hover:bg-alfa-100 transition-colors duration-300 drop-shadow-md",
  secondary = "h-10 px-4 rounded text-white bg-beta-200 hover:bg-beta-300 transition-colors duration-300 drop-shadow-md",
  link = "h-10 text-omega-300 bg-none hover:text-omega-200 transition-colors duration-200",
}

export default function Button(props: IButton): JSX.Element {
  const { variant, ...properties } = props;
  const styling: string = variant ? variants[variant] : variants["primary"];

  return (
    <button
      {...properties}
      className={`${properties.className} ${styling} ${
        props.disabled
          ? "bg-slate-400 cursor-not-allowed hover:!bg-slate-400"
          : ""
      }`}
    >
      {props.children}
    </button>
  );
}
