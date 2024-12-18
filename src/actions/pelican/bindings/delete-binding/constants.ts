import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while deleting the binding." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Binding not found." }),
};
