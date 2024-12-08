"use client";

import { MantineProvider } from "@mantine/core";

import { defaultColorScheme } from "../../constants";
import { colorSchemeManager } from "./scheme";
import { theme } from "./theme";
import { ThemeProviderInput } from "./types";

import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

export function ThemeProvider({ children }: ThemeProviderInput) {
  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme={defaultColorScheme}
      theme={theme}
    >
      {children}
    </MantineProvider>
  );
}
