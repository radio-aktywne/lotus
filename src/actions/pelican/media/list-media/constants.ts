import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while listing media." }),
  invalidInput: msg({ message: "Invalid input." }),
  unauthorized: msg({ message: "You are not authorized to list media." }),
};
