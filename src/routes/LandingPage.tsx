import { ReactNode } from "react";

interface PROP {
  children: ReactNode;
}
export default function LandingPage(props: PROP) {
  return (
    <>
      <div className="z-10 mt-36 md:mt-[30%]">
        <h1>Betrayal at the House on the Hill</h1>
        <hr />
        {props.children}
      </div>
    </>
  );
}
