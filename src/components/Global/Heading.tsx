import { HTMLProps } from "react";

interface IHeading extends HTMLProps<HTMLHeadingElement> {
  variant?: "big" | "small";
}

enum HeadingVariants {
  big = "mb-10 text-5xl md:text-6xl font-bold text-black",
  small = "mb-1 text-xl md:text-2xl font-bold text-black",
}

export default function Heading(props: IHeading): JSX.Element {
  const defaultVariant: string = props.variant
    ? HeadingVariants[props.variant]
    : HeadingVariants["big"];

  return (
    <h1
      {...props}
      className={`${defaultVariant} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </h1>
  );
}
