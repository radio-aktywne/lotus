"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { PlaylistNotFoundMetadataInput } from "./types";

export function PlaylistNotFoundMetadata({}: PlaylistNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: "Playlist not found • lotus" })),
  });

  return null;
}
