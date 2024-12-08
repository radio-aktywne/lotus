import "client-only";
import { useEffect } from "react";

import { UseElementTextInput } from "./types";

export function useElementText({ selector, text }: UseElementTextInput): void {
  useEffect(() => {
    if (selector === undefined || text === undefined) return;

    const element = document?.querySelector(selector);
    if (element) element.textContent = text;
  }, [selector, text]);
}
