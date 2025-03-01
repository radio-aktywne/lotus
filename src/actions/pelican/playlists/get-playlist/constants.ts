import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({ message: "An error occurred while fetching the playlist." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Playlist not found." }),
  unauthorized: msg({
    message: "You are not authorized to fetch the playlist.",
  }),
};
