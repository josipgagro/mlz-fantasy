import { HTMLProps } from "react";

export default function Container(props: HTMLProps<any>): JSX.Element {
  return (
    <section className="pt-5 pb-10 px-4 md:mx-3 md:py-10 md:px-20 lg:w-5/6 min-h-[calc(100vh-3.5rem)] lg:mx-auto bg-white shadow-2xl">
      {props.children}
    </section>
  );
}
