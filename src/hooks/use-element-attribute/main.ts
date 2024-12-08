import "client-only";
import { useEffect } from "react";

import { UseElementAttributeInput } from "./types";

export function useElementAttribute({
  attribute,
  selector,
  value,
}: UseElementAttributeInput): void {
  useEffect(() => {
    if (
      attribute === undefined ||
      selector === undefined ||
      value === undefined
    )
      return;

    document?.querySelector(selector)?.setAttribute(attribute, value);
  }, [attribute, selector, value]);
}
