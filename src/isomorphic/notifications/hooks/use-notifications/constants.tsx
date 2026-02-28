import { TbCheck, TbExclamationMark, TbInfoSmall, TbX } from "react-icons/tb";

export const constants = {
  colors: {
    error: "ra-red",
    info: "ra-blue",
    success: "ra-green",
    warning: "ra-yellow",
  },
  icons: {
    error: <TbX size="1em" />,
    info: <TbInfoSmall size="2em" />,
    success: <TbCheck size="1em" />,
    warning: <TbExclamationMark size="1.25em" />,
  },
} as const;
