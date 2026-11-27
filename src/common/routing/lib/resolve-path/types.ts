import type { SupportedLocale } from "../../../localization/types";
import type { LocalizedRoutes } from "../../types";

export type ResolvePathInput = {
  locale: SupportedLocale;
  localizedRoutes: LocalizedRoutes;
  path: string;
};

export type ResolvePathOutput = {
  path: null | string;
};
