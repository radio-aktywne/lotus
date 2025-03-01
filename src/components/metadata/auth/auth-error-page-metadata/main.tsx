"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { AuthErrorPageMetadataInput } from "./types";

export function AuthErrorPageMetadata({}: AuthErrorPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: "Auth error • lotus" })),
  });

  return null;
}
