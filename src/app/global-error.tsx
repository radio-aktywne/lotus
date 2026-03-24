"use client";

import type { ErrorInput, ErrorMetadataUtilityInput } from "./types";

import { GlobalErrorView } from "./global-error.view";
import "./styles.css";

function getDescription({}: ErrorMetadataUtilityInput = {}) {
  return "Broadcast playlists app 💽";
}

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return "Error • lotus";
}

export default function GlobalError({ reset }: ErrorInput) {
  return (
    <html lang="en">
      <head>
        <title>{getTitle()}</title>
        <meta content={getDescription()} name="description" />
      </head>
      <body>
        <GlobalErrorView reset={reset} />
      </body>
    </html>
  );
}
