import { msg } from "@lingui/core/macro";

export const errors = {
  download: {
    generic: msg({
      message: "An error occurred while downloading media content.",
    }),
    notFound: msg({
      message: "Media not found.",
    }),
    unauthorized: msg({
      message: "You are not authorized to download media content.",
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
    unauthorized: msg({
      message: "You are not authorized to upload media content.",
    }),
  },
};
