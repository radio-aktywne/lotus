import { useComputedColorScheme, useMantineTheme } from "@mantine/core";

import type { DocumentThemeColorInput } from "./types";

import { Metadata } from "../../../../../metadata/components/metadata";

export function DocumentThemeColor({}: DocumentThemeColorInput) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();

  const shade =
    typeof theme.primaryShade === "number"
      ? theme.primaryShade
      : theme.primaryShade[colorScheme];
  const color = theme.colors[theme.primaryColor]?.[shade];

  return <Metadata themeColor={color} />;
}
