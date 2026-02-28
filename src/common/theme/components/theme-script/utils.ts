import type { MantineColorScheme } from "@mantine/core";

export function script(colorScheme: MantineColorScheme) {
  const scheme =
    colorScheme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : colorScheme;
  document.documentElement.setAttribute("data-mantine-color-scheme", scheme);
}
