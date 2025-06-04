"use client";

import { MantineProvider } from "@mantine/core";
import { theme } from "@radio-aktywne/ui";

import { defaultColorScheme } from "../../constants";
import { colorSchemeManager } from "./scheme";
import { ThemeProviderInput } from "./types";

import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import "@radio-aktywne/ui/styles.css";

export function ThemeProvider({ children }: ThemeProviderInput) {
  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme={defaultColorScheme}
      forceColorScheme="dark"
      theme={theme}
    >
      {children}
    </MantineProvider>
  );
}
