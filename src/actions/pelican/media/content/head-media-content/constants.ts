import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({
    message: "An error occurred while fetching media content headers.",
  }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Media not found." }),
  unauthorized: msg({
    message: "You are not authorized to fetch media content headers.",
  }),
};
