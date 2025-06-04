"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../../hooks/use-document-metadata";
import { PlaylistPageMetadataInput } from "./types";

export function PlaylistPageMetadata({ id }: PlaylistPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: `Playlist ${id} • lotus` })),
  });

  return null;
}
