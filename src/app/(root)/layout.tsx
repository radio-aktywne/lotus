import { msg } from "@lingui/core/macro";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { connection } from "next/server";

import type { CreateViewportInput } from "../../server/metadata/lib/create-viewport";
import type {
  LayoutInput,
  LayoutMetadataInput,
  LayoutMetadataUtilityInput,
  LayoutViewportInput,
  LayoutViewportUtilityInput,
} from "../types";
import type { Schemas } from "./schemas";
import type { Keys } from "./types";

import { ThemeScript } from "../../common/theme/components/theme-script";
import { LocalizationProvider } from "../../isomorphic/localization/components/localization-provider";
import { Metadata } from "../../isomorphic/metadata/components/metadata";
import { MetadataProvider } from "../../isomorphic/metadata/components/metadata-provider";
import { QueryProvider } from "../../isomorphic/query/components/query-provider";
import { StateProvider } from "../../isomorphic/state/components/state-provider";
import { ThemeProvider } from "../../isomorphic/theme/components/theme-provider";
import { resolveLocale } from "../../server/localization/lib/resolve-locale";
import { createMetadata } from "../../server/metadata/lib/create-metadata";
import { createViewport } from "../../server/metadata/lib/create-viewport";
import { constants } from "./constants";
import "./layout.styles.css";
import { RootLayoutView } from "./layout.view";

async function getDescription({}: LayoutMetadataUtilityInput<
  typeof Schemas.Path
> = {}) {
  return msg({ message: "lotus is a Next.js app" });
}

async function getTitle({}: LayoutMetadataUtilityInput<
  typeof Schemas.Path
> = {}) {
  return msg({ message: "lotus" });
}

async function getColorScheme({}: LayoutViewportUtilityInput<
  typeof Schemas.Path
> = {}) {
  return constants.colors.scheme;
}

async function getThemeColor({}: LayoutViewportUtilityInput<
  typeof Schemas.Path
> = {}) {
  const shade = constants.colors.primary.shade;
  return constants.colors.all[constants.colors.primary.name][shade];
}

async function getViewportAttributes({}: LayoutViewportUtilityInput<
  typeof Schemas.Path
> = {}) {
  return {
    initialScale: 1,
    interactiveWidget: "resizes-visual",
    width: "device-width",
  } satisfies CreateViewportInput["viewportAttributes"];
}

export async function generateMetadata({}: LayoutMetadataInput<Keys.Path>) {
  return await createMetadata({
    description: await getDescription(),
    title: await getTitle(),
  });
}

export async function generateViewport({}: LayoutViewportInput<Keys.Path>) {
  return await createViewport({
    colorScheme: await getColorScheme(),
    themeColor: await getThemeColor(),
    viewportAttributes: await getViewportAttributes(),
  });
}

export default async function RootLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  const { locale, queryClient } = await resolveLocale();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <ThemeScript colorScheme={constants.colors.scheme} />
      </head>
      <body>
        <StateProvider>
          <MetadataProvider>
            <QueryProvider>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <LocalizationProvider locale={locale}>
                  <ThemeProvider
                    colors={constants.colors.all}
                    colorScheme={constants.colors.scheme}
                    primaryColor={constants.colors.primary.name}
                    primaryShade={constants.colors.primary.shade}
                  >
                    <Metadata
                      description={await getDescription()}
                      title={await getTitle()}
                    />
                    <RootLayoutView>{children}</RootLayoutView>
                  </ThemeProvider>
                </LocalizationProvider>
              </HydrationBoundary>
            </QueryProvider>
          </MetadataProvider>
        </StateProvider>
      </body>
    </html>
  );
}
