"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { BindingListPageMetadataInput } from "./types";

export function BindingListPageMetadata({}: BindingListPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "lotus" })),
    title: _(msg({ message: "Bindings • lotus" })),
  });

  return null;
}
