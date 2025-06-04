import { IoMdInformation } from "react-icons/io";
import { MdCheck, MdClose, MdPriorityHigh } from "react-icons/md";

export const colors = {
  error: "ra-red",
  info: "ra-blue",
  success: "ra-green",
  warning: "ra-yellow",
};

export const icons = {
  error: <MdClose size="75%" />,
  info: <IoMdInformation size="75%" />,
  success: <MdCheck size="75%" />,
  warning: <MdPriorityHigh size="75%" />,
};
