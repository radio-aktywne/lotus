import { constants as uiConstants } from "@radio-aktywne/ui";

export const constants = {
  colors: {
    all: uiConstants.theme.colors,
    primary: {
      name: uiConstants.theme.primaryColor,
      shade: uiConstants.theme.primaryShade,
    },
    scheme: "dark",
  },
} as const;
