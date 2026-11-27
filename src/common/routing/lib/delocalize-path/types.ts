import type { LocaleRoutes } from "../../types";

export type DelocalizePathInput = {
  localeRoutes: LocaleRoutes;
  path: string;
};

export type DelocalizePathOutput = {
  path: null | string;
};
