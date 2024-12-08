import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({
    message: "An error occurred while fetching media content headers.",
  }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Media not found." }),
};
