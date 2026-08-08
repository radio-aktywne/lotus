"use client";

import type { LocalizedInput } from "./types";

import { useLocalization } from "../../hooks/use-localization";

export function Localized({ message }: LocalizedInput) {
  const { localization } = useLocalization();

  return localization.localize(message);
}
