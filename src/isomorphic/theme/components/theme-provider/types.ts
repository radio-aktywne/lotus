import type {
  MantineColor,
  MantineColorScheme,
  MantineColorShade,
  MantinePrimaryShade,
  MantineThemeColors,
} from "@mantine/core";
import type { PropsWithChildren } from "react";

export type ThemeProviderInput = PropsWithChildren<{
  colors: Partial<MantineThemeColors>;
  colorScheme: MantineColorScheme;
  primaryColor: MantineColor;
  primaryShade: MantineColorShade | MantinePrimaryShade;
}>;
