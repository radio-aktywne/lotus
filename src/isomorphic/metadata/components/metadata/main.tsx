"use client";

import { Head } from "@unhead/react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { MetadataInput } from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";
import { serializeViewportAttributes } from "./utils";

export function Metadata({
  colorScheme,
  description,
  themeColor,
  title,
  viewportAttributes,
}: MetadataInput) {
  const { localization } = useLocalization();

  const cachedDescription = useDeepCompareMemo(
    () =>
      description === undefined ||
      description === null ||
      typeof description === "string"
        ? description
        : localization.localize(description),
    [description, localization.localize],
  );

  const cachedViewport = useDeepCompareMemo(
    () =>
      viewportAttributes === undefined
        ? viewportAttributes
        : serializeViewportAttributes(viewportAttributes),
    [viewportAttributes],
  );

  const cachedTitle = useDeepCompareMemo(
    () =>
      title === undefined || title === null || typeof title === "string"
        ? title
        : localization.localize(title),
    [title, localization.localize],
  );

  return (
    <Head>
      {colorScheme !== undefined && (
        <meta content={colorScheme ?? undefined} name="color-scheme" />
      )}
      {cachedDescription !== undefined && (
        <meta content={cachedDescription ?? undefined} name="description" />
      )}
      {themeColor !== undefined && (
        <meta content={themeColor ?? undefined} name="theme-color" />
      )}
      {cachedViewport !== undefined && (
        <meta content={cachedViewport} name="viewport" />
      )}
      {cachedTitle !== undefined && <title>{cachedTitle ?? undefined}</title>}
    </Head>
  );
}
