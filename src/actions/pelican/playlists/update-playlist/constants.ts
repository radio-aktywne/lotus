import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while updating the playlist." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Playlist not found." }),
};