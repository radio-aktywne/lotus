"use client";

import type { DayOfWeek } from "@mantine/dates";

import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import { DatesProvider } from "@mantine/dates";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.layer.css";
import { theme } from "@radio-aktywne/ui";
import "@radio-aktywne/ui/styles.css";
import { useMemo } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { ThemeProviderInput } from "./types";

import { dayjs } from "../../../../common/dates/vars/dayjs";
import { useLocalization } from "../../../localization/hooks/use-localization";
import { DocumentColorScheme } from "./components/document-color-scheme";
import { DocumentThemeColor } from "./components/document-theme-color";
import { ForceColorSchemeManager } from "./utils";

export function ThemeProvider({
  children,
  colors,
  colorScheme,
  primaryColor,
  primaryShade,
}: ThemeProviderInput) {
  const resolvedTheme = useDeepCompareMemo(
    () =>
      createTheme({
        ...theme,
        colors: colors,
        primaryColor: primaryColor,
        primaryShade: primaryShade,
      }),
    [colors, primaryColor, primaryShade],
  );

  const colorSchemeManager = useMemo(
    () => new ForceColorSchemeManager(colorScheme),
    [colorScheme],
  );

  const { localization } = useLocalization();

  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme={colorScheme}
      theme={resolvedTheme}
    >
      <DocumentColorScheme />
      <DocumentThemeColor />
      <DatesProvider
        settings={{
          consistentWeeks: true,
          firstDayOfWeek: dayjs()
            .locale(localization.locale)
            .localeData()
            .firstDayOfWeek() as DayOfWeek,
          locale: localization.locale,
        }}
      >
        {children}
      </DatesProvider>
    </MantineProvider>
  );
}
