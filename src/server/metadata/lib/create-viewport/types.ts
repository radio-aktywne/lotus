import type { Viewport } from "next";

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

export type CreateViewportInput = {
  colorScheme?:
    | "dark"
    | "dark light"
    | "light"
    | "light dark"
    | "normal"
    | "only light"
    | null;
  themeColor?: null | string;
  viewportAttributes?: ViewportAttributes;
};

export type CreateViewportOutput = Viewport;
