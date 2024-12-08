import { msg } from "@lingui/macro";

export const errors = {
  download: {
    generic: msg({
      message: "An error occurred while downloading media content.",
    }),
    notFound: msg({
      message: "Media not found.",
    }),
  },
  upload: {
    generic: msg({
      message: "An error occurred while uploading media content.",
    }),
    missingContentType: msg({
      message: "Content-Type header is missing.",
    }),
    notFound: msg({
      message: "Media not found.",
    }),
  },
};
