"use client";

import { createHead, UnheadProvider } from "@unhead/react/client";
import { useState } from "react";

import type { MetadataProviderInput } from "./types";

export function MetadataProvider({ children }: MetadataProviderInput) {
  const [head] = useState(() => createHead());

  return <UnheadProvider head={head}>{children}</UnheadProvider>;
}
