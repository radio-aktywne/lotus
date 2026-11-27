import type { LocaleRoutes } from "../../types";

export type LocalizePathInput = {
  localeRoutes: LocaleRoutes;
  path: string;
};

export type LocalizePathOutput = {
  path: string;
};
