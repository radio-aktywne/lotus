import { localStorageColorSchemeManager } from "@mantine/core";

import { colorSchemeStorageKey } from "../../constants";

export const colorSchemeManager = localStorageColorSchemeManager({
  key: colorSchemeStorageKey,
});
