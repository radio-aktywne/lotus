import { useComputedColorScheme } from "@mantine/core";

import type { DocumentColorSchemeInput } from "./types";

import { Metadata } from "../../../../../metadata/components/metadata";

export function DocumentColorScheme({}: DocumentColorSchemeInput) {
  const colorScheme = useComputedColorScheme();

  return <Metadata colorScheme={colorScheme} />;
}
