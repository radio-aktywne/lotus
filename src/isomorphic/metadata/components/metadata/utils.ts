import type { ViewportAttributes } from "./types";

export function serializeViewportAttributes(attributes: ViewportAttributes) {
  return [
    ["width", attributes.width],
    ["height", attributes.height],
    ["initial-scale", attributes.initialScale],
    ["maximum-scale", attributes.maximumScale],
    ["minimum-scale", attributes.minimumScale],
    [
      "user-scalable",
      attributes.userScalable === undefined
        ? undefined
        : attributes.userScalable
          ? "yes"
          : "no",
    ],
    ["interactive-widget", attributes.interactiveWidget],
    ["viewport-fit", attributes.viewportFit],
  ]
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
}
