import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while fetching the media." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Media not found." }),
};