import { HTMLProps } from "react";

interface IButton extends HTMLProps<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ternary" | "link";
  type?: "submit" | "button" | "reset";
}

const commonBtnStyles: string =
  "h-10 w-full md:w-auto px-4 md-2 rounded text-white transition-colors duration-300 drop-shadow-md";

const variants = {
  primary: `${commonBtnStyles} bg-alfa-200 hover:bg-alfa-100`,
  secondary: `${commonBtnStyles} bg-beta-300 hover:bg-beta-200`,
  ternary: `${commonBtnStyles} bg-omega-200 hover:bg-omega-300`,
  link: "h-10 text-omega-300 bg-none hover:text-omega-200 transition-colors duration-200",
};

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
