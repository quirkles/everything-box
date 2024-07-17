import { SVGProps } from "react";

export function AngleRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      {...props}
    >
      <path fill="currentColor" d="M4 13h2l5-5l-5-5H4l5 5z"></path>
    </svg>
  );
}
