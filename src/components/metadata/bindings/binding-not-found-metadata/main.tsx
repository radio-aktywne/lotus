"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { BindingNotFoundMetadataInput } from "./types";

export function BindingNotFoundMetadata({}: BindingNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: "Binding not found • lotus" })),
  });

  return null;
}
