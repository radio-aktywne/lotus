import "client-only";
import { useMemo, useSyncExternalStore } from "react";

import { UseLanguageInput, UseLanguageOutput } from "./types";
import {
  getCurrentLanguage,
  getDefaultLanguage,
  subscribeLanguageChange,
} from "./utils";

export function useLanguage({}: UseLanguageInput = {}): UseLanguageOutput {
  const language = useSyncExternalStore(
    subscribeLanguageChange,
    getCurrentLanguage,
    getDefaultLanguage,
  );

  return useMemo(() => ({ language: language }), [language]);
}
