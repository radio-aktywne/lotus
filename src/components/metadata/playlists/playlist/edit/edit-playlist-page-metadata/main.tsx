"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../../../hooks/use-document-metadata";
import { EditPlaylistPageMetadataInput } from "./types";

export function EditPlaylistPageMetadata({
  id,
}: EditPlaylistPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: `Edit playlist ${id} • lotus` })),
  });

  return null;
}
