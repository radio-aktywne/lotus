"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../../../hooks/use-document-metadata";
import { PlaylistAddPageMetadataInput } from "./types";

export function PlaylistAddPageMetadata({ id }: PlaylistAddPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: `Add media to playlist ${id} • lotus` })),
  });

  return null;
}
