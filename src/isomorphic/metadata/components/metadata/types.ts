import type { MessageDescriptor } from "@lingui/core";

export type ViewportAttributes = {
  height?: "device-height" | number;
  initialScale?: number;
  interactiveWidget?: "overlays-content" | "resizes-content" | "resizes-visual";
  maximumScale?: number;
  minimumScale?: number;
  userScalable?: boolean;
  viewportFit?: "auto" | "contain" | "cover";
  width?: "device-width" | number;
};

export type MetadataInput = {
  colorScheme?:
    | "dark"
    | "dark light"
    | "light"
    | "light dark"
    | "normal"
    | "only light"
    | null;
  description?: MessageDescriptor | null | string;
  themeColor?: null | string;
  title?: MessageDescriptor | null | string;
  viewportAttributes?: ViewportAttributes;
};
