import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({ message: "An error occurred while updating the media." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Media not found." }),
  unauthorized: msg({ message: "You are not authorized to update the media." }),
};
