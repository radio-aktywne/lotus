"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { NewMediaPageMetadataInput } from "./types";

export function NewMediaPageMetadata({}: NewMediaPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: "New media • lotus" })),
  });

  return null;
}
