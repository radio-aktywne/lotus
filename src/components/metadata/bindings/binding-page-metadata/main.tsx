"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { BindingPageMetadataInput } from "./types";

export function BindingPageMetadata({ id }: BindingPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: `Binding ${id} • lotus` })),
  });

  return null;
}
